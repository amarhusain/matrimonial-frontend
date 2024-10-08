export interface User {
    id: number;
    name: string;
    email: string;
    dob: Date;
    gender: string;
    religion: string;
    occupation: string;

}


export interface UserData {
    id: number;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    profilePictureUrl: string;
    roles: string[];
    token: string;

}


export interface SignupRequestDto {
    emailOrMobile: string;
    password: string;
}

export interface UserDto {
    id: number;
    email: string;
    mobile: string;
    isActive: string;
    isMobileVerified: boolean;
    isEmailVerified: boolean;
}