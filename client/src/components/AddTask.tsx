import { FC } from "react";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import fonts from "src/theme/font";

const AddTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TaskInputContainer = styled.div`
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
  display: flex;
  width: calc(100% - 40px);
  gap: 20px;
  bottom: 10px;
  left: 10px;
  align-items: center;
`;

const StyledDayPickerInput = styled.div`
  font-family: "Open Sans", sans-serif;
  & input {
    font-size: 16px;
    width: 100px;
  }
`;

const AddTaskOptionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitButton = styled.button`
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

const CancelButton = styled.button`
  height: max-content;
  width: max-content;
  background-color: rgba(0, 0, 0, 0);
  border: 1px black solid;
  font-size: 18px;
  border-radius: 10px;
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background-color: #acacac;
  }
`;

interface AddTaskProps {
  cancel: Function;
}

const AddTask: FC<AddTaskProps> = ({ cancel }) => {
  return (
    <AddTaskContainer>
      <TaskInputContainer>
        <TaskTitleInput placeholder="Add new task" />
        <AddTaskOptions>
          <StyledDayPickerInput>
            <DayPickerInput placeholder="Due date" />
          </StyledDayPickerInput>
        </AddTaskOptions>
      </TaskInputContainer>
      <AddTaskOptionsContainer>
        <SubmitButton>Add Task</SubmitButton>
        <CancelButton onClick={() => cancel()}>Cancel</CancelButton>
      </AddTaskOptionsContainer>
    </AddTaskContainer>
  );
};

export default AddTask;
