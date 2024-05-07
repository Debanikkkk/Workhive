import { ResProject } from "./ResProject";

export interface ResTask{
    id?: number,
    end_date?: Date,
    name?: string,
    project?: ResProject,
    start_date?: Date,
    status?: boolean
}