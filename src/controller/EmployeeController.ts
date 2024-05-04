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
import { Body, Controller, Delete, Get, Path, Post, Request, Route, Tags } from "tsoa";
import { envs } from "utils/envVars";
import * as jwt from 'jsonwebtoken';
// @Route('company/{companyId}/branch/{branchId}/department/{departmentId}/employee')
@Route('/employee')
@Tags('Employee')
export class EmployeeController extends Controller {
    private employeerepository = AppDataSource.getRepository(Employee)
    private companyrepository = AppDataSource.getRepository(Company)
    private branchrepository = AppDataSource.getRepository(Branch)
    private departmentrepository = AppDataSource.getRepository(Department)


    @Get()
    public async getAllEmployeeBranch(@Request() req: JWTRequest): Promise<ResEmployee[]> {

        const employees = await this.employeerepository.find({
            where: {
                company: {
                    id: req.user.company,
                    branches: {
                        id: req.user.branch,
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
                firstName: employee.firstName,
                lastName: employee.lastName,
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
    public async saveEmployee(@Request() req: JWTRequest, @Body() request: ReqEmployee) {
        const department = await this.departmentrepository.findOne({
            where: {
                id: req.user.department,
                branch: {
                    id: req.user.branch,
                    company: {
                        id: req.user.company
                    }
                }
            }
        })
        if (!department) {
            return Promise.reject(new Error('DEPARTMENT NOT FOUND'))
        }

        const { id, firstName, lastName, username, status, password } = request

        const employeeToSave: Employee = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            username: username,
            status: status,
            password: password,
            department: department,
            branch: department.branch,
            company: department.branch?.company
        }

        const employeeSaver = Object.assign(new Employee, employeeToSave)
        const savedEmployee = await this.employeerepository.save(employeeSaver)

        const resEmployeee: ResEmployee = {
            id: savedEmployee.id,
            firstName: savedEmployee.firstName,
            lastName: savedEmployee.lastName,
            status: savedEmployee.status,
            username: savedEmployee.username,
            password: savedEmployee.password,
            branch: {
                id: department.branch?.id,
                name: department.branch?.name,
                status: department.branch?.status
            },
            company: {
                id: department.branch?.company?.id,
                logo_url: department.branch?.company?.logo_url,
                name: department.branch?.company?.name

            },
            department: {
                id: department.id,
                name: department.name,
                status: department.status
            },
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
            perm_name: item.permissionName,
            description: item.permissionDescription,
        }));

        const loginUser: ResUserLogin = {
            name: (user.firstName ? user.firstName : '') + ' ' + (user.lastName ? user.lastName : ''),
            company: {
                id: user.company.id!,
                logo_url: user.company.logo_url!,
                name: user.company.name!
            },
            role: {
                id: user.role.id!,
                role_name: user.role.roleName!,
                role_description: user.role.roleDescription!,
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
                    return p.permissionName!;
                }),
            },
        };
        const jsonWebtoken = jwt.sign(tokenData, envs.JWT_SECRET_KEY);
        loginUser.token = jsonWebtoken;
        return loginUser;
    }
}