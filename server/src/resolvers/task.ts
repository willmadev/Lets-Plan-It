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
import { MyContext } from "../helpers/types";
import { getConnection } from "typeorm";

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
class TaskFilterInput {
  @Field()
  completed: boolean;
}

@Resolver()
export class TaskResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Task])
  async getTasks(
    @Ctx() { user }: MyContext,
    @Arg("limit", () => Int, { defaultValue: 50 }) limit: number,
    @Arg("cursor", () => ID, { nullable: true }) cursor: number,
    @Arg("filter", () => TaskFilterInput, { nullable: true })
    filter: TaskFilterInput
  ): Promise<Array<Task> | undefined> {
    try {
      const realLimit = Math.min(50, limit);
      const qb = getConnection()
        .getRepository(Task)
        .createQueryBuilder("task")
        .orderBy("due", "ASC")
        .take(realLimit)
        .where('"userId" = :userId', { userId: user.id });

      if (cursor) {
        const cursorTask = await Task.findOne(cursor);
        if (!cursorTask) {
          throw new Error("Cursor not valid");
        }
        qb.andWhere("due > :cursor", { cursor: cursorTask.due });
      }

      if (filter?.completed !== undefined) {
        qb.andWhere("completed = :completed", { completed: filter.completed });
      }

      const tasks = await qb.getMany();
      return tasks;
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => Task, { nullable: true })
  async getSingleTask(
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

    console.log(task);

    if (input.title) task.title = input.title;
    if (input.course) task.course = input.course;
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
