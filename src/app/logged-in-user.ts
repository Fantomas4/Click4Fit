/**
 * Interface used to store the necessary data for the authorization
 * of the user currently logged in.
 */
export interface LoggedInUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  privilegeLevel: string; // Used to determine the level of access privileges a user has (client, admin).
  token: string; // Used to hold the JWT token that is returned from the api on successful authentication.
}
