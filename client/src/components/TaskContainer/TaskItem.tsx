import { parse } from "date-fns";
import { FC, useState } from "react";
import styled from "styled-components";
import { Task, useUpdateTaskMutation } from "src/generated/graphql";
import { StyledParagraph } from "src/styles/global";
import { formatDate } from "src/utils/formatDate";

const TaskItemContainer = styled.div`
  display: grid;
  grid-template-columns: min-content auto max-content;
  column-gap: 15px;
  height: 45px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.taskBorder};
  border-radius: 10px;
  padding: 0px 15px;
  background-color: ${(props) => props.theme.color.elementBackground};
`;

interface CheckboxProps {
  completed: boolean;
  onChange: Function;
}

const Checkbox: FC<CheckboxProps> = ({ completed, onChange }) => {
  return (
    <input
      type="checkbox"
      style={{ width: "20px", height: "20px" }}
      checked={completed}
      onChange={() => onChange()}
    />
  );
};

interface TaskItemProps {
  task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed || false);
  const [, updateTask] = useUpdateTaskMutation();

  const updateCompleted = async (completed: boolean) => {
    let response;
    try {
      response = await updateTask({
        input: {
          id: task.id,
          completed: completed,
        },
      });
      console.log("complete task response:", response);
    } catch (err) {
      console.error("complete task error:", err);
    }
  };

  const onCheckboxChange = () => {
    updateCompleted(!completed);
    setCompleted(!completed);
  };
  return (
    <TaskItemContainer>
      <Checkbox completed={completed} onChange={onCheckboxChange} />
      <StyledParagraph>{task.title}</StyledParagraph>
      <StyledParagraph>
        {formatDate(parse(task.due, "T", new Date()))}
      </StyledParagraph>
    </TaskItemContainer>
  );
};

export default TaskItem;
