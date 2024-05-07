import { ResEmployeeN } from "./ResEmployeeN";

export interface ResHRLetter {
    id?: number,
    letter_content?: string,
    letter_subject?: string,
    letter_time?: Date,
    employee?: ResEmployeeN,
}
