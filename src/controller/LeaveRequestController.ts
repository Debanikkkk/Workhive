import { AppDataSource } from "data-source";
import { Employee } from "entity/Employee";
import { LeaveRequest } from "entity/LeaveRequest";
import { ReqLeaveRequestN } from "src/models/req/ReqLeaveRequestN";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqLeaveRequest } from "src/models/req/ReqLeaveRequest";
import { ResLeaveRequest } from "src/models/res/ResLeaveRequest";
import { Body, Controller, Get, Path, Post, Put, Request, Route, Tags } from "tsoa";
import { ResError } from "src/models/res/Responses";
// import { EmployeeController } from "./EmployeeController";
@Tags('Leave_Request')
@Route('/leaveRequest')
export class LeaveRequestController extends Controller {
    private leaverequestrepository = AppDataSource.getRepository(LeaveRequest)
    private employeerepository = AppDataSource.getRepository(Employee)

    @Get('/{leaveRequestId}')
    public async getOneLeaveRequest(@Path() leaveRequestId: number): Promise<ResLeaveRequest | ResError> {
        const leaverequest=await this.leaverequestrepository.findOne({
            where:{
                id: leaveRequestId,
            },
            relations:{
                employee: true
            }
        }).then((leaverequest)=>{
            if(!leaverequest){
                return Promise.reject(new Error('LEAVE REQUEST NOT FOUND'))
            }
            const leaveemployee=leaverequest.employee
            const resLeaveRequest: ResLeaveRequest={
                id: leaverequest.id,
                from_date: leaverequest.from_date,
                reason: leaverequest.reason,
                status: leaverequest.status,
                to_date: leaverequest.to_date,
                employee: leaveemployee,
            }
            if(!resLeaveRequest.employee){
                return resLeaveRequest
            }

            resLeaveRequest.employee={
                id: leaveemployee?.id,
                username: leaveemployee?.username
            }
            return resLeaveRequest
        }, ()=>{
            this.setStatus(400)
            return {error: 'err'}
        })
        return leaverequest
    }

    @Get()
    public async getAllLeaveRequest(@Request() req: JWTRequest): Promise<ResLeaveRequest[]> {
        const leaverequests = await this.leaverequestrepository.find({
            where: {
                employee: {
                    company: {
                        id: req.user?.company
                    }
                }
            },
            relations: {
                employee: true,
            }
        })

        if (!leaverequests) {
            return Promise.reject(new Error('LEAVE REQUEST NOT FOUND'))
        }

        const leaverequestArr: ResLeaveRequest[] = []

        for (const leaverequest of leaverequests) {
            leaverequestArr.push({
                from_date: leaverequest.from_date,
                id: leaverequest.id,
                reason: leaverequest.reason,
                status: leaverequest.status,
                to_date: leaverequest.to_date,
                employee: leaverequest.employee,
            })
        }
        return leaverequestArr
    }
    /**
     * saves leave requests 
     * @summary saves leave requests
     */
    @Post()
    public async saveLeaveRequest(@Body() request: ReqLeaveRequest, @Request() req: JWTRequest): Promise<ResLeaveRequest> {
        console.log({ name: req.user?.id })
        const employee = await this.employeerepository.findOne({
            where: {
                id: req.user?.id
            }
        })
        if (!employee) {
            return Promise.reject(new Error('EMPLOYEE NOT FOUND'))
        }

        const { from_date, reason, to_date, status } = request

        const saveLeaveRequest: LeaveRequest = {
            // id: id,
            from_date: from_date,
            reason: reason,
            status: status,
            to_date: to_date,
            employee: employee,
        }

        console.log(employee)
        const leaveRequestSaver = Object.assign(new LeaveRequest(), saveLeaveRequest)
        const savedLeaveRequest = await this.leaverequestrepository.save(leaveRequestSaver)

        const resLeaveRequest: ResLeaveRequest = {
            id: savedLeaveRequest.id,
            from_date: savedLeaveRequest.from_date,
            reason: savedLeaveRequest.reason,
            status: savedLeaveRequest.status,
            to_date: savedLeaveRequest.to_date,
            employee: {
                branch: employee.branch,
                company: employee.company,
                department: employee.department,
                firstName: employee.first_name,
                id: employee.id,
                lastName: employee.last_name,
                password: employee.password,
                role: employee.role,
                status: employee.status

            },
        }
        return resLeaveRequest
    }
    /**
     * updates leave request
     *  @summary updates leave request
     */
    @Put('/{leaverequestId}')
    public async updateLeaveRequest(@Body() request: ReqLeaveRequestN, @Path() leaverequestId: number): Promise<ResLeaveRequest> {
        const existingleaverequest = await this.leaverequestrepository.findOne({
            where: {
                id: leaverequestId,
            },
            relations: {
                employee: true
            }
        })

        if (!existingleaverequest) {
            return Promise.reject(new Error('LEAVE REQUEST NOT FOUND'))
        }
        const { status } = request
        existingleaverequest.status = status

        const updatedLeaveRequest = await this.leaverequestrepository.save(existingleaverequest)
        const resLeaveRequest: ResLeaveRequest = {
            id: updatedLeaveRequest.id,
            from_date: updatedLeaveRequest.from_date,
            to_date: updatedLeaveRequest.to_date,
            reason: updatedLeaveRequest.reason,
            status: updatedLeaveRequest.status,

            employee: {
                id: updatedLeaveRequest.employee?.id,
                username: updatedLeaveRequest.employee?.username,
                branch: updatedLeaveRequest.employee?.branch,
                company: updatedLeaveRequest.employee?.company,
                department: updatedLeaveRequest.employee?.department,
                firstName: updatedLeaveRequest.employee?.first_name,
                lastName: updatedLeaveRequest.employee?.last_name,
                password: updatedLeaveRequest.employee?.password,
                role: updatedLeaveRequest.employee?.role,
                status: updatedLeaveRequest.employee?.status,
            }
        }
        return resLeaveRequest
    }
}