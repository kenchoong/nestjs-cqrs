export enum ResponseDescription {
  OK = 'Request successful',
  CREATED = 'The resource was created',
  BAD_REQUEST = 'The request is not valid',
  NOT_FOUND = 'Item not found',
  UNPROCESSABLE_ENTITY = 'Server understood the request and the syntax is correct, but could not fulfill the request',
  INTERNAL_SERVER_ERROR = 'An unexpected error occurred inside the server',
}
