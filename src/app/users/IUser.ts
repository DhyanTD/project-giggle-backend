export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  type: UserType;
  emailVerified:boolean;
  course?:string;
}


export enum UserType{
  admin = "admin",
  puser = "puser" 
}
