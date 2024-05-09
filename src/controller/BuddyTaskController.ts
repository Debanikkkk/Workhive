import { AppDataSource } from "data-source";
import { Buddies } from "entity/Buddies";
import { BuddyTask } from "entity/BuddyTask";
import { ReqBuddyTask } from "src/models/req/ReqBuddyTask";
import { ResBuddyTask } from "src/models/res/ResBuddyTask";
import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
@Route('buddy/{buddyId}/buddyTask')
@Tags('BuddyTask')
export class BuddyTaskController extends Controller{    
private buddytaskrepository=AppDataSource.getRepository(BuddyTask)
private buddyrepository=AppDataSource.getRepository(Buddies)

@Post()
public async saveBuddyTask(@Path() buddyId: number, @Body() request: ReqBuddyTask): Promise<ResBuddyTask>{
    const buddy= await this.buddyrepository.findOne({
        where:{
            id: buddyId
        }
    })

    if(!buddy){
        return Promise.reject(new Error('BUDDY NOT FOUND'))
    }
    const {buddyTask, endDate,  startDate, status}=request

    const buddytasksaver: BuddyTask={
        buddies:buddy,
        buddy_task: buddyTask,
        end_date: endDate,
        start_date: startDate,
        status: status
    }

    const saveBuddyTask=Object.assign(new BuddyTask(), buddyTask)
    const savedBuddyTask=await this.buddytaskrepository.save(saveBuddyTask)

    const resBuddyTask: ResBuddyTask={
        buddyTask: savedBuddyTask.buddy_task,
        endDate: savedBuddyTask.end_date,
        id: savedBuddyTask.id,
        startDate: savedBuddyTask.start_date,
        status: savedBuddyTask.status,
        buddies:{
            id: buddy.id,
            buddy_group_name: buddy.buddy_group_name,
            
        }

    }

    return resBuddyTask
}


}