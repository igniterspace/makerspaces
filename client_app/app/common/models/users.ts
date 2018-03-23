export class Users {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
}

//using interface because users data is temporary
export interface UsersEdit {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
}
//