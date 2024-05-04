import { ResCompany } from "./ResCompany";
// import { ResEmployee } from "./ResEmployee";

export interface ResBranch {
    id?: number,
    name?: string,
    status?: boolean
    company?: ResCompany
}