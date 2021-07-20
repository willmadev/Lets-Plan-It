import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Task } from "../entity/Task";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../utils/types";
import { Course } from "../entity/Course";
import { getTasks } from "../utils/tasks";

@InputType()
class CreateTaskInput {
  @Field()
  title: string;

  @Field(() => ID)
  course: number;

  @Field({ nullable: true })
  description: string;

  @Field()
  due: Date;
}

@InputType()
class UpdateTaskInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field(() => ID, { nullable: true })
  course?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  due?: Date;

  @Field({ nullable: true })
  completed?: boolean;
}

const MutateTaskResult = createUnionType({
  name: "MutateTaskResult",
  types: () => [Task, MutateTaskError] as const,
});

@ObjectType()
class MutateTaskError {
  constructor({ field, message }: MutateTaskError) {
    this.field = field;
    this.message = message;
  }
  @Field()
  field: string;

  @Field()
  message: string;
}

@InputType()
export class TaskFilterInput {
  @Field({ nullable: true })
  completed?: boolean;

  @Field(() => ID, { nullable: true })
  course: number;
}

@ObjectType()
class GetTasksResult {
  @Field(() => [Task])
  tasks: Task[];

  @Field()
  hasMore: boolean;

  @Field(() => ID)
  cursor: number;
}

@Resolver()
export class TaskResolver {
  @UseMiddleware(isAuth)
  @Query(() => GetTasksResult)
  async getTasks(
    @Ctx() { user }: MyContext,
    @Arg("limit", () => Int, { defaultValue: 50 }) limit: number,
    @Arg("cursor", () => ID, { nullable: true }) cursor: number,
    @Arg("filter", () => TaskFilterInput, { nullable: true })
    filter: TaskFilterInput
  ): Promise<GetTasksResult | undefined> {
    const tasks = await getTasks({ user, limit: limit + 1, cursor, filter });

    const hasMore = tasks.length === limit + 1;

    // remove hasMore test
    if (hasMore) {
      tasks.pop();
    }

    const newCursor = tasks[tasks.length - 1].id;

    return { tasks, hasMore, cursor: newCursor };
  }

  @UseMiddleware(isAuth)
  @Query(() => Task, { nullable: true })
  async getSingleTask(
    @Ctx() { user }: MyContext,
    @Arg("id", () => ID) id: number
  ): Promise<Task | undefined> {
    const task = await Task.findOne({
      join: {
        alias: "task",
        leftJoinAndSelect: {
          course: "task.course",
        },
      },
      where: { id, user: user },
    });
    console.log(task);
    return task;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => MutateTaskResult)
  async createTask(
    @Ctx() { user }: MyContext,
    @Arg("input") input: CreateTaskInput
  ) {
    // validate input
    console.log(input);
    console.log(user);

    const course = await Course.findOne(input.course);
    if (!course) {
      return new MutateTaskError({
        field: "course",
        message: "Course could not be found",
      });
    }

    // enter into db
    const task = Task.create({
      title: input.title,
      course: course,
      description: input.description,
      due: input.due,
      user: user,
      completed: false,
    });

    try {
      await Task.insert(task);
    } catch (err) {
      console.error(err);
      throw new Error("An error occured");
    }

    return task;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => MutateTaskResult)
  async updateTask(
    @Ctx() { user }: MyContext,
    @Arg("input") input: UpdateTaskInput
  ) {
    // validate input
    console.log(input);
    console.log(user);

    let task = await Task.findOne({ where: { id: input.id, user: user } });
    if (!task) {
      return new MutateTaskError({
        field: "id",
        message: "Task not found",
      });
    }
    if (input.course) {
      const course = await Course.findOne(input.course);
      if (!course) {
        return new MutateTaskError({
          field: "course",
          message: "Course not found",
        });
      }
      task.course = course;
    }

    console.log(task);

    if (input.title) task.title = input.title;
    if (input.description) task.description = input.description;
    if (input.due) task.due = input.due;
    if (input.completed !== undefined) task.completed = input.completed;

    await Task.save(task);
    return task;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteTask(
    @Ctx() { user }: MyContext,
    @Arg("id", () => ID) id: number
  ) {
    try {
      await Task.delete({ id, user });
    } catch (err) {
      console.error(err);
      throw new Error("An error occured");
    }
    return true;
  }
}
