import { AppDataSource } from "data-source";
import { Clockin } from "src/entity/Clockin";
import { Employee } from "entity/Employee";
import { Time } from "entity/Time";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqClockIn } from "src/models/req/ReqClockIn";
import { ReqClockInU } from "src/models/req/ReqClockInU";
import { ResClockin } from "src/models/res/ResClockin";
import { Body, Controller, Get, Path, Post, Put, Request, Route, Tags } from "tsoa";
@Tags('ClockIn')
@Route('/clockin')
export class ClockInController extends Controller{
    private clockinrepository=AppDataSource.getRepository(Clockin)
    private employeerep=AppDataSource.getRepository(Employee)
    @Get()
    public async getClockIns(@Request() req: JWTRequest){
        const clockIns=await this.clockinrepository.find({
            where:{
                employee:{
                    id: req.user?.id
                }
            },
            relations:{
                employee: true

            }
        })
        if(!clockIns){
        return Promise.reject(new Error('NOT FOUND'))
        }
        const clockinArr: Clockin[]=[]

        for(const clockin of clockIns){
            clockinArr.push({
                id: clockin.id,
                
                clock_in: clockin.clock_in,
                clock_out: clockin.clock_out,
                employee: clockin.employee

            })
        }
        return clockinArr
    }
@Post()
    public async saveClockIn(@Body() request: ReqClockIn, @Request() req: JWTRequest): Promise<ResClockin>{
        const employee=await this.employeerep.findOne({
          where:{
            id: req.user?.id
          }  
        })

        if(!employee){
            return Promise.reject(new Error('EMPLOYEE NOT FOUND'))
        }

        const {clock_in, clock_out}=request

        const saveClock: Clockin={
            employee: employee,
            clock_in: clock_in,
            clock_out: clock_out
        }

        const clockSave=Object.assign(new Clockin(), saveClock)
        const clockSaver=await this.clockinrepository.save(clockSave)


        const resClockIn: ResClockin={
            id: clockSaver.id, 
            clock_in: clockSaver.clock_in,
             clock_out: clockSaver.clock_out,
             employee:{
                
                firstName: employee.first_name,
                id: employee.id,
                lastName: employee.last_name,
                password: employee.password,
                role: employee.role,
                salary: employee.salary,
                status: employee.status
             }
             
        }

        return resClockIn
    }

    @Put('/{clockinId}')
    public async updateClock(@Path() clockinId: number, @Request() req: JWTRequest, @Body() request: ReqClockInU): Promise<ResClockin>{
        const clockin=await this.clockinrepository.findOne({
            where:{
                id: clockinId,
                employee:{
                    id: req.user?.id
                }
            }
        })
        if(!clockin){
            return Promise.reject(new Error('NOT FOUND'))
        }
        const {clock_out}=request
        clockin.clock_out=clock_out

        const updatedClockin=await this.clockinrepository.save(clockin)

        const resClockin: ResClockin={
            id: updatedClockin.id,
            clock_in: updatedClockin.clock_in,
            clock_out: updatedClockin.clock_out,
            employee:{
                id: clockin.employee?.id
            }
            

        }
        return resClockin
    }


}