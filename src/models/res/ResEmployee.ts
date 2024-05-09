import { Skill } from "src/entity/Skill";
import { ResBranch } from "./ResBranch";
import { ResCompany } from "./ResCompany";
import { ResDepartment } from "./ResDepartment";
import { ResRole } from "./ResRole";
import { ResSkill } from "./ResSkill";

export interface ResEmployee {
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
    skills?: ResSkill[] | Promise<Skill[]>
}