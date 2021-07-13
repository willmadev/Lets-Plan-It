import { FC } from "react";
import { useGetCoursesQuery } from "src/generated/graphql";
import { StyledH1 } from "src/styles/app";
import styled from "styled-components";
import DashboardCourseCard from "./DashboardCourseCard";

const DashboardContainer = styled.div`
  width: 980px;
  max-width: 90%;
  margin: auto;
  padding: 30px 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CourseCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Dashboard: FC = () => {
  const [{ fetching, data }] = useGetCoursesQuery();

  if (fetching) {
    return <p>Loading...</p>;
  }

  if (!data || !data.getCourses) {
    return <p>No courses found</p>;
  }

  return (
    <DashboardContainer>
      <StyledH1>Dashboard</StyledH1>
      <CourseCardContainer>
        {data.getCourses.map((course) => {
          return <DashboardCourseCard course={course} key={course.id} />;
        })}
      </CourseCardContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
