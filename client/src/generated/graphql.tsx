import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  id: Scalars['Float'];
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TestAuthDocument = gql`
    query TestAuth {
  testAuth
}
    `;

/**
 * __useTestAuthQuery__
 *
 * To run a query within a React component, call `useTestAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestAuthQuery(baseOptions?: Apollo.QueryHookOptions<TestAuthQuery, TestAuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestAuthQuery, TestAuthQueryVariables>(TestAuthDocument, options);
      }
export function useTestAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestAuthQuery, TestAuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestAuthQuery, TestAuthQueryVariables>(TestAuthDocument, options);
        }
export type TestAuthQueryHookResult = ReturnType<typeof useTestAuthQuery>;
export type TestAuthLazyQueryHookResult = ReturnType<typeof useTestAuthLazyQuery>;
export type TestAuthQueryResult = Apollo.QueryResult<TestAuthQuery, TestAuthQueryVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($input: CreateCourseInput!, $taskCountFilter: TaskFilterInput) {
  createCourse(input: $input) {
    ...MutateCourseFragment
  }
}
    ${MutateCourseFragmentFragmentDoc}`;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *      taskCountFilter: // value for 'taskCountFilter'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($input: UpdateCourseInput!, $taskCountFilter: TaskFilterInput) {
  updateCourse(input: $input) {
    ...MutateCourseFragment
  }
}
    ${MutateCourseFragmentFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *      taskCountFilter: // value for 'taskCountFilter'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id)
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const GetCoursesDocument = gql`
    query GetCourses($taskCountFilter: TaskFilterInput) {
  getCourses {
    ...CourseFragment
  }
}
    ${CourseFragmentFragmentDoc}`;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *      taskCountFilter: // value for 'taskCountFilter'
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetSingleCourseDocument = gql`
    query GetSingleCourse($id: ID!, $taskCountFilter: TaskFilterInput) {
  getSingleCourse(id: $id) {
    ...CourseFragment
  }
}
    ${CourseFragmentFragmentDoc}`;

/**
 * __useGetSingleCourseQuery__
 *
 * To run a query within a React component, call `useGetSingleCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *      taskCountFilter: // value for 'taskCountFilter'
 *   },
 * });
 */
export function useGetSingleCourseQuery(baseOptions: Apollo.QueryHookOptions<GetSingleCourseQuery, GetSingleCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleCourseQuery, GetSingleCourseQueryVariables>(GetSingleCourseDocument, options);
      }
export function useGetSingleCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleCourseQuery, GetSingleCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleCourseQuery, GetSingleCourseQueryVariables>(GetSingleCourseDocument, options);
        }
export type GetSingleCourseQueryHookResult = ReturnType<typeof useGetSingleCourseQuery>;
export type GetSingleCourseLazyQueryHookResult = ReturnType<typeof useGetSingleCourseLazyQuery>;
export type GetSingleCourseQueryResult = Apollo.QueryResult<GetSingleCourseQuery, GetSingleCourseQueryVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    ...MutateTaskFragment
  }
}
    ${MutateTaskFragmentFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    ...MutateTaskFragment
  }
}
    ${MutateTaskFragmentFragmentDoc}`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetTasksDocument = gql`
    query GetTasks($filter: TaskFilterInput!, $cursor: ID, $limit: Int) {
  getTasks(filter: $filter, cursor: $cursor, limit: $limit) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetSingleTaskDocument = gql`
    query GetSingleTask($id: ID!) {
  getSingleTask(id: $id) {
    ...TaskFragment
  }
}
    ${TaskFragmentFragmentDoc}`;

/**
 * __useGetSingleTaskQuery__
 *
 * To run a query within a React component, call `useGetSingleTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleTaskQuery(baseOptions: Apollo.QueryHookOptions<GetSingleTaskQuery, GetSingleTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleTaskQuery, GetSingleTaskQueryVariables>(GetSingleTaskDocument, options);
      }
export function useGetSingleTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleTaskQuery, GetSingleTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleTaskQuery, GetSingleTaskQueryVariables>(GetSingleTaskDocument, options);
        }
export type GetSingleTaskQueryHookResult = ReturnType<typeof useGetSingleTaskQuery>;
export type GetSingleTaskLazyQueryHookResult = ReturnType<typeof useGetSingleTaskLazyQuery>;
export type GetSingleTaskQueryResult = Apollo.QueryResult<GetSingleTaskQuery, GetSingleTaskQueryVariables>;
export const TestDocument = gql`
    query Test {
  hello
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;