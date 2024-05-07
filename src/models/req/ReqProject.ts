import { ReqEmployee } from "./ReqEmployee";
import { ReqTask } from "./ReqTask";

export interface ReqProject{
    department?: number,
    // employees?: number[],
    end_date?: Date,
    name?: string,
    skills?: number[],
    start_date?: Date,
    // tasks?: number[]   
}