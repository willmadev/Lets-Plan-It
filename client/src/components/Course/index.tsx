import { FC, useState } from "react";
import styled from "styled-components";
import { History } from "history";
import { useHistory, useParams } from "react-router-dom";
import { IconButton, StyledH1, StyledH2 } from "src/styles/app";
import fonts from "src/theme/font";
import TaskContainer from "../TaskContainer";
import { CourseRouteParams } from "src/pages/App";
import {
  useGetSingleCourseQuery,
  useGetTasksQuery,
} from "src/generated/graphql";
import AddTask from "./AddTask";
import { useEffect } from "react";

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

interface CourseProps {
  scrolledToBottom: boolean;
}

const Course: FC<CourseProps> = ({ scrolledToBottom }) => {
  const history = useHistory();
  const { courseId } = useParams<CourseRouteParams>();
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [limit, setLimit] = useState(10);

  // course query
  const [{ fetching: courseFetching, data: courseData }] =
    useGetSingleCourseQuery({
      variables: { id: courseId },
      requestPolicy: "cache-and-network",
    });

  // task query
  const [{ error: tasksError, data: tasksData }, reexecuteQuery] =
    useGetTasksQuery({
      variables: {
        limit: limit,
        filter: { course: courseData?.getSingleCourse?.id },
      },
      requestPolicy: "network-only",
    });

  const fetchMore = () => reexecuteQuery();

  // fetch more when scrolled to bottom
  useEffect(() => {
    if (scrolledToBottom) {
      setLimit((limit) => limit + 10);
      // reexecuteQuery();
      fetchMore();
    }
  }, [scrolledToBottom]);

  //#region loading and no data
  if (courseFetching) {
    return <p>Loading course...</p>;
  }
  if (!courseData || !courseData.getSingleCourse) {
    return <p>Course not found</p>;
  }
  if (!tasksData || !tasksData.getTasks) {
    return <p>No tasks found</p>;
  }
  if (tasksError) {
    return <p>Error: {tasksError.message}</p>;
  }
  //#endregion

  return (
    <CourseContainer>
      <CourseTitleContainer>
        <CourseTitle
          courseName={courseData.getSingleCourse.courseName}
          history={history}
        />
      </CourseTitleContainer>
      <AddTaskContainer>
        <AddTaskButton onClick={() => setAddTaskActive(true)}>
          Add Task
        </AddTaskButton>
        <AddTaskButton>Add From LMS</AddTaskButton>
      </AddTaskContainer>
      {addTaskActive ? (
        <AddTask
          cancel={() => setAddTaskActive(false)}
          course={courseData.getSingleCourse}
        />
      ) : null}
      {tasksData.getTasks ? (
        <TaskListContainer>
          <TaskListTitle
            title="Tasks"
            count={courseData.getSingleCourse.taskCount}
          />
          <TaskContainer tasks={tasksData.getTasks} />
        </TaskListContainer>
      ) : (
        <p>No tasks</p>
      )}
    </CourseContainer>
  );
};

export default Course;
