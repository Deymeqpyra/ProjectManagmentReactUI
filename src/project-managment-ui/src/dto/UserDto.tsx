export interface CreateUserDto{
    UserName : string;
    Email : string;
    Password : string;
}

export interface LoginUserDto{
    Email: string; 
    Password: string;
}

export interface UserDetailInfoDto{
    id?: string;
    Name: string;
    Password: string;
    Email: string;
}