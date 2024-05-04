import { ResRole } from "./ResRole"

export interface ResPermission {
    id?: number,
    permission_name?: string,
    permission_description?: string
    role?: ResRole[]
}