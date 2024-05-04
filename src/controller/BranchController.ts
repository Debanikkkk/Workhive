import { Body, Controller, Delete, Get, Path, Route, Tags } from "tsoa";
import { AppDataSource } from "../data-source";
import { Branch } from "../entity/Branch";
import { Department } from "../entity/Department";
import { ResBranch } from "src/models/res/ResBranch";
import { ResError, ResSuccess } from "src/models/res/Responses";
import { Company } from "../entity/Company";
import { ReqBranch } from "src/models/req/ReqBranch";
@Tags('Branch')
@Route('/company/{companyId}/branch')
export class BranchController extends Controller {
    private branchrepository = AppDataSource.getRepository(Branch)
    private departmentrepository = AppDataSource.getRepository(Department)
    private companyrepository = AppDataSource.getRepository(Company)

    @Get()
    public async getAllBranch(@Path() companyId: number): Promise<ResBranch[]> {
        const branches = await this.branchrepository.find({
            where: {
                id: companyId
            },
            relations: {
                company: true
            }
        })
        if (!branches) {
            return Promise.reject(new Error('BRANCHES NOT FOUND'))
        }

        const branchArr: ResBranch[] = []

        for (const branch of branches) {
            branchArr.push({
                id: branch.id,
                name: branch.name,
                status: branch.status,
                company: branch.company
            })
        }
        return branchArr
    }

    @Get('/{branchId}')
    public async getOneBranch(@Path() branchId: number, @Path() companyId: number): Promise<ResBranch | ResError> {
        const branch = await this.branchrepository.findOne({
            where: {
                id: branchId,
                company: {
                    id: companyId
                }
            },
            relations: {
                company: true
            }

        }).then((branch) => {
            if (!branch) {
                return Promise.reject(new Error('BRANCH NOT FOUND'))
            }
            const company = branch.company
            const resBranch: ResBranch = {
                id: branch.id,
                name: branch.name,
                status: branch.status
            }

            if (!company) {
                return resBranch
            }

            resBranch.company = {
                id: company.id,
                logo_url: company.logo_url,
                name: company.name
            }

            return resBranch
        }, () => {
            this.setStatus(400)
            return { error: 'err' }
        })
        return branch
    }

    @Delete('/{branchId}')
    public async deleteBranch(@Path() branchId: number, @Path() companyId: number): Promise<ResSuccess> {
        const branchToDelete = await this.branchrepository.findOne({
            where: {
                id: branchId,
                company: {
                    id: companyId
                },

            },
            relations: {
                company: true
            }
        })

        if (!branchToDelete) {
            return Promise.reject(new Error('BRANCH NOT FOUND'))
        }

        await this.branchrepository.remove(branchToDelete)

        return Promise.resolve({ result: 'BRANCH DELETED SUCCESSFULLY' })
    }

    public async saveBranch(@Path() companyId: number, @Body() request: ReqBranch): Promise<ResBranch> {
        const company = await this.companyrepository.findOne({
            where: {
                id: companyId
            }
        })

        if (!company) {
            return Promise.reject(new Error('COMPANY TO SAVE IN NOT FOUND'))
        }

        const { name, status } = request

        const branch: Branch = {
            name: name,
            status: status,
            company: company
        }

        const branchSaver = Object.assign(new Branch(), branch)
        const savedBranch = await this.branchrepository.save(branchSaver)

        const resBranch: ResBranch = {
            id: savedBranch.id,
            name: savedBranch.name,
            status: savedBranch.status
        }

        if (!savedBranch.company) {
            return savedBranch
        }

        resBranch.company = {
            id: company.id,
            logo_url: company.logo_url,
            name: company.name
        }

        return resBranch
    }
}