import { FC } from "react";
import { StyledH1, StyledH2 } from "src/styles/app";
import styled from "styled-components";
import TaskItem from "./TaskItem";

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
const CourseCard = styled.div`
  width: calc(100% - 80px);
  background-color: ${(props) => props.theme.color.elementBackground};
  padding: 20px 40px;
  border-radius: 20px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Dashboard: FC = () => {
  return (
    <DashboardContainer>
      <StyledH1>Dashboard</StyledH1>
      <CourseCardContainer>
        <CourseCard>
          <StyledH2>Course</StyledH2>
          <TaskContainer>
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </TaskContainer>
        </CourseCard>

        <CourseCard>
          <StyledH2>Course</StyledH2>
          <TaskContainer>
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </TaskContainer>
        </CourseCard>
        <CourseCard>
          <StyledH2>Course</StyledH2>
          <TaskContainer>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </TaskContainer>
        </CourseCard>
        <CourseCard>
          <StyledH2>Course</StyledH2>
          <TaskContainer>
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </TaskContainer>
        </CourseCard>
        <CourseCard>
          <StyledH2>Course</StyledH2>
          <TaskContainer>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </TaskContainer>
        </CourseCard>
      </CourseCardContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
