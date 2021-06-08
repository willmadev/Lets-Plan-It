import { Course } from "../entity/Course";
import { MyContext } from "../helpers/types";
import { isAuth } from "../middlewares/isAuth";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getTasks } from "../helpers/tasks";
import { TaskFilterInput } from "./task";
import { Task } from "../entity/Task";
import { getConnection } from "typeorm";

@InputType()
class CreateCourseInput {
  @Field()
  courseName: string;
}

@InputType()
class UpdateCourseInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  courseName?: string;
}

@ObjectType()
class MutateCourseError {
  constructor({ field, message }: MutateCourseError) {
    this.field = field;
    this.message = message;
  }

  @Field()
  field: string;

  @Field()
  message: string;
}

const MutateCourseResult = createUnionType({
  name: "MutateCourseResult",
  types: () => [Course, MutateCourseError] as const,
});

@Resolver(() => Course)
export class CourseResolver implements ResolverInterface<Course> {
  @UseMiddleware(isAuth)
  @Query(() => [Course], { nullable: true })
  async getCourses(@Ctx() { user }: MyContext): Promise<Course[]> {
    return await Course.find({ where: { user } });
  }

  @UseMiddleware(isAuth)
  @Query(() => Course, { nullable: true })
  async getSingleCourse(
    @Ctx() { user }: MyContext,
    @Arg("id", () => ID) id: number
  ) {
    return await Course.findOne(id, { where: { user } });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => MutateCourseResult)
  async createCourse(
    @Ctx() { user }: MyContext,
    @Arg("input") input: CreateCourseInput
  ) {
    // validate input
    console.log(user);
    console.log(input);

    const course = Course.create({
      courseName: input.courseName,
      user,
    });

    try {
      Course.insert(course);
    } catch (err) {
      console.error(err);
      throw new Error("An error occured");
    }

    return course;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => MutateCourseResult)
  async updateCourse(
    @Ctx() { user }: MyContext,
    @Arg("input") input: UpdateCourseInput
  ) {
    // validate input
    console.log(user);
    console.log(input);

    let course = await Course.findOne(input.id);
    if (!course) {
      return new MutateCourseError({
        field: "id",
        message: "Course not found",
      });
    }

    if (input.courseName) course.courseName = input.courseName;

    await Course.save(course);
    return course;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteCourse(
    @Ctx() { user }: MyContext,
    @Arg("id", () => ID) id: number
  ) {
    // validate input
    console.log(user);
    console.log(id);

    try {
      await Course.delete({ id, user });
    } catch (err) {
      console.error(err);
      throw new Error("An error occured");
    }

    return true;
  }

  @UseMiddleware(isAuth)
  @FieldResolver(() => [Task])
  async tasks(
    @Root() course: Course,
    @Ctx() { user }: MyContext,
    @Arg("limit", () => Int, { defaultValue: 50 }) limit: number,
    @Arg("cursor", () => ID, { nullable: true }) cursor: number,
    @Arg("filter", () => TaskFilterInput, { nullable: true })
    filter: TaskFilterInput
  ) {
    return await getTasks({
      user,
      limit,
      cursor,
      filter: { completed: filter?.completed, course: course.id },
    });
  }

  @FieldResolver()
  async taskCount(
    @Root() course: Course,
    @Ctx() { user }: MyContext,
    @Arg("filter", () => TaskFilterInput, { nullable: true })
    filter: TaskFilterInput
  ) {
    // return await Task.count({ where: { user, completed: filter, course } });
    const qb = getConnection()
      .getRepository(Task)
      .createQueryBuilder("task")
      .where('"task"."course" = :course', { course })
      .andWhere('"task"."userId" = :userId', { userId: user.id });

    if (filter?.completed !== undefined) {
      qb.andWhere("completed = :completed", { completed: filter.completed });
    }

    const taskCount = qb.getCount();
    return taskCount;
  }
}
