
export interface User {
    //id: Serializer
    username: string
    token?: string 
    email: string
    //birthday: Date
    address: string
    role: number
}

export enum UserRole {
    ROLE_USER = 0,
    ROLE_ADMIN = 1
}