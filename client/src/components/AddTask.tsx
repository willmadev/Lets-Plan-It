import { FC } from "react";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import fonts from "src/theme/font";

const AddTaskContainer = styled.div`
  column-gap: 15px;
  height: min-content;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.taskBorder};
  border-radius: 10px;
  /* padding: 10px 15px; */
  background-color: ${(props) => props.theme.color.elementBackground};
  position: relative;
`;

const TaskTitleInput = styled.textarea`
  width: calc(100% - 10px);
  border: none;
  padding: 10px 10px;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  resize: none;
  ${fonts.paragraph}
`;

const AddTaskOptions = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: max-content auto max-content;
  width: calc(100% - 40px);
  gap: 20px;
  bottom: 10px;
  left: 10px;
  align-items: center;
`;

const StyledDayPickerInput = styled.div`
  grid-column: 1;
  font-family: "Open Sans", sans-serif;
  & input {
    font-size: 16px;
    width: 100px;
  }
`;

const SubmitButton = styled.button`
  grid-column: 3;
  height: max-content;
  width: max-content;
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  outline: none;
  border-radius: 10px;
  color: ${(props) => props.theme.color.buttonText};
  ${fonts.buttonText}
  font-size: 18px;
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.primaryHover};
  }
`;

const AddTask: FC = () => {
  return (
    <AddTaskContainer>
      <TaskTitleInput placeholder="Add new task" />
      <AddTaskOptions>
        <StyledDayPickerInput>
          <DayPickerInput placeholder="Due date" />
        </StyledDayPickerInput>
        <SubmitButton>Add</SubmitButton>
      </AddTaskOptions>
    </AddTaskContainer>
  );
};

export default AddTask;
