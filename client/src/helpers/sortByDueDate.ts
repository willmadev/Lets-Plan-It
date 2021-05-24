// import { GetTasksQuery } from "src/generated/graphql";

export const sortByDueDate = (tasks: any) => {
  const sortedTasks = [...tasks];
  sortedTasks.sort((a: any, b: any) => {
    if (a.due < b.due) return -1;
    if (a.due > b.due) return 1;
    return 0;
  });
  return sortedTasks;
};
