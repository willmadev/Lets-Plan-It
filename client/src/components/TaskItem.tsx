import { FC } from "react";
import { StyledParagraph } from "src/styles/global";
import styled from "styled-components";

const TaskItemContainer = styled.div`
  display: grid;
  grid-template-columns: min-content auto min-content;
  column-gap: 15px;
  height: 45px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.taskBorder};
  border-radius: 10px;
  padding: 0px 15px;
`;

const Checkbox: FC = () => {
  return <input type="checkbox" style={{ width: "20px", height: "20px" }} />;
};

const TaskItem: FC = () => {
  return (
    <TaskItemContainer>
      <Checkbox />
      <StyledParagraph>Task</StyledParagraph>
      <StyledParagraph>Date</StyledParagraph>
    </TaskItemContainer>
  );
};

export default TaskItem;
