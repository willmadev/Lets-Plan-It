import { FC } from "react";
import styled from "styled-components";
import { IconButton, StyledH1, StyledH2 } from "src/styles/app";
import fonts from "src/theme/font";
import TaskContainer from "./TaskContainer";
import { useHistory } from "react-router-dom";
import { History } from "history";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CourseContainer = styled.div`
  width: 980px;
  max-width: 90%;
  margin: auto;
  padding: 30px 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AddTaskContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const AddTaskButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  cursor: pointer;
  padding: 8px 20px;
  ${fonts.buttonText}
  color: ${(props) => props.theme.color.buttonText};
  border: none;
  border-radius: 12px;

  &:hover {
    background-color: ${(props) => props.theme.color.primaryHover};
  }
`;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface TaskListTitleProps {
  title: string;
  count: number;
}

const TaskListTitle: FC<TaskListTitleProps> = ({ title, count }) => {
  return (
    <StyledTitleContainer>
      <IconButton icon="chevron-down" />
      <StyledH2>
        {title} - {count}
      </StyledH2>
    </StyledTitleContainer>
  );
};

interface CourseTitleProps {
  courseName: string;
  history: History;
}

const CourseTitle: FC<CourseTitleProps> = ({ courseName, history }) => {
  return (
    <StyledTitleContainer>
      <IconButton icon="chevron-left" onClick={() => history.goBack()} />
      <StyledH1>Course</StyledH1>
    </StyledTitleContainer>
  );
};

const Course: FC = () => {
  const history = useHistory();
  return (
    <CourseContainer>
      <CourseTitle courseName="Course" history={history} />
      <AddTaskContainer>
        <AddTaskButton>Add Task</AddTaskButton>
        <AddTaskButton>Add From LMS</AddTaskButton>
      </AddTaskContainer>
      <TaskListContainer>
        <TaskListTitle title="Tasks" count={5} />
        <TaskContainer />
      </TaskListContainer>
      <TaskListContainer>
        <TaskListTitle title="Completed" count={3} />
        <TaskContainer />
      </TaskListContainer>
    </CourseContainer>
  );
};

export default Course;
