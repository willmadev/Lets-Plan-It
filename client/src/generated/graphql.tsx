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
  tasks?: Maybe<Array<Task>>;
};

export type CreateCourseInput = {
  courseName: Scalars['String'];
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
  completed: Scalars['Boolean'];
};

export type UpdateCourseInput = {
  id: Scalars['ID'];
  courseName?: Maybe<Scalars['String']>;
};

export type UpdateTaskInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  course?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  due?: Maybe<Scalars['DateTime']>;
  completed?: Maybe<Scalars['Boolean']>;
};

export type CreateCourseMutationVariables = Exact<{
  input: CreateCourseInput;
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse: (
    { __typename: 'Course' }
    & Pick<Course, 'id' | 'courseName'>
    & { tasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title'>
    )>> }
  ) | (
    { __typename: 'MutateCourseError' }
    & Pick<MutateCourseError, 'field' | 'message'>
  ) }
);

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCourse'>
);

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { getCourses?: Maybe<Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'courseName'>
    & { tasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title' | 'due'>
      & { course: (
        { __typename?: 'Course' }
        & Pick<Course, 'id' | 'courseName'>
      ) }
    )>> }
  )>> }
);

export type SingleCourseQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleCourseQuery = (
  { __typename?: 'Query' }
  & { getSingleCourse?: Maybe<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'courseName'>
    & { tasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title'>
    )>> }
  )> }
);

export type UpdateCourseMutationVariables = Exact<{
  input: UpdateCourseInput;
}>;


export type UpdateCourseMutation = (
  { __typename?: 'Mutation' }
  & { updateCourse: (
    { __typename: 'Course' }
    & Pick<Course, 'id' | 'courseName'>
    & { tasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'title'>
    )>> }
  ) | (
    { __typename: 'MutateCourseError' }
    & Pick<MutateCourseError, 'field' | 'message'>
  ) }
);

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

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename: 'Task' }
    & Pick<Task, 'id' | 'title' | 'description' | 'due' | 'completed'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'courseName'>
    ) }
  ) | (
    { __typename: 'MutateTaskError' }
    & Pick<MutateTaskError, 'field' | 'message'>
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type SingleTaskQueryVariables = Exact<{ [key: string]: never; }>;


export type SingleTaskQuery = (
  { __typename?: 'Query' }
  & { getSingleTask?: Maybe<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title' | 'completed' | 'description' | 'due'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'courseName'>
    ) }
  )> }
);

export type GetTasksQueryVariables = Exact<{
  cursor?: Maybe<Scalars['ID']>;
  filter?: Maybe<TaskFilterInput>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type GetTasksQuery = (
  { __typename?: 'Query' }
  & { getTasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'title' | 'completed' | 'description' | 'due'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'courseName'>
    ) }
  )> }
);

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename: 'Task' }
    & Pick<Task, 'id' | 'title' | 'description' | 'due' | 'completed'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'courseName'>
    ) }
  ) | (
    { __typename: 'MutateTaskError' }
    & Pick<MutateTaskError, 'field' | 'message'>
  ) }
);

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type TestAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type TestAuthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'testAuth'>
);


export const CreateCourseDocument = gql`
    mutation CreateCourse($input: CreateCourseInput!) {
  createCourse(input: $input) {
    ... on Course {
      __typename
      id
      courseName
      tasks {
        id
        title
      }
    }
    ... on MutateCourseError {
      __typename
      field
      message
    }
  }
}
    `;
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
export const CoursesDocument = gql`
    query Courses {
  getCourses {
    id
    courseName
    tasks {
      id
      title
      course {
        id
        courseName
      }
      due
    }
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const SingleCourseDocument = gql`
    query SingleCourse($id: ID!) {
  getSingleCourse(id: $id) {
    id
    courseName
    tasks {
      id
      title
    }
  }
}
    `;

/**
 * __useSingleCourseQuery__
 *
 * To run a query within a React component, call `useSingleCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleCourseQuery(baseOptions: Apollo.QueryHookOptions<SingleCourseQuery, SingleCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleCourseQuery, SingleCourseQueryVariables>(SingleCourseDocument, options);
      }
export function useSingleCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleCourseQuery, SingleCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleCourseQuery, SingleCourseQueryVariables>(SingleCourseDocument, options);
        }
export type SingleCourseQueryHookResult = ReturnType<typeof useSingleCourseQuery>;
export type SingleCourseLazyQueryHookResult = ReturnType<typeof useSingleCourseLazyQuery>;
export type SingleCourseQueryResult = Apollo.QueryResult<SingleCourseQuery, SingleCourseQueryVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($input: UpdateCourseInput!) {
  updateCourse(input: $input) {
    ... on Course {
      __typename
      id
      courseName
      tasks {
        id
        title
      }
    }
    ... on MutateCourseError {
      __typename
      field
      message
    }
  }
}
    `;
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
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    ... on Task {
      __typename
      id
      title
      course {
        id
        courseName
      }
      description
      due
      completed
    }
    ... on MutateTaskError {
      __typename
      field
      message
    }
  }
}
    `;
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
export const SingleTaskDocument = gql`
    query SingleTask {
  getSingleTask(id: 10) {
    id
    title
    course {
      id
      courseName
    }
    completed
    description
    due
  }
}
    `;

/**
 * __useSingleTaskQuery__
 *
 * To run a query within a React component, call `useSingleTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleTaskQuery({
 *   variables: {
 *   },
 * });
 */
export function useSingleTaskQuery(baseOptions?: Apollo.QueryHookOptions<SingleTaskQuery, SingleTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleTaskQuery, SingleTaskQueryVariables>(SingleTaskDocument, options);
      }
export function useSingleTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleTaskQuery, SingleTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleTaskQuery, SingleTaskQueryVariables>(SingleTaskDocument, options);
        }
export type SingleTaskQueryHookResult = ReturnType<typeof useSingleTaskQuery>;
export type SingleTaskLazyQueryHookResult = ReturnType<typeof useSingleTaskLazyQuery>;
export type SingleTaskQueryResult = Apollo.QueryResult<SingleTaskQuery, SingleTaskQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks($cursor: ID, $filter: TaskFilterInput, $limit: Int) {
  getTasks(cursor: $cursor, filter: $filter, limit: $limit) {
    id
    title
    course {
      id
      courseName
    }
    completed
    description
    due
  }
}
    `;

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
 *      cursor: // value for 'cursor'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
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
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    ... on Task {
      __typename
      id
      title
      course {
        id
        courseName
      }
      description
      due
      completed
    }
    ... on MutateTaskError {
      __typename
      field
      message
    }
  }
}
    `;
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