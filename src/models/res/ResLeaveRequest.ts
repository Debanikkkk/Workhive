import { ResEmployee } from "./ResEmployee";

export interface ResLeaveRequest {
    id?: number,
    from_date?: Date,
    to_date?: Date,
    reason?: string,
    employee?: ResEmployee,
}