import { UserDto } from "./user.model";

export interface ProfileResponse {

    profile: ProfileDto;
    user: UserDto;
    profileCompletion: number;

}

export interface ProfileDto {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    religion: string;
    sect: string;
    occupation: string;
    address: string;
    city: string;
    state: string;
    country: string;
    profilePictureUrl: string;
    bio: string;
}

export interface ProfileSearchDto {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    religion: string;
    sect: string;
    occupation: string;
    city: string;
    profilePictureUrl: string;
}