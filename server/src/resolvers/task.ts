import { Task } from "../entity/Task";
import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../helpers/types";

@InputType()
class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  course: string;

  @Field()
  description?: string;

  @Field()
  due: Date;
}

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  allTasks() {
    return Task.find();
  }

  @Query(() => Task)
  task(@Arg("id", () => ID) id: number) {
    return Task.findOne(id);
  }

  @Mutation(() => Task)
  @UseMiddleware(isAuth)
  async createTask(
    @Arg("input") input: CreateTaskInput,
    @Ctx() { user }: MyContext
  ) {
    // validate input
    console.log(input);

    const task = Task.create({
      title: input.title,
      course: input.course,
      description: input.description,
      due: input.due,
      user: user,
    });
    try {
      await task.save();
    } catch (err) {
      console.error(err);
      throw new Error("an error was encountered");
    }

    return task;
  }
}
