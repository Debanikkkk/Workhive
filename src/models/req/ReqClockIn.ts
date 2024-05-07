import { Clockin } from "entity/Clockin";
import { ReqEmployee } from "./ReqEmployee";

export interface ReqClockIn{
    clock_in?: Date,
    clock_out?: Date,
    employee?: number,
}