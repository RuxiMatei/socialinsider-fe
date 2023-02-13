import { ProfileType } from "./profile-types";

export interface Profile {
    name: string;
    profile_added: Date;
    id: string;
    profile_type: ProfileType;

}