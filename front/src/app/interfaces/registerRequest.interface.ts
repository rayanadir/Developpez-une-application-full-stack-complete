export interface RegisterRequest{
    email:string,
    username:string,
    password:string,
}

export interface AccountRequest extends RegisterRequest{}