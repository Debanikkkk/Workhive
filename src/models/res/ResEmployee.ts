import { ResBranch } from "./ResBranch";
import { ResCompany } from "./ResCompany";
import { ResDepartment } from "./ResDepartment";
import { ResRole } from "./ResRole";

export interface ResEmployee {
    id?: number,
    firstName?: string,
    lastName?: string,
    status?: boolean,
    username?: string
    password?: string,
    department?: ResDepartment,
    branch?: ResBranch,
    company?: ResCompany,
    role?: ResRole,
}