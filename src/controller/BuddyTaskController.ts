import { AppDataSource } from "data-source";
import { Buddies } from "entity/Buddies";
import { BuddyTask } from "entity/BuddyTask";
import { Department } from "entity/Department";
import { JWTRequest } from "models/req/JWTRequest";
import { ResBuddyTaskStatus } from "models/req/ResBuddyTaskStatus";
import { compare } from "semver";
import { ReqBuddyTask } from "src/models/req/ReqBuddyTask";
import { ResBuddyTask } from "src/models/res/ResBuddyTask";
import { Body, Controller, Get, Path, Post, Put, Request, Route, Security, Tags } from "tsoa";
@Route('buddy/{buddyId}/buddyTask')
@Tags('BuddyTask')
export class BuddyTaskController extends Controller{    
private buddytaskrepository=AppDataSource.getRepository(BuddyTask)
private buddyrepository=AppDataSource.getRepository(Buddies)
@Get('/jwt')
@Security("Api-Token", [])
public async jwtthing(@Request() req: JWTRequest){
    const resjwt={
        id: req.user.id,
        company: req.user?.company,
        branch: req.user.branch,
        department: req.user?.department!
    }
    console.log(resjwt)
    return resjwt
}

@Get()

public async getBuddyTask(@Path() buddyId: number): Promise<ResBuddyTask[]>{
    const buddyTask=await this.buddytaskrepository.find({
        where:{
            buddies:{
                id: buddyId
            }
        },
        relations:{
            buddies: {
                employees: {
                    skills: true
                }
            },   
        }
    })

    if(!buddyTask){
        return Promise.reject(new Error('BUDDY TASK NOT FOUND'))
    }

    const buddytaskArr: ResBuddyTask[]=[]

    for(const buddyt of buddyTask){
        buddytaskArr.push({
            id: buddyt.id,
            buddies: buddyt.buddies,
          buddyTask: buddyt.buddy_task,
          endDate: buddyt.end_date,
          startDate: buddyt.start_date,
          status: buddyt.status

        })
    }
return buddytaskArr

}
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
    const {buddyTask,  endDate, startDate, status}=request

    const buddytasksaver: BuddyTask={
        buddies:buddy,
        buddy_task: buddyTask,
        end_date: endDate,
        start_date: startDate,
        status: status
    }
    console.log({buddyTask: buddytasksaver})
    const saveBuddyTask=Object.assign(new BuddyTask(), buddytasksaver)
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

// @Put('/{buddyTaskId}')
// public async updateBuddyTask(@Path() buddyId: number, @Path() buddyTaskId: number, @Request() req: JWTRequest, @Body() request: ReqBuddyTask): Promise<ResBuddyTask>{
//     let buddytask=await this.buddytaskrepository.findOne({
//         where:{
//             id: buddyTaskId,
//             buddies:{
//                 id: buddyId
//             }

//         }
//     })

//     if(!buddytask){
//         return Promise.reject(new Error('BUDDY TASK NOT FOUND'))
//     }
//     if(req.user.role.permissions.includes('manageTasks')){
//         const {status, buddy, buddyTask,endDate,startDate}=request

//         buddytask.status=status,
        
//         buddytask.buddy_task=buddyTask
//         buddytask.end_date=endDate
//         buddytask.start_date=startDate
//         if(buddytask.buddies){
//            const dbbuddy=await this.buddyrepository.findOne({
//             where:{
//                 id: buddyId
//             }
//            })
//            if(!dbbuddy){
//             return Promise.reject(new Error('BUDDIES IN DB NOT FOUND'))
            
//            }
//            buddytask.buddies=dbbuddy
//         }
    
        
        


//     }

//     if(req.user.role.permissions.includes('manageTaskStatus')){
//         const {status}=request

//         buddytask.status=status
        
//     }

//     const updatedBuddyTask=await this.buddytaskrepository.save(buddytask)

//     const resBuddyTask: ResBuddyTask={
//         id: updatedBuddyTask.id,
//         buddies: updatedBuddyTask.buddies,
//         buddyTask: updatedBuddyTask.buddy_task,
//         endDate: updatedBuddyTask.end_date,
//         startDate: updatedBuddyTask.start_date,
//         status: updatedBuddyTask.status
//     }
//     return resBuddyTask
// }

}