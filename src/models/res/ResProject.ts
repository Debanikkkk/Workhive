import { Project } from "entity/Project";
import { ResDepartment } from "./ResDepartment";
import { ResEmployee } from "./ResEmployee";
import { ResSkill } from "./ResSkill";
import { ResTask } from "./ResTask";
import { ReqEmployee } from "models/req/ReqEmployee";

export interface ResProject{
    id?: number,
    department?: ResDepartment,
    employees?: ResEmployee[],
    end_date?: Date,
    name?: string,
    skills?: ResSkill[],
    start_date?: Date,
    // tasks?: ResTask[]
}
