import { FC } from "react";
import { Link } from "react-router-dom";
import { StyledH1, StyledH2 } from "src/styles/app";
import { StyledParagraph } from "src/styles/global";
import styled from "styled-components";

const CoursesContainer = styled.div`
  width: 980px;
  max-width: 90%;
  margin: auto;
  padding: 30px 0px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const CourseCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  align-items: center;
`;

interface CourseCardWrapperProps {
  color: string;
}

const CourseCardWrapper = styled(Link)<CourseCardWrapperProps>`
  width: 270px;
  height: 150px;
  /* background-color: ${(props) => props.color}30; */
  background-color: ${(props) => props.theme.color.elementBackground};
  border-radius: 15px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: ${(props) => props.theme.color.elementBackgroundHover};
  }
`;

interface CourseCardBarProps {
  color: string;
}

const CourseCardBar = styled.div<CourseCardBarProps>`
  width: 270px;
  height: 20px;
  border-radius: 15px 15px 0 0;
  background-color: ${(props) => props.color};
`;

const CourseCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px 20px;
`;

interface CourseCardProps {
  path: string;
  courseName: string;
  taskCount: number;
  color: string;
}

const CourseCard: FC<CourseCardProps> = ({
  path,
  courseName,
  taskCount,
  color,
}) => {
  return (
    <CourseCardWrapper to={path} color={color}>
      <CourseCardBar color={color} />
      <CourseCardContent>
        <StyledH2>{courseName}</StyledH2>
        <StyledParagraph>Remaining Tasks: {taskCount}</StyledParagraph>
      </CourseCardContent>
    </CourseCardWrapper>
  );
};

interface CoursesProps {
  basePath: string;
}

const Courses: FC<CoursesProps> = ({ basePath }) => {
  return (
    <CoursesContainer>
      <StyledH1>Courses</StyledH1>
      <CourseCardsContainer>
        <CourseCard
          path={`${basePath}/course`}
          courseName="Course Title"
          taskCount={5}
          color="#ff0000"
        />
        <CourseCard
          path={`${basePath}/course`}
          courseName="Course Title"
          taskCount={5}
          color="#ff00ff"
        />
        <CourseCard
          path={`${basePath}/course`}
          courseName="Course Title"
          taskCount={5}
          color="#ffff00"
        />
        <CourseCard
          path={`${basePath}/course`}
          courseName="Course Title"
          taskCount={5}
          color="#00ff00"
        />
        <CourseCard
          path={`${basePath}/course`}
          courseName="Course Title"
          taskCount={5}
          color="#ff00ff"
        />
        <CourseCard
          path={`${basePath}/course`}
          courseName="Course Title"
          taskCount={5}
          color="#00ffff"
        />
      </CourseCardsContainer>
    </CoursesContainer>
  );
};

export default Courses;
