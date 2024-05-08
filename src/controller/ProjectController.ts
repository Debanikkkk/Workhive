import { AppDataSource } from "data-source";
import { Department } from "entity/Department";
import { Employee } from "entity/Employee";
import { Project } from "entity/Project";
import { Skill } from "entity/Skill";
import { ResEmployee } from "models/res/ResEmployee";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqProject } from "src/models/req/ReqProject";
import { ResProject } from "src/models/res/ResProject";
import { ResSkill } from "src/models/res/ResSkill";
import { Body, Controller, Get, Post, Request, RequestProp, Route, Tags } from "tsoa";
import { In } from "typeorm";
@Route('/project')
@Tags('Project')
export class ProjectController extends Controller{
    private projectrepository=AppDataSource.getRepository(Project)
    private departmentrepository=AppDataSource.getRepository(Department)
    private skillrepository=AppDataSource.getRepository(Skill)
    private employeerepository=AppDataSource.getRepository(Employee)
    
    
    @Get()
    public async getAllProject(@Request() req: JWTRequest): Promise<ResProject[]>{
        const projects=await this.projectrepository.find({
            where:{
                department:{
                    id: req.user?.department
                }
            },
            relations:{
                department: true,
                employees: true,
                skills: true,
                tasks: true
            }
        })

        if(!projects){
            return Promise.reject(new Error('PROJECT NOT FOUND'))
        }

        const projectArr: ResProject[]=[]

        for(const project of projects){

            const skill= await project.skills;
            const skillArr: ResSkill[]=[]
            skill?.forEach((skill)=>{
                const skilltoresskill: ResSkill={
                    id: skill.id,
                    name: skill.name
                }
                skillArr.push(skilltoresskill)
            })

            const employee=await project.employees
            const employeeArr: ResEmployee[]=[]
            employee?.forEach((employee)=>{
                const employeeToResEmployee: ResEmployee={
                    firstName: employee.first_name,
                    id: employee.id,
                    lastName: employee.last_name,
                    password: employee.password,
                    role: employee.role,
                    salary: employee.salary,
                    status: employee.status,
                    username: employee.username
                }
                employeeArr.push(employeeToResEmployee)
            })

            projectArr.push({
                department: project.department,
                employees: employeeArr,
                end_date: project.end_date,
                id: project.id,
                name: project.name,
                skills: skillArr,
                start_date: project.start_date,
                // tasks: project.tasks
            })
        }

        return projectArr
    }

    @Post()
    public async saveProject(@Request() req: JWTRequest, @Body() request: ReqProject){
        const department=await this.departmentrepository.findOne({
            where:{
                id: req.user?.department
            },
        })

        if(!department){
            return Promise.reject(new Error('DEPARTMENT NOT FOUND'))
        }

        const {end_date, name,start_date,
            skills,
            //  employees
            }=request
        const skillArr: Skill[]=[]
        // const skillp=skills
        if(!skills){
            return Promise.reject(new Error('SKILLS NOT FOUND'))
        }
        if(skills){
            
            const dbskill=await this.skillrepository.find({
                where:{
                    
                    id: In(skills)
                } 
            })

            if(!dbskill){
                return Promise.reject(new Error('SKILLS NOT FOUND IN DB'))
            }

            skillArr.push(...dbskill)
        }

    //     const employeeArr: Employee[]=[]
    //   if(employees){
    //     const db_employees=await this.employeerepository.find({
    //         where:{
    //             id: In(employees)
    //         }
    //     })

    //     if(!db_employees){
    //         return Promise.reject(new Error('EMPLOYEES IN DATABASE NOT FOUND'))
    //     }

    //     employeeArr.push(...db_employees)
    //   }
    const skillIds = skillArr.map(skill => skill.id);

        const employeess=await this.employeerepository.find({
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
        // const employeeArr: Employee[]=[]
        // const employeess=await this.employeerepository.find({
        //     relations:['skills'],
        //     where:{
        //         skills:{
        //             id:In(skills)
        //         }
        //     }
        // })

       
    
        const projectSave: Project={
            department: department,
            employees: Promise.resolve(employeess),
            end_date: end_date,
            name: name,
            skills: Promise.resolve(skillArr),
            start_date: start_date,
        }

        const projectSaver=Object.assign(new Project(), projectSave)
        const savedProject=await this.projectrepository.save(projectSaver)

        const resProject: ResProject={
            department: savedProject.department,
            employees: [],
            end_date: savedProject.end_date,
            id: savedProject.id,
            name: savedProject.name,
            skills: [],
            start_date: savedProject.start_date
        }
        if (!savedProject.skills) {
            return resProject;
          }
      
          savedProject.skills?.then<ResSkill>((skills) => {
            resProject.skills = skills.map((d) => {
              return {
                id: d.id,
                name: d.name      
              };
            });
            this.setStatus(201);
            return resProject;
          });
      
        if (!savedProject.employees) {
            return resProject;
          }
      
          savedProject.employees?.then<ResProject>((employees) => {
            resProject.employees = employees.map((d) => {
              return {
                id: d.id,
                branch: d.branch,
                company: d.company,
                department: d.department,
                firstName: d.first_name,
                lastName: d.last_name,
                password: d.password,
                role: d.role,
                salary: d.salary,
                status: d.status          
              };
            });
            this.setStatus(201);
            return resProject;
          });
      
        return resProject


    } 
}
        // if (savedProject.employees) {
        //     const employees = await savedProject.employees;
        //     resProject.employees = employees.map((d) => {
        //         return {
        //             id: d.id,
        //             branch: d.branch,
        //             company: d.company,
        //             department: d.department,
        //             firstName: d.first_name,
        //             lastName: d.last_name,
        //             password: d.password,
        //             role: d.role,
        //             salary: d.salary,
        //             status: d.status          
        //         };
        //     });
        // }
        
        // this.setStatus(201);
        // return resProject;