import { Body, Controller, Get, Path, Route, Tags } from "tsoa";
import { AppDataSource } from "../data-source";
import { Department } from "../entity/Department";
import { Branch } from "../entity/Branch";
import { ResDepartment } from "src/models/res/ResDepartment";
import { ResError, ResSuccess } from "src/models/res/Responses";
import { ResEmployee } from "../models/res/ResEmployee";
import { ReqDepartment } from "src/models/req/ReqDepartment";
@Tags('Department')
@Route('/company/{companyId}/branch/{branchId}/department')
export class DepartmentController extends Controller {
    private departmentrepository = AppDataSource.getRepository(Department)
    private branchrepository = AppDataSource.getRepository(Branch)

    @Get()
    public async getAllDepartments(@Path() companyId: number, @Path() branchId: number): Promise<ResDepartment[]> {
        const departments = await this.departmentrepository.find({
            where: {
                branch: {
                    id: branchId,
                    company: {
                        id: companyId
                    }
                }
            },
            relations: {
                branch: true
            }
        })
        if (!departments) {
            return Promise.reject(new Error('DEPARTMENT NOT FOUND'))
        }
        const departmentArr: ResDepartment[] = []
        for (const department of departments) {
            departmentArr.push({
                id: department.id,
                branch: department.branch,
                name: department.name
            })
        }
        return departmentArr
    }
    @Get('/{departmentId}')
    public async getOneDepartment(@Path() companyId: number, @Path() branchId: number, @Path() departmentId: number): Promise<ResDepartment | ResError> {
        const department = await this.departmentrepository.findOne({
            where: {
                id: departmentId,
                branch: {
                    id: branchId,
                    company: {
                        id: companyId
                    }
                }
            }
        }).then((department) => {
            if (!department) {
                this.setStatus(400)
                return Promise.reject(new Error('DEPARTMENT NOT FOUND'))
            }
            const branch = department.branch
            const resDepartment: ResDepartment = {
                id: department.id,
                name: department.name,
                status: department.status,
            }

            if (!branch) {
                return resDepartment
            }

            resDepartment.branch = {
                id: branch.id,
                name: branch.name,
                status: branch.status
            }

            return resDepartment
        }, () => {
            this.setStatus(400)
            return ({ error: 'err' })
        })
        return department
    }

    public async deleteDepartment(@Path() companyId: number, @Path() branchId: number, @Path() departmentId: number): Promise<ResSuccess> {
        const departmentToDelete = await this.departmentrepository.findOne({
            where: {
                id: departmentId,
                branch: {
                    id: branchId,
                    company: {
                        id: companyId
                    }
                }
            }
        })
        if (!departmentToDelete) {
            return Promise.reject(new Error('DEPARTMENT NOT FOUND'))
        }

        await this.departmentrepository.remove(departmentToDelete)

        return Promise.resolve({ result: 'DEPARTMENT SUCCESSFULLY DELETED' })
    }

    public async saveDepartment(@Path() companyId: number, @Path() branchId: number, @Body() request: ReqDepartment): Promise<ResDepartment> {
        const branch = await this.branchrepository.findOne({
            where: {
                id: branchId,
                company: {
                    id: companyId,
                }
            },
            relations: {
                company: true,
            }
        })

        if (!branch) {
            return Promise.reject(new Error('BRANCH NOT FOUND'))
        }
        const { id, name, status } = request
        const departmentToSave: Department = {
            id: id,
            branch: branch,
            name: name,
            status: status
        }

        const departmentSaver = Object.assign(new Department, departmentToSave)
        const savedDepartment = await this.departmentrepository.save(departmentSaver)

        const resDepartment: ResDepartment = {
            id: savedDepartment.id,
            name: savedDepartment.name,
            status: savedDepartment.status,
            branch: {
                id: branch.id,
                name: branch.name,
                status: branch.status
            }
        }
        return resDepartment
    }
}