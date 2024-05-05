// import { HRLetters } from "entity/HRLetters";
import { ResEmployee } from "./ResEmployee";

export interface ResHRLetter {
    id?: number,
    letter_content?: string,
    letter_subject?: string,
    letter_time?: Date,
    employee?: ResEmployee,
}
