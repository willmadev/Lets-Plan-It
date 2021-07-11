import { FC } from "react";
import { useGetCoursesQuery } from "src/generated/graphql";
import { StyledH1 } from "src/styles/app";
import styled from "styled-components";
// import TaskContainer from "./TaskContainer";

const DashboardContainer = styled.div`
  width: 980px;
  max-width: 90%;
  margin: auto;
  padding: 30px 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// const CourseCardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 50px;
// `;
// const CourseCard = styled.div`
//   width: calc(100% - 80px);
//   background-color: ${(props) => props.theme.color.elementBackground};
//   padding: 20px 40px;
//   border-radius: 20px;
//   filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05));
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

const Dashboard: FC = () => {
  const { loading, data } = useGetCoursesQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !data.getCourses) {
    return <p>No courses found</p>;
  }

  return (
    <DashboardContainer>
      <StyledH1>Dashboard</StyledH1>
      {/* <CourseCardContainer>
        {data.getCourses.map((course) => {
          return (
            <CourseCard key={course.id}>
              <StyledH2>{course.courseName}</StyledH2>
              {course.tasks ? (
                <TaskContainer tasks={course.tasks} />
              ) : (
                <p>No tasks found</p>
              )}
            </CourseCard>
          );
        })}
      </CourseCardContainer> */}
    </DashboardContainer>
  );
};

export default Dashboard;
