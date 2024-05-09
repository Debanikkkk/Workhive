import { AppDataSource } from "data-source";
import { Buddies } from "entity/Buddies";
import { Employee } from "entity/Employee";
import { ResEmployee } from "src/models/res/ResEmployee";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqBuddy } from "src/models/req/ReqBuddy";
import { ResBuddy } from "src/models/res/ResBuddy";
import { Body, Controller, Get, Path, Post, Put, Request, Route, Tags } from "tsoa";
import { In } from "typeorm";
@Tags('Buddies')
@Route('/buddy')
export class BuddiesController extends Controller{
    private buddiesrepository=AppDataSource.getRepository(Buddies)
    private employeerepository=AppDataSource.getRepository(Employee)

    @Post()
    public async saveBuddies(@Body() request: ReqBuddy, @Request() req: JWTRequest): Promise<ResBuddy>{
        const {buddies, buddy_group_name}=request
        const buddyArr: Buddies[]=[]
        if(buddies){
            const buddyDB=await this.employeerepository.find({
                where:{
                   department:{
                    id: req.user?.department,
                    branch:{
                        id: req.user?.branch,
                        company:{
                            id: req.user?.company
                        }
                    }
                   },
                    id: In(buddies)
                }
            })

            if(!buddyDB){
                return Promise.reject(new Error('BUDDIES NOT FOUND FROM DB'))
            }
      

            
            buddyArr.push(...buddyDB)
        }
        const buddySave: Buddies={
            employees: Promise.resolve(buddyArr),
            buddy_group_name: buddy_group_name,
        }

        const saveBuddy=Object.assign(new Buddies(), buddySave)
        const savedbuddy=await this.buddiesrepository.save(saveBuddy)

        const resBuddy: ResBuddy={
            id: savedbuddy.id,
            buddy_group_name: savedbuddy.buddy_group_name,
            employees:[],
        }
        if(!savedbuddy.employees){
            return resBuddy
        }

        savedbuddy.employees?.then<ResBuddy>((employees) => {
            resBuddy.employees = employees.map((d) => {
              return {
                id: d.id,
                username: d.username,
              };
            });
            this.setStatus(201);
            return resBuddy;
          });
        return resBuddy
    }

    @Get()
    public async getAllBuddies(@Request() req: JWTRequest): Promise<ResBuddy[]>{
        const buddies=await this.buddiesrepository.find({
            where:{
            employees:{
                company:{
                    id: req.user?.company
                }
            }
            },
            relations:{
                employees: true
            }
        })

        if(!buddies){
            return Promise.reject(new Error('BUDDIES NOT FOUND'))
        }

        const buddyArr: ResBuddy[]=[]

        for(const buddy of buddies){

            const employee=await buddy.employees
            const employeeArr: ResEmployee[]=[]

            employee?.forEach((employee)=>{
                const employeeToResEmployee: ResEmployee={
                    id: employee.id,
                    username: employee.username,
                }
                employeeArr.push(employeeToResEmployee)
            })

            buddyArr.push({
                id: buddy.id,
                buddy_group_name: buddy.buddy_group_name,
                // buddy_tasks: buddy.buddy_tasks,
                employees: employeeArr,
                
                

            })
        }
        return buddyArr
    }

    @Put()
    public async updateBuddies(@Path() buddyId: number, @Body() request: ReqBuddy, @Request() req: JWTRequest): Promise<ResBuddy>{
        const existingbuddy=await this.buddiesrepository.findOne({
            where:{
                id: buddyId
            }
        })
        if(!existingbuddy){
            return Promise.reject(new Error('BUDDY DOES NOT EXIST'))
        }

        const {buddies, buddy_group_name}=request
        
        if(buddies){
            const dbbuddies=await this.employeerepository.find({
                where:{
                    id: In(buddies)
                }
            })
            if(!dbbuddies){
                return Promise.reject(new Error('DB BUDDIES NOT FOUND'))
            }

            // existingbuddy.employees=dbbuddies
            existingbuddy.buddy_group_name=buddy_group_name
        }
        const updatedBuddies=await this.buddiesrepository.save(existingbuddy)
        const resBuddy: ResBuddy={
            id: updatedBuddies.id,
            buddy_group_name: updatedBuddies.buddy_group_name,
            // employees:,
        }
        
    }
            
}