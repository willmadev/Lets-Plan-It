import { FC } from "react";
import styled from "styled-components";
import { Task } from "src/generated/graphql";
import TaskItem from "./TaskItem";

const StyledTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

interface TaskContainerProps {
  tasks: Task[];
}

const TaskContainer: FC<TaskContainerProps> = ({ tasks }) => {
  return (
    <StyledTaskContainer>
      {tasks.map((task) => {
        return <TaskItem task={task} key={task.id} />;
      })}
    </StyledTaskContainer>
  );
};

export default TaskContainer;
