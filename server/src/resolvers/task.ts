import { Task } from "../entity/Task";
import { Arg, ID, Query, Resolver } from "type-graphql";

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
}
