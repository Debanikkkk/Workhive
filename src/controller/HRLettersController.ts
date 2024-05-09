import { AppDataSource } from "data-source";
import { Employee } from "entity/Employee";
import { HRLetters } from "entity/HRLetters";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqHRLetter } from "src/models/req/ReqHRLetter";
import { ResHRLetter } from "src/models/res/ResHRLetter";
import { Body, Controller, Get, Path, Post, Request, Route, Tags } from "tsoa";
@Tags('HR Letters')
@Route('/hrletters')
export class HRLettersController extends Controller {
    private hrlettersrepository = AppDataSource.getRepository(HRLetters)
    private employeerepository = AppDataSource.getRepository(Employee)

    
    // @Get('/{hrlettersId}')
    // public async getOneHrLetters(@Path() hrlettersId: number, @Request() req: JWTRequest): Promise<ResHRLetter> {
    //     const hrletter=await this.hrlettersrepository.findOne({
    //         where:{
    //             id: 
    //         }
    //     })
    // }

    @Get()
    public async getAllHrLetters(@Request() req: JWTRequest): Promise<ResHRLetter[]> {
        const hrletters = await this.hrlettersrepository.find({
            where: {
                employee: {
                    company: {
                        id: req.user?.company
                    }
                }
            },
            relations: {
                employee: true
                
            }
        })
        if (!hrletters) {
            return Promise.reject(new Error('HR LETTERS NOT FOUND'))
        }

        const hrlettersArr: ResHRLetter[] = []

        for (const hrletter of hrletters) {
            hrlettersArr.push({
                id: hrletter.id,
                letter_content: hrletter.letter_content,
                letter_subject: hrletter.letter_subject,
                letter_time: hrletter.letter_time,
                employee: hrletter.employee
            })
        }
        return hrlettersArr
    }
    @Post()
    public async saveHrLetters(@Request() req: JWTRequest, @Body() request: ReqHRLetter): Promise<ResHRLetter> {
        const employee = await this.employeerepository.findOne({
            where: {
                id: req.user?.id
            }
        })

        if (!employee) {
            return Promise.reject(new Error('EMPLOYEE NOT FOUND'))
        }

        const { letter_content, letter_subject, letter_time } = request

        const saveHrLetters: HRLetters = {
            employee: employee,
            letter_content: letter_content,
            letter_subject: letter_subject,
            letter_time: letter_time
        }

        const hrlettersaver = Object.assign(new HRLetters(), saveHrLetters)
        const savedhrletter = await this.hrlettersrepository.save(hrlettersaver)

        const resHrLetter: ResHRLetter = {
            id: savedhrletter.id,

            letter_content: savedhrletter.letter_content,
            letter_subject: savedhrletter.letter_subject,
            letter_time: savedhrletter.letter_time,
            employee: {
                id: employee.id,
                firstName: employee.first_name,
                lastName: employee.last_name,
                password: employee.password,
                salary: employee.salary,
                status: employee.status

            },
        }
        return resHrLetter
    }

}