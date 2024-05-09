import { BuddyTask } from "entity/BuddyTask";

export interface ReqBuddyTask{
    // id?: number,
    buddyTask?: string,
    endDate?:Date,
    startDate?:Date,
    status?: boolean,
    buddy?: number,
}
