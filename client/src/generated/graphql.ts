import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthError = {
  __typename?: 'AuthError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  accessToken: Scalars['String'];
};

export type AuthResult = AuthPayload | AuthError;

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  courseName: Scalars['String'];
  color: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
  taskCount: Scalars['Int'];
};


export type CourseTasksArgs = {
  filter?: Maybe<TaskFilterInput>;
  cursor?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
};


export type CourseTaskCountArgs = {
  filter?: Maybe<TaskFilterInput>;
};

export type CreateCourseInput = {
  courseName: Scalars['String'];
  color: Scalars['String'];
};

export type CreateTaskInput = {
  title: Scalars['String'];
  course: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  due: Scalars['DateTime'];
};


export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutateCourseError = {
  __typename?: 'MutateCourseError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MutateCourseResult = Course | MutateCourseError;

export type MutateTaskError = {
  __typename?: 'MutateTaskError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type MutateTaskResult = Task | MutateTaskError;

export type Mutation = {
  __typename?: 'Mutation';
  createTask: MutateTaskResult;
  updateTask: MutateTaskResult;
  deleteTask: Scalars['Boolean'];
  register: AuthResult;
  login: AuthResult;
  createCourse: MutateCourseResult;
  updateCourse: MutateCourseResult;
  deleteCourse: Scalars['Boolean'];
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  testAuth: Scalars['String'];
  getTasks: Array<Task>;
  getSingleTask?: Maybe<Task>;
  getUser: User;
  getCourses?: Maybe<Array<Course>>;
  getSingleCourse?: Maybe<Course>;
};


export type QueryGetTasksArgs = {
  filter?: Maybe<TaskFilterInput>;
  cursor?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetSingleTaskArgs = {
  id: Scalars['ID'];
};


export type QueryGetSingleCourseArgs = {
  id: Scalars['ID'];
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID'];
  title: Scalars['String'];
  course: Course;
  description?: Maybe<Scalars['String']>;
  completed?: Maybe<Scalars['Boolean']>;
  due: Scalars['String'];
};

export type TaskFilterInput = {
  completed?: Maybe<Scalars['Boolean']>;
  course?: Maybe<Scalars['ID']>;
};

export type UpdateCourseInput = {
  id: Scalars['ID'];
  courseName?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type UpdateTaskInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  course?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  due?: Maybe<Scalars['DateTime']>;
  completed?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'id' | 'email' | 'name' | 'accessToken'>
  ) | (
    { __typename?: 'AuthError' }
    & Pick<AuthError, 'field' | 'message'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'id' | 'email' | 'name' | 'accessToken'>
  ) | (
    { __typename?: 'AuthError' }
    & Pick<AuthError, 'field' | 'message'>
  ) }
);

export type TestAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type TestAuthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'testAuth'>
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  ) }
);

export type CreateCourseMutationVariables = Exact<{
  input: CreateCourseInput;
  taskCountFilter?: Maybe<TaskFilterInput>;
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse: (
    { __typename?: 'Course' }
    & MutateCourseFragment_Course_Fragment
  ) | (
    { __typename?: 'MutateCourseError' }
    & MutateCourseFragment_MutateCourseError_Fragment
  ) }
);

export type UpdateCourseMutationVariables = Exact<{
  input: UpdateCourseInput;
  taskCountFilter?: Maybe<TaskFilterInput>;
}>;


export type UpdateCourseMutation = (
  { __typename?: 'Mutation' }
  & { updateCourse: (
    { __typename?: 'Course' }
    & MutateCourseFragment_Course_Fragment
  ) | (
    { __typename?: 'MutateCourseError' }
    & MutateCourseFragment_MutateCourseError_Fragment
  ) }
);

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCourse'>
);

export type GetCoursesQueryVariables = Exact<{
  taskCountFilter?: Maybe<TaskFilterInput>;
}>;


export type GetCoursesQuery = (
  { __typename?: 'Query' }
  & { getCourses?: Maybe<Array<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )>> }
);

export type GetSingleCourseQueryVariables = Exact<{
  id: Scalars['ID'];
  taskCountFilter?: Maybe<TaskFilterInput>;
}>;


export type GetSingleCourseQuery = (
  { __typename?: 'Query' }
  & { getSingleCourse?: Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )> }
);

type MutateCourseFragment_Course_Fragment = (
  { __typename?: 'Course' }
  & CourseFragmentFragment
);

type MutateCourseFragment_MutateCourseError_Fragment = (
  { __typename: 'MutateCourseError' }
  & Pick<MutateCourseError, 'field' | 'message'>
);

export type MutateCourseFragmentFragment = MutateCourseFragment_Course_Fragment | MutateCourseFragment_MutateCourseError_Fragment;

export type CourseFragmentFragment = (
  { __typename: 'Course' }
  & Pick<Course, 'id' | 'courseName' | 'color' | 'taskCount'>
);

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & MutateTaskFragment_Task_Fragment
  ) | (
    { __typename?: 'MutateTaskError' }
    & MutateTaskFragment_MutateTaskError_Fragment
  ) }
);

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & MutateTaskFragment_Task_Fragment
  ) | (
    { __typename?: 'MutateTaskError' }
    & MutateTaskFragment_MutateTaskError_Fragment
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type GetTasksQueryVariables = Exact<{
  filter: TaskFilterInput;
  cursor?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { getTasks: Array<(
    { __typename?: 'Task' }
    & TaskFragmentFragment
  )> }
);

export type GetSingleTaskQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSingleTaskQuery = (
  { __typename?: 'Query' }
  & { getSingleTask?: Maybe<(
    { __typename?: 'Task' }
    & TaskFragmentFragment
  )> }
);

type MutateTaskFragment_Task_Fragment = (
  { __typename?: 'Task' }
  & TaskFragmentFragment
);

type MutateTaskFragment_MutateTaskError_Fragment = (
  { __typename: 'MutateTaskError' }
  & Pick<MutateTaskError, 'field' | 'message'>
);

export type MutateTaskFragmentFragment = MutateTaskFragment_Task_Fragment | MutateTaskFragment_MutateTaskError_Fragment;

export type TaskFragmentFragment = (
  { __typename: 'Task' }
  & Pick<Task, 'id' | 'title' | 'description' | 'due' | 'completed'>
  & { course: (
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'courseName' | 'color' | 'taskCount'>
  ) }
);

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export const CourseFragmentFragmentDoc = gql`
    fragment CourseFragment on Course {
  __typename
  id
  courseName
  color
  taskCount(filter: $taskCountFilter)
}
    `;
export const MutateCourseFragmentFragmentDoc = gql`
    fragment MutateCourseFragment on MutateCourseResult {
  ... on Course {
    ...CourseFragment
  }
  ... on MutateCourseError {
    __typename
    field
    message
  }
}
    ${CourseFragmentFragmentDoc}`;
export const TaskFragmentFragmentDoc = gql`
    fragment TaskFragment on Task {
  __typename
  id
  title
  course {
    id
    courseName
    color
    taskCount
  }
  description
  due
  completed
}
    `;
export const MutateTaskFragmentFragmentDoc = gql`
    fragment MutateTaskFragment on MutateTaskResult {
  ... on Task {
    ...TaskFragment
  }
  ... on MutateTaskError {
    __typename
    field
    message
  }
}
    ${TaskFragmentFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ... on AuthPayload {
      id
      email
      name
      accessToken
    }
    ... on AuthError {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ... on AuthPayload {
      id
      email
      name
      accessToken
    }
    ... on AuthError {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const TestAuthDocument = gql`
    query TestAuth {
  testAuth
}
    `;

export function useTestAuthQuery(options: Omit<Urql.UseQueryArgs<TestAuthQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TestAuthQuery>({ query: TestAuthDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    id
    name
    email
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const CreateCourseDocument = gql`
    mutation CreateCourse($input: CreateCourseInput!, $taskCountFilter: TaskFilterInput) {
  createCourse(input: $input) {
    ...MutateCourseFragment
  }
}
    ${MutateCourseFragmentFragmentDoc}`;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($input: UpdateCourseInput!, $taskCountFilter: TaskFilterInput) {
  updateCourse(input: $input) {
    ...MutateCourseFragment
  }
}
    ${MutateCourseFragmentFragmentDoc}`;

export function useUpdateCourseMutation() {
  return Urql.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument);
};
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id)
}
    `;

export function useDeleteCourseMutation() {
  return Urql.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument);
};
export const GetCoursesDocument = gql`
    query GetCourses($taskCountFilter: TaskFilterInput) {
  getCourses {
    ...CourseFragment
  }
}
    ${CourseFragmentFragmentDoc}`;

export function useGetCoursesQuery(options: Omit<Urql.UseQueryArgs<GetCoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCoursesQuery>({ query: GetCoursesDocument, ...options });
};
export const GetSingleCourseDocument = gql`
    query GetSingleCourse($id: ID!, $taskCountFilter: TaskFilterInput) {
  getSingleCourse(id: $id) {
    ...CourseFragment
  }
}
    ${CourseFragmentFragmentDoc}`;

export function useGetSingleCourseQuery(options: Omit<Urql.UseQueryArgs<GetSingleCourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSingleCourseQuery>({ query: GetSingleCourseDocument, ...options });
};
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    ...MutateTaskFragment
  }
}
    ${MutateTaskFragmentFragmentDoc}`;

export function useCreateTaskMutation() {
  return Urql.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument);
};
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    ...MutateTaskFragment
  }
}
    ${MutateTaskFragmentFragmentDoc}`;

export function useUpdateTaskMutation() {
  return Urql.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument);
};
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;

export function useDeleteTaskMutation() {
  return Urql.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument);
};
export const GetTasksDocument = gql`
    query GetTasks($filter: TaskFilterInput!, $cursor: ID, $limit: Int) {
  getTasks(filter: $filter, cursor: $cursor, limit: $limit) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

export function useGetTasksQuery(options: Omit<Urql.UseQueryArgs<GetTasksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTasksQuery>({ query: GetTasksDocument, ...options });
};
export const GetSingleTaskDocument = gql`
    query GetSingleTask($id: ID!) {
  getSingleTask(id: $id) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

export function useGetSingleTaskQuery(options: Omit<Urql.UseQueryArgs<GetSingleTaskQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSingleTaskQuery>({ query: GetSingleTaskDocument, ...options });
};
export const TestDocument = gql`
    query Test {
  hello
}
    `;

export function useTestQuery(options: Omit<Urql.UseQueryArgs<TestQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TestQuery>({ query: TestDocument, ...options });
};
export const CourseFragment = gql`
    fragment CourseFragment on Course {
  __typename
  id
  courseName
  color
  taskCount(filter: $taskCountFilter)
}
    `;
export const MutateCourseFragment = gql`
    fragment MutateCourseFragment on MutateCourseResult {
  ... on Course {
    ...CourseFragment
  }
  ... on MutateCourseError {
    __typename
    field
    message
  }
}
    ${CourseFragment}`;
export const TaskFragment = gql`
    fragment TaskFragment on Task {
  __typename
  id
  title
  course {
    id
    courseName
    color
    taskCount
  }
  description
  due
  completed
}
    `;
export const MutateTaskFragment = gql`
    fragment MutateTaskFragment on MutateTaskResult {
  ... on Task {
    ...TaskFragment
  }
  ... on MutateTaskError {
    __typename
    field
    message
  }
}
    ${TaskFragment}`;
export const Login = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ... on AuthPayload {
      id
      email
      name
      accessToken
    }
    ... on AuthError {
      field
      message
    }
  }
}
    `;
export const Register = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ... on AuthPayload {
      id
      email
      name
      accessToken
    }
    ... on AuthError {
      field
      message
    }
  }
}
    `;
export const TestAuth = gql`
    query TestAuth {
  testAuth
}
    `;
export const GetUser = gql`
    query GetUser {
  getUser {
    id
    name
    email
  }
}
    `;
export const CreateCourse = gql`
    mutation CreateCourse($input: CreateCourseInput!, $taskCountFilter: TaskFilterInput) {
  createCourse(input: $input) {
    ...MutateCourseFragment
  }
}
    ${MutateCourseFragment}`;
export const UpdateCourse = gql`
    mutation UpdateCourse($input: UpdateCourseInput!, $taskCountFilter: TaskFilterInput) {
  updateCourse(input: $input) {
    ...MutateCourseFragment
  }
}
    ${MutateCourseFragment}`;
export const DeleteCourse = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id)
}
    `;
export const GetCourses = gql`
    query GetCourses($taskCountFilter: TaskFilterInput) {
  getCourses {
    ...CourseFragment
  }
}
    ${CourseFragment}`;
export const GetSingleCourse = gql`
    query GetSingleCourse($id: ID!, $taskCountFilter: TaskFilterInput) {
  getSingleCourse(id: $id) {
    ...CourseFragment
  }
}
    ${CourseFragment}`;
export const CreateTask = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    ...MutateTaskFragment
  }
}
    ${MutateTaskFragment}`;
export const UpdateTask = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    ...MutateTaskFragment
  }
}
    ${MutateTaskFragment}`;
export const DeleteTask = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;
export const GetTasks = gql`
    query GetTasks($filter: TaskFilterInput!, $cursor: ID, $limit: Int) {
  getTasks(filter: $filter, cursor: $cursor, limit: $limit) {
    ...TaskFragment
  }
}
    ${TaskFragment}`;
export const GetSingleTask = gql`
    query GetSingleTask($id: ID!) {
  getSingleTask(id: $id) {
    ...TaskFragment
  }
}
    ${TaskFragment}`;
export const Test = gql`
    query Test {
  hello
}
    `;