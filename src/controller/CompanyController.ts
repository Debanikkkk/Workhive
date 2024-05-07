import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Company } from "../entity/Company";
import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from "tsoa";
import { ResCompany } from "src/models/res/ResCompany";
import { Employee } from "../entity/Employee";
import { ResError, ResSuccess } from "src/models/res/Responses";
import { ReqCompany } from "src/models/req/ReqCompany";
// import { OEM } from "../entity/OEM"
@Tags("Company")
@Route("/company")
export class CompanyController extends Controller {
  private companyrepository = AppDataSource.getRepository(Company);

  @Get()
  public async getAllCompanies(): // request: Request, response: Response, next: NextFunction
    Promise<ResCompany[]> {
    const companies = await this.companyrepository.find();
    if (!companies) {
      return Promise.reject("COMPANIES NOT FOUND");
    }
    const companyArr: ResCompany[] = [];
    for (const company of companies) {
      companyArr.push({
        id: company.id,
        logo_url: company.logo_url,
        name: company.name,
      });
    }
    return companyArr;
  }

  @Get('/{companyId}')
  public async getOneCompany(@Path() companyId: number): Promise<ResCompany | ResError> {
    const company = await this.companyrepository.findOne({
      where: {
        id: companyId
      }
    }).then((company) => {
      if (!company) {
        return Promise.reject(new Error('COMPANY NOT FOUND'))
      }
      // const employee = company.employees
      const resCompany: ResCompany = {
        id: company.id,
        logo_url: company.logo_url,
        name: company.name

      };
      // if (!employee) {
      //   return resCompany
      // }

      return resCompany
    }, (err) => {
      this.setStatus(400)
      return { error: err }
    })
    return company
  }

  @Delete('/{companyId}')
  public async deleteCompany(@Path() companyId: number): Promise<ResSuccess> {
    const companytodelete = await this.companyrepository.findOne({
      where: {
        id: companyId
      }

    })

    if (!companytodelete) {
      return Promise.reject(new Error('COMPANY NOT FOUND'))
    }

    await this.companyrepository.remove(companytodelete)

    return Promise.resolve({ result: 'COMPANY SUCCESSFULLY DELETED' })
  }

  @Post()
  public async saveCompany(@Body() request: ReqCompany): Promise<ResCompany> {
    const { name, logo_url } = request
    const companyToSave: Company = {
      name: name,
      logo_url: logo_url
    }

    const companySaver = Object.assign(new Company(), companyToSave)
    const savedCompany = await this.companyrepository.save(companySaver)

    const resCompany: ResCompany = {
      id: savedCompany.id,
      logo_url: savedCompany.logo_url,
      name: savedCompany.name
    }

    return resCompany
  }


}
// async one(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id)

//     const oem = await this.companyrepository.findOne({
//         where: { id }
//     })

//     if (!oem) {
//         return "unregistered OEM"
//     }
//     return oem
// }

// async save(request: Request, response: Response, next: NextFunction) {
//     const { name, logo_url } = request.body;

//     const oem = Object.assign(new OEM(), {
//         name,
//         logo_url
//     })

//     return this.oemRepository.save(oem)
// }

// async remove(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id)

//     let oemToRemove = await this.oemRepository.findOneBy({ id })

//     if (!oemToRemove) {
//         return "this oem does not exist"
//     }

//     await this.oemRepository.remove(oemToRemove)

//     return "user has been removed"
// }
