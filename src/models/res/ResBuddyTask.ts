import { BuddyTask } from "entity/BuddyTask";
import { ResBuddy } from "./ResBuddy";

export interface ResBuddyTask{
    buddies?: ResBuddy,
    buddyTask?: string,
    endDate?: Date,
    id?: number,
    startDate?: Date,
    status?: boolean
    
}
