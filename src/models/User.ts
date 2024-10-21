import { EntityStatus } from "./Status";

export interface User {
    userId: number;
    fullName: string;
    email: string;
    phone: string;
    point: number;
    image: string;
    roleName: string;
    firstLogin: boolean;
}

export interface UserResponse {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    status: EntityStatus;
    point: number;
    firstLogin: boolean;
    image: string;
    roleName: string;
    locationId: number | null;
}