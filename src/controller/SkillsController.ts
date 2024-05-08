import { AppDataSource } from "data-source";
import { Employee } from "entity/Employee";
import { Skill } from "entity/Skill";
import { ReqEmpSkill } from "src/models/req/ReqEmpSkill";
import { ResEmployee } from "src/models/res/ResEmployee";
import { ReqSkill } from "src/models/req/ReqSkill";
import { ResSkill } from "src/models/res/ResSkill";
import { Body, Controller, Get, Path, Post, Route, Tags } from "tsoa";
import { In } from "typeorm";
@Route('/skill')
@Tags('Skills')
export class SkillsController extends Controller{
    private skillsrepository=AppDataSource.getRepository(Skill)
    private employeerepository=AppDataSource.getRepository(Employee)

    // employeerepository
    @Get()
    public async getSkills(): Promise<ResSkill[]>{
        const skills=await this.skillsrepository.find()

        const skillArr: ResSkill[]=[]

        for(const skill of skills){
            skillArr.push({
                id: skill.id,
                name: skill.name
            })
        }   

        return skillArr
    }
@Post()
public async saveSkill(@Body() request: ReqSkill): Promise<ResSkill>{
    const {name}=request

    const skillsave: Skill={
        name: name
    }

    const skillSaver=Object.assign(new Skill(), skillsave)
    const savedSkill=await this.skillsrepository.save(skillSaver)

    const resSkill: ResSkill={
        id: savedSkill.id,
        name: savedSkill.name
    }
    return resSkill
}

@Post('/skillemp')
    public async getEmployeeBySkill(
        // @Path() companyId: number, @Path() departmentId: number, @Path() branchId: number,
        @Body() request: ReqEmpSkill
    //  @Request() req: JWTRequest
    ): Promise<ResEmployee[]>{
        const {skill}=request
        const skillArr: Skill[]=[]
        if(skill){
            const dbskill= await this.skillsrepository.find({
                where:{
                    id: In(skill)
                }
            })

            if(!dbskill){
                return Promise.reject(new Error('SKILL IN DB NOT FOUND'))
            }

            skillArr.push(...dbskill)
        }
        const skillIds = skillArr.map(skill => skill.id);

        const employees=await this.employeerepository.find({
            where:{
                
                skills:{
                    id: In(skillIds)
                }
            },
            relations:{
                department: true,
                branch:true,
                company: true,
            }
        })
        console.log({employees: employees})
     const resemployee: ResEmployee[]=[]

     for(const  employee of employees){
        resemployee.push({
            id: employee.id,
            username: employee.username,
        })

     }
        return resemployee
    }
}