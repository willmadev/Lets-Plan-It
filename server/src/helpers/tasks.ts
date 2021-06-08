import { Task } from "../entity/Task";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { TaskFilterInput } from "../resolvers/task";

interface getTaskArgs {
  user: User;
  limit: number;
  cursor: number;
  filter: TaskFilterInput;
}

export const getTasks = async ({
  user,
  limit,
  cursor,
  filter,
}: getTaskArgs) => {
  try {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Task)
      .createQueryBuilder("task")
      .orderBy("task.due", "ASC")
      .take(realLimit)
      .where('"task"."userId" = :userId', { userId: user.id })
      .leftJoinAndSelect("task.course", "course");

    if (cursor) {
      const cursorTask = await Task.findOne(cursor);
      if (!cursorTask) {
        throw new Error("Cursor not valid");
      }
      qb.andWhere('"task"."due" > :cursor', { cursor: cursorTask.due });
    }

    console.log("filter", filter);

    if (filter) {
      if (filter.completed !== undefined) {
        qb.andWhere('"task"."completed" = :completed', {
          completed: filter.completed,
        });
      }
      if (filter.course !== undefined) {
        qb.andWhere('"task"."courseId" = :course', { course: filter.course });
      }
    }

    const tasks = await qb.getMany();
    console.log(tasks);
    return tasks;
  } catch (err) {
    console.error(err);
    throw new Error("An error occured");
  }
};
