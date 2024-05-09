
import { ResEmployeeN } from "./ResEmployeeN";

export interface ResLeaveRequest {
    id?: number,
    from_date?: string,
    to_date?: string,
    status?: boolean,
    reason?: string,
    employee?: ResEmployeeN,
}