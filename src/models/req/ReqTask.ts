import { Task } from "entity/Task";

export interface ReqTask{
    end_date?: Date,
    id: number,
    name: string,
    project: number,
    start_date: Date,
    status: false    
}
