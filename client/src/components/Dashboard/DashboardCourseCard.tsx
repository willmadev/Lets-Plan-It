import { FC } from "react";
import { Course, useGetTasksQuery } from "src/generated/graphql";
import { StyledH2 } from "src/styles/app";
import styled from "styled-components";
import TaskContainer from "../TaskContainer";

const StyledCourseCard = styled.div`
  width: calc(100% - 80px);
  background-color: ${(props) => props.theme.color.elementBackground};
  padding: 20px 40px;
  border-radius: 20px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface DashboardCourseCardProps {
  course: Course;
}

const DashboardCourseCard: FC<DashboardCourseCardProps> = ({ course }) => {
  const [{ fetching, data }] = useGetTasksQuery({
    variables: { filter: { course: course.id } },
  });

  if (fetching) {
    return <p>loading...</p>;
  }
  return (
    <StyledCourseCard>
      <StyledH2>{course.courseName}</StyledH2>
      {data?.getTasks ? (
        <TaskContainer tasks={data.getTasks} />
      ) : (
        <p>No tasks</p>
      )}
    </StyledCourseCard>
  );
};

export default DashboardCourseCard;
