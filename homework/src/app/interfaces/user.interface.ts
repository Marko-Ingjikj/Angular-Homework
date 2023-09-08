export type Roles = { [key: string]: boolean };

export interface User {
  uid: string;
  email: string;
  name: string;
  roles: Roles;
}
