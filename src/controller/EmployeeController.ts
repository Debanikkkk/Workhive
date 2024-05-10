import { AppDataSource } from "data-source";
import { Branch } from "entity/Branch";
import { Company } from "entity/Company";
import { Department } from "entity/Department";
import { Employee } from "entity/Employee";
import { EmpLogin } from "src/models/req/EmpLogin";
import { JWTRequest } from "src/models/req/JWTRequest";
import { ReqEmployee } from "src/models/req/ReqEmployee";
import { ResPermission } from "src/models/res/ResPermission";
import { ResUserLogin } from "src/models/res/ResUserLogin";
import { JWTTokenData } from "src/models/res/TokenModel";
import { ResEmployee } from "src/models/res/ResEmployee";
import { Body, Controller, Delete, Get, Path, Post, Request, Route, Security, Tags } from "tsoa";
import { envs } from "utils/envVars";
import * as jwt from 'jsonwebtoken';
import { Role } from "entity/Role";
import { Skill } from "entity/Skill";
import { In } from "typeorm";
import { ResError, ResSuccess } from "src/models/res/Responses";
import { ReqEmpSkill } from "src/models/req/ReqEmpSkill";
@Route('/employee')
// @Route('/employee')
@Tags('Employee')
export class EmployeeController extends Controller {
    private employeerepository = AppDataSource.getRepository(Employee)
    private companyrepository = AppDataSource.getRepository(Company)
    private branchrepository = AppDataSource.getRepository(Branch)
    private departmentrepository = AppDataSource.getRepository(Department)
    private rolerepository = AppDataSource.getRepository(Role)
    private skillrepository=AppDataSource.getRepository(Skill)

    // @Security({ 'Api-token': [] })
    @Get('/{employeeId}')
    public async getOneEmployee(@Path() employeeId: number): Promise<ResEmployee | ResError> {
        const employee=await this.employeerepository.findOne({
            where:{
                id: employeeId
            },
            relations:{
                // branch:true,
                // company: true,
                // department: true
                department:{
                    branch:{
                    company: true
                }
            }
            }
        }).then((employee)=>{
            if(!employee){
                return Promise.reject(new Error('EMPLYOEE NOT FOUND'))
            }
            const branch=employee.branch
            const company=employee.company
            const department=employee.department
            const role=employee.role

            const resEmployee: ResEmployee={
                
                firstName: employee.first_name,
                id: employee.id,
                lastName: employee.last_name,
                password: employee.password,
                salary: employee.salary,
                status: employee.status,
                username: employee.username,
            }

            if(!resEmployee.branch){
                return resEmployee
            }

            resEmployee.branch={
                id: branch?.id,
                name: branch?.name,
                status: branch?.status
                
            }

            if(!resEmployee.department){
                return resEmployee
            }

            resEmployee.department={
                id: department?.id,
                name: department?.name,
                status: department?.status
            }

            if(!resEmployee.company){
                return resEmployee
            }

            resEmployee.company={
                id: company?.id,
                name: company?.name,
                logo_url: company?.logo_url
            }

            if(!resEmployee.role){
                return resEmployee
            }

            resEmployee.role={
                id: role?.id,
                roleDescription: role?.role_description,
                roleName: role?.role_name
            }

            if (!resEmployee.skills) {
                return resEmployee;
              }
              employee.skills?.then((skills) => {
                resEmployee.skills = skills;
              });  


              return resEmployee
        },
        ()=>{
            this.setStatus(400)
            return {error: 'err'}
        }   
        
    )
    return employee

    }
    @Get()
    public async getAllEmployeeBranch(@Request() req: JWTRequest): Promise<ResEmployee[]> {

        const employees = await this.employeerepository.find({
            where: {
                company: {
                    id: req.user?.company,
                    branches: {
                        id: req.user?.branch,
                        departments:{
                            id: req.user?.department
                        }
                    }
                }

            },
            relations: {
                branch: true,
                company: true,
                department: true,
                role: {
                    permissions: true
                }
            }
        })

        if (!employees) {
            return Promise.reject(new Error('EMPLOYEES NOT FOUND'))
        }
        const emp: Employee = {

        }
        const employeeArr: ResEmployee[] = []
        for (const employee of employees) {
            employeeArr.push({
                id: employee.id,
                firstName: employee.first_name,
                lastName: employee.last_name,
                status: employee.status,
                username: employee.username,
                branch: employee.branch,
                company: employee.company,
                department: employee.department,
                role: employee.role

            })
        }
        return employeeArr
    }

    // @Get()
    // public async getAllEmployeeDepartment(@Request() req: JWTRequest): Promise<ResEmployee[]> {
    //     const employees = await this.employeerepository.find({
    //         where: {
    //             company: {
    //                 id: req.user.company,
    //                 branches: {
    //                     id: req.user.branch,
    //                     departments: {
    //                         id: req.user.department
    //                     }
    //                 }
    //             }

    //         },
    //         relations: {
    //             branch: true,
    //             company: true,
    //             department: true,
    //             role: true
    //         }
    //     })

    //     if (!employees) {
    //         return Promise.reject(new Error('EMPLOYEES NOT FOUND'))
    //     }
    //     const emp: Employee = {

    //     }
    //     const employeeArr: ResEmployee[] = []
    //     for (const employee of employees) {
    //         employeeArr.push({
    //             id: employee.id,
    //             firstName: employee.firstName,
    //             lastName: employee.lastName,
    //             status: employee.status,
    //             username: employee.username,
    //             branch: employee.branch,
    //             company: employee.company,
    //             department: employee.department,
    //             role: employee.role

    //         })
    //     }
    //     return employeeArr
    // }



    @Post()
    public async saveEmployee(
        // @Path() companyId: number, @Path() branchId: number, @Path() departmentId: number,
        @Body() request: ReqEmployee) {
        const department = await this.departmentrepository.findOne({
            where: {
                id: request.department,
                branch: {
                    id: request.branch,
                }
            },
            relations: {
                branch: true
            }

        })

        if (!department) {
            return Promise.reject(new Error('DEPARTMENT NOT FOUND'))
        }

        const company = await this.companyrepository.findOne({
            where: {
                id: request.company
            }
        })
        if (!company) {
            return Promise.reject(new Error('COMPANY NOT FOUND'))
        }
        const rolee = await this.rolerepository.findOne({
            where: {
                id: request.role
            },
            relations: {
                permissions: true
            }
        })
        if (!rolee) {
            return Promise.reject(new Error('ROLE NOT FOUND'))

        }

        
        const { firstName, lastName, username, status, password, salary, skills } = request
        const skillArr: Skill[]=[]
        if(skills){
            const dbskills=await this.skillrepository.find({
                where:{
                    id: In(skills)
                }
            })

            if(!dbskills){
                return Promise.reject(new Error('SKILLS IN DB NOT FOUND'))
            }

            skillArr.push(...dbskills)
        }
        console.log(department)
        console.log(department.branch)
        console.log(department.branch?.company)
        const employeeToSave: Employee = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            status: status,
            password: password,
            salary: salary,
            department: department,
            branch: department.branch,
            company: company,
            role: rolee,
            skills: Promise.resolve(skillArr)
        }

        const employeeSaver = Object.assign(new Employee, employeeToSave)
        const savedEmployee = await this.employeerepository.save(employeeSaver)

        const resEmployeee: ResEmployee = {
            id: savedEmployee.id,
            firstName: savedEmployee.first_name,
            lastName: savedEmployee.last_name,
            salary: savedEmployee.salary,
            status: savedEmployee.status,
            username: savedEmployee.username,
            password: savedEmployee.password,
            branch: {
                id: department.branch?.id,
                name: department.branch?.name,
                status: department.branch?.status
            },
            company: {
                id: company.id,
                logo_url: company.logo_url,
                name: company.name

            },
            department: {
                id: department.id,
                name: department.name,
                status: department.status
            },
            role: {
                id: rolee.id,
                roleDescription: rolee.role_description,
                roleName: rolee.role_name,
            },
            skills:[]
        }
        return resEmployeee
    }

    @Post('/login')
    public async userLogin(@Body() loginBody: EmpLogin): Promise<ResUserLogin> {
        const { username, password } = loginBody;

        const users = await this.employeerepository.find({
            where: {
                username: username,
                password: password,
            },
            relations: {
                company: true,
                branch: true,
                department: true,
                role: {
                    permissions: true,
                },
            },
        });
        if (!users || users.length == 0) {
            return Promise.reject(new Error('Invalid credentials'));
        }
        if (users.length != 1) {
            return Promise.reject(new Error('Something went wrong'));
        }
        const user: Employee = users[0];

        if (!user.company) {
            return Promise.reject(new Error('Company Not found'));
        }

        if (!user.role) {
            return Promise.reject(new Error('Role Not found'));
        }

        const perm_result = await user.role.permissions;

        const permissions: ResPermission[] = perm_result!.map((item) => ({
            id: item.id,
            perm_name: item.permission_name,
            description: item.permission_description,
        }));

        const loginUser: ResUserLogin = {
            name: (user.first_name ? user.first_name : '') + ' ' + (user.last_name ? user.last_name : ''),
            company: {
                id: user.company.id!,
                logo_url: user.company.logo_url!,
                name: user.company.name!
            },
            role: {
                id: user.role.id!,
                role_name: user.role.role_name!,
                role_description: user.role.role_description!,
            },
            branch: {},
            department: {},
            permissions: permissions,
        };

        const tokenData: JWTTokenData = {
            id: user.id!,

            company: user.company.id!,
            branch: user.branch?.id!,
            department: user.department?.id!,
            role: {
                permissions: perm_result!.map<string>((p) => {
                    return p.permission_name!;
                }),
            },
        };
        const jsonWebtoken = jwt.sign(tokenData, envs.JWT_SECRET_KEY);
        loginUser.token = jsonWebtoken;
        return loginUser;
    }

    @Delete('/{employeeId}')
    public async deleteEmployee(@Path() employeeId: number): Promise<ResSuccess>{
        const employeeToDelete=await this.employeerepository.findOne({
            where:{
                id: employeeId
            }
        })
        if(!employeeToDelete){
            return Promise.reject(new Error('EMPLOYEE NOT FOUND'))
        }

        await this.employeerepository.remove(employeeToDelete)
        return Promise.resolve({result: 'EMPLOYEE DELETED SUCCESSFULLY'})
    }
    /**
     * get employee by skill 
     * @summary get employee by skill
     */
    
}