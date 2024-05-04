import { ResPermission } from "./ResPermission"

export interface ResRole {
    id?: number,
    roleName?: string,
    roleDescription?: string
    permission?: ResPermission[]
}