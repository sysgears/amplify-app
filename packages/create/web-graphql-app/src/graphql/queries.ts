// tslint:disable
// this is an auto generated file. This will be overwritten

export const getSubject = `query GetSubject($id: ID!) {
  getSubject(id: $id) {
    id
    Subject
  }
}
`;
export const listSubjects = `query ListSubjects(
  $filter: ModelSubjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Subject
    }
    nextToken
  }
}
`;
