import { FC } from "react";
import styled from "styled-components";
import { IconButton, StyledH1, StyledH2 } from "src/styles/app";
import fonts from "src/theme/font";
import TaskContainer from "./TaskContainer";
import { useHistory, useParams } from "react-router-dom";
import { History } from "history";
import { CourseRouteParams } from "src/pages/App";
import { useGetSingleCourseQuery } from "src/generated/graphql";
import AddTask from "./AddTask";
import { useState } from "react";

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
  gap: 20px;
`;

const AddTaskButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  cursor: pointer;
  padding: 7px 15px;
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
      <StyledH1>{courseName}</StyledH1>
    </StyledTitleContainer>
  );
};

const CourseTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Course: FC = () => {
  const history = useHistory();
  const [AddTaskActive, setAddTaskActive] = useState(false);

  const { courseId } = useParams<CourseRouteParams>();

  const { loading, data } = useGetSingleCourseQuery({
    variables: { id: courseId },
  });
  if (loading) {
    return <p>Loading course...</p>;
  }
  if (!data || !data.getSingleCourse) {
    return <p>Course not found</p>;
  }

  return (
    <CourseContainer>
      <CourseTitleContainer>
        <CourseTitle
          courseName={data.getSingleCourse.courseName}
          history={history}
        />
      </CourseTitleContainer>
      <AddTaskContainer>
        <AddTaskButton onClick={() => setAddTaskActive(true)}>
          Add Task
        </AddTaskButton>
        <AddTaskButton>Add From LMS</AddTaskButton>
      </AddTaskContainer>
      {AddTaskActive ? (
        <AddTask cancel={() => setAddTaskActive(false)} />
      ) : null}
      {data.getSingleCourse.tasks ? (
        <TaskListContainer>
          <TaskListTitle title="Tasks" count={data.getSingleCourse.taskCount} />
          <TaskContainer tasks={data.getSingleCourse.tasks!} />
        </TaskListContainer>
      ) : (
        <p>No tasks</p>
      )}
      {/* <TaskListContainer>
        <TaskListTitle title="Completed" count={3} />
        <TaskContainer />
      </TaskListContainer> */}
    </CourseContainer>
  );
};

export default Course;
