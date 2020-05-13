export interface UserEntry {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    birthdate: string;
    privilegeLevel: string; // Used to determine the level of access privileges a user has (client, admin).
    token: string; // Used to hold the JWT token that is returned from the api on successful authentication.
}
