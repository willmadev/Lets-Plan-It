import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Task } from "../entity/Task";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../helpers/types";

@InputType()
class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  course: string;

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

  @Field({ nullable: true })
  course?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  due?: Date;
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

@Resolver()
export class TaskResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Task])
  async allTasks(@Ctx() { user }: MyContext): Promise<Array<Task> | undefined> {
    try {
      const tasks = await Task.find({ where: { user: user } });
      return tasks;
    } catch (err) {
      console.log(err);
      throw new Error();
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => Task, { nullable: true })
  async singleTask(
    @Ctx() { user }: MyContext,
    @Arg("id", () => ID) id: number
  ): Promise<Task | undefined> {
    return await Task.findOne({ where: { id, user: user } });
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

    // enter into db
    const task = Task.create({
      title: input.title,
      course: input.course,
      description: input.description,
      due: input.due,
      user: user,
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

    console.log(task);

    if (input.title) task.title = input.title;
    if (input.course) task.course = input.course;
    if (input.description) task.description = input.description;
    if (input.due) task.due = input.due;

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