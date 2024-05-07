import { ResBranch } from "./ResBranch";
import { ResCompany } from "./ResCompany";
import { ResDepartment } from "./ResDepartment";
import { ResRole } from "./ResRole";
import { ResSkill } from "./ResSkill";

export interface ResEmployeeN {
    id?: number,
    firstName?: string,
    lastName?: string,
    status?: boolean,
    username?: string,
    salary?: number,
    password?: string,
    department?: ResDepartment,
    branch?: ResBranch,
    company?: ResCompany,
    role?: ResRole,
    // skills?: ResSkill[]
}