import { AppDataSource } from "data-source";
import { Company } from "src/entity/Company";
import { Project } from "src/entity/Project";
import { Task } from "src/entity/Task";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqTask } from "src/models/req/ReqTask";
import { ResTask } from "src/models/res/ResTask";
import { Body, Controller, Get, Path, Post, Request, Route, Tags } from "tsoa";
@Route('/project/{projectId}/task')
@Tags('Task')
export class TaskController extends Controller{
    private taskrepository=AppDataSource.getRepository(Task)
    private projectrepository=AppDataSource.getRepository(Project)
    @Get('/{projectId}')
    public async getTask(@Path() projectId: number, ){
        const tasks=await this.taskrepository.find({
            where:{
                project:{
                    id: projectId
                }
            },
            relations:{
                project: true
            }
        })

        if(!tasks){ 
            return Promise.reject(new Error('TASK NOT FOUND'))
        }
        const taskArr: Task[]=[]
        for(const task of tasks){
            taskArr.push({
                end_date: task.end_date,
                id: task.id,
                name: task.name,
                project: task.project,
                start_date: task.start_date,
                status: task.status

            })
        }

        return taskArr
    }
    @Post()
    public async saveTask(@Path() projectId: number, @Body() request: ReqTask, @Request() req: JWTRequest):Promise<ResTask>{
        const project=await this.projectrepository.findOne({
            where:{
                id: projectId,
                department:{
                    id: req.user?.department,
                    branch:{
                        id: req.user?.branch,
                        company:{
                            id: req.user?.company
                        }

                    }
                }
              
            }
        })

        if(!project){
            return Promise.reject(new Error('PROJECT NOT FOUND'))
        }

        const {name, start_date, status, end_date}=request 

        const saveTask: Task={
           end_date: end_date,
           
           name: name,
           project: project,
           start_date: start_date,
           status: status
        }

        const taskSave=Object.assign(new Task(), saveTask)
        const taskSaver=await this.taskrepository.save(taskSave)

        const resTask: ResTask={
            id: taskSaver.id,
            name: taskSaver.name,
            end_date: taskSaver.end_date,
            start_date: taskSaver.start_date,
            status: taskSaver.status,
            project:{
                id: project.id,
                name: project.name,
                department: project.department,
                // employees: project.employees,
                end_date: project.end_date,
                
                
                // skills: project.skills,
                start_date: project.start_date
            },
             
        }

        return resTask
    }
}