/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateSubjectInput = {
  id?: string | null,
  Subject: string,
};

export type UpdateSubjectInput = {
  id: string,
  Subject?: string | null,
};

export type DeleteSubjectInput = {
  id?: string | null,
};

export type ModelSubjectFilterInput = {
  id?: ModelIDFilterInput | null,
  Subject?: ModelStringFilterInput | null,
  and?: Array< ModelSubjectFilterInput | null > | null,
  or?: Array< ModelSubjectFilterInput | null > | null,
  not?: ModelSubjectFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateSubjectMutationVariables = {
  input: CreateSubjectInput,
};

export type CreateSubjectMutation = {
  createSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};

export type UpdateSubjectMutationVariables = {
  input: UpdateSubjectInput,
};

export type UpdateSubjectMutation = {
  updateSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};

export type DeleteSubjectMutationVariables = {
  input: DeleteSubjectInput,
};

export type DeleteSubjectMutation = {
  deleteSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};

export type GetSubjectQueryVariables = {
  id: string,
};

export type GetSubjectQuery = {
  getSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};

export type ListSubjectsQueryVariables = {
  filter?: ModelSubjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubjectsQuery = {
  listSubjects:  {
    __typename: "ModelSubjectConnection",
    items:  Array< {
      __typename: "Subject",
      id: string | null,
      Subject: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateSubjectSubscription = {
  onCreateSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};

export type OnUpdateSubjectSubscription = {
  onUpdateSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};

export type OnDeleteSubjectSubscription = {
  onDeleteSubject:  {
    __typename: "Subject",
    id: string | null,
    Subject: string,
  } | null,
};
