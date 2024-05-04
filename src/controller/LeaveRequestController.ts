import { AppDataSource } from "data-source";
import { LeaveRequest } from "entity/LeaveRequest";
import { Controller, Get, Tags } from "tsoa";
@Tags('Leave_Request')
export class LeaveRequestController extends Controller {
    private leaverequestrepository = AppDataSource.getRepository(LeaveRequest)


    @Get() {

}

}