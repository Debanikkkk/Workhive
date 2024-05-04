import { AppDataSource } from "data-source";
import { Employee } from "entity/Employee";
import { LeaveRequest } from "entity/LeaveRequest";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqLeaveRequest } from "src/models/req/ReqLeaveRequest";
import { ResLeaveRequest } from "src/models/res/ResLeaveRequest";
import { Body, Controller, Get, Path, Post, Request, Route, Tags } from "tsoa";
// import { EmployeeController } from "./EmployeeController";
@Tags('Leave_Request')
@Route('/leaveRequest')
export class LeaveRequestController extends Controller {
    private leaverequestrepository = AppDataSource.getRepository(LeaveRequest)
    private employeerepository = AppDataSource.getRepository(Employee)


    @Post()
    public async LeaveRequest(@Body() request: ReqLeaveRequest, @Request() req: JWTRequest): Promise<ResLeaveRequest> {
        const employee = await this.employeerepository.findOne({
            where: {
                id: req.user.id
            }
        })
        if (!employee) {
            return Promise.reject(new Error('EMPLOYEE NOT FOUND'))
        }

        const { from_date, id, reason, to_date } = request

        const saveLeaveRequest: LeaveRequest = {
            id: id,
            from_date: from_date,
            reason: reason,
            to_date: to_date,
            employee: employee,
        } as any;
        const leaveRequestSaver = Object.assign(new LeaveRequest(), saveLeaveRequest)
        const savedLeaveRequest = await this.leaverequestrepository.save(leaveRequestSaver)

        const resLeaveRequest: ResLeaveRequest = {
            id: savedLeaveRequest.id,
            from_date: savedLeaveRequest.from_date,
            reason: savedLeaveRequest.reason,
            to_date: savedLeaveRequest.to_date,
            employee: {
                branch: employee.branch,
                company: employee.company,
                department: employee.department,
                firstName: employee.firstName,
                id: employee.id,
                lastName: employee.lastName,
                password: employee.password,
                role: employee.role,
                status: employee.status

            },
        }
        return resLeaveRequest
    }

    // @Post() 
    //     public async LeaveRequest(@Path() employeId: number, @Request() req: JWTRequest): Promise<ResLeaveRequest>{

    // }
}