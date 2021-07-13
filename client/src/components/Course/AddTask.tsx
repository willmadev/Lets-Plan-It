import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import fonts from "src/theme/font";
import { Course, useCreateTaskMutation } from "src/generated/graphql";

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
  course?: Course | null;
}

const AddTask: FC<AddTaskProps> = ({ cancel, course }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    course: { id: "", courseName: "" },
    due: new Date(),
  });

  useEffect(() => {
    if (course) {
      setNewTask((task) => {
        return { ...task, course: course };
      });
    }
  }, [course]);

  // create task mutation
  const [, createTask] = useCreateTaskMutation();
  //   {
  //     // update cache to add newly created task
  //     update: (cache, { data }) => {
  //       if (!data) {
  //         return;
  //       }

  //       if (data.createTask.__typename === "MutateTaskError") {
  //         return;
  //       }

  //       // const { getTasks } = cache.readQuery({
  //       //   query: GetTasksDocument,
  //       // }) ?? { getTask: null };

  //       // const newCache = [...getTasks, data?.createTask];

  //       // add completed field
  //       let completedFieldData = data.createTask;
  //       cache.writeQuery({
  //         query: GetTasksDocument,
  //         data: { getTasks: [completedFieldData] },
  //       });

  //       console.log("new cache", completedFieldData);
  //     },
  //   }

  const submitTask = async () => {
    console.log("Submitting new task");

    // input validation

    // let response;
    try {
      const response = await createTask({
        input: {
          course: newTask.course.id,
          due: newTask.due,
          title: newTask.title,
        },
      });
      console.log("create task response:", response);
      setNewTask({
        ...newTask,
        due: new Date(),
        title: "",
      });
    } catch (err) {
      console.error("create task error:", err);
    }
  };

  return (
    <AddTaskContainer>
      <TaskInputContainer>
        <TaskTitleInput
          placeholder="Add new task"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <AddTaskOptions>
          <StyledDayPickerInput>
            <DayPickerInput
              placeholder="Due date"
              value={newTask.due}
              onDayChange={(day) => setNewTask({ ...newTask, due: day })}
            />
          </StyledDayPickerInput>
        </AddTaskOptions>
      </TaskInputContainer>
      <AddTaskOptionsContainer>
        <SubmitButton onClick={() => submitTask()}>Add Task</SubmitButton>
        <CancelButton onClick={() => cancel()}>Cancel</CancelButton>
      </AddTaskOptionsContainer>
    </AddTaskContainer>
  );
};

export default AddTask;
