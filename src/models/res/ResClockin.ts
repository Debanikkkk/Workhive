import { Clockin } from "entity/Clockin";
import { ResEmployee } from "./ResEmployee";

export interface ResClockin{
    id?: number,
    clock_in?: Date,
    clock_out?: Date,
    employee?: ResEmployee,
}

