import { ProfileSearchDto } from "./profile.model";

export interface SearchCriteria {
    lookingFor: string;
    minAge?: number | null;
    maxAge?: number | null;
    minHeight?: number | null;
    maxHeight?: number | null;
    religion?: string;
    sect?: string;
    minIncome?: number | null;
    maxIncome?: number | null;
    maritalStatus?: string;
    profilePhoto: string;

}


export interface PagedResponse<T> {
    content: ProfileSearchDto[];
    page: Page;
}

export interface Page {
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface ProfileSearchState {
    searchCriteria: SearchCriteria;
    searchResults: PagedResponse<ProfileSearchDto[]> | null;
    isLoading: boolean;
    error: string | null;
}