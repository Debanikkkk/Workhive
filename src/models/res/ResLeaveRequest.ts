
import { ResEmployeeN } from "./ResEmployeeN";

export interface ResLeaveRequest {
    id?: number,
    from_date?: Date,
    to_date?: Date,
    status?: boolean,
    reason?: string,
    employee?: ResEmployeeN,
}