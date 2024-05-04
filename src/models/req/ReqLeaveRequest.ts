export interface ReqLeaveRequest {
    id?: number,
    from_date?: Date,
    to_date?: Date,
    reason?: string,
    employee?: number,
}