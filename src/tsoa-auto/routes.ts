/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../controller/RoleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LeaveRequestController } from './../controller/LeaveRequestController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HRLettersController } from './../controller/HRLettersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EmployeeController } from './../controller/EmployeeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DepartmentController } from './../controller/DepartmentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CompanyController } from './../controller/CompanyController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BranchController } from './../controller/BranchController';
import { expressAuthentication } from './../authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ResRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "roleName": {"dataType":"string"},
            "roleDescription": {"dataType":"string"},
            "permission": {"dataType":"array","array":{"dataType":"refObject","ref":"ResPermission"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResPermission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "permission_name": {"dataType":"string"},
            "permission_description": {"dataType":"string"},
            "role": {"dataType":"array","array":{"dataType":"refObject","ref":"ResRole"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResCompany": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "logo_url": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResBranch": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "company": {"ref":"ResCompany"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResDepartment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "branch": {"ref":"ResBranch"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResEmployee": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "username": {"dataType":"string"},
            "salary": {"dataType":"double"},
            "password": {"dataType":"string"},
            "department": {"ref":"ResDepartment"},
            "branch": {"ref":"ResBranch"},
            "company": {"ref":"ResCompany"},
            "role": {"ref":"ResRole"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResLeaveRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "from_date": {"dataType":"datetime"},
            "to_date": {"dataType":"datetime"},
            "status": {"dataType":"boolean"},
            "reason": {"dataType":"string"},
            "employee": {"ref":"ResEmployee"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqLeaveRequest": {
        "dataType": "refObject",
        "properties": {
            "from_date": {"dataType":"datetime"},
            "to_date": {"dataType":"datetime"},
            "status": {"dataType":"enum","enums":[false]},
            "reason": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqLeaveRequestN": {
        "dataType": "refObject",
        "properties": {
            "status": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResHRLetter": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "letter_content": {"dataType":"string"},
            "letter_subject": {"dataType":"string"},
            "letter_time": {"dataType":"datetime"},
            "employee": {"ref":"ResEmployee"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqHRLetter": {
        "dataType": "refObject",
        "properties": {
            "letter_content": {"dataType":"string"},
            "letter_subject": {"dataType":"string"},
            "letter_time": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqEmployee": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "salary": {"dataType":"double"},
            "date_of_joining": {"dataType":"datetime","required":true},
            "username": {"dataType":"string"},
            "password": {"dataType":"string"},
            "department": {"dataType":"double"},
            "branch": {"dataType":"double"},
            "company": {"dataType":"double"},
            "role": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginCompany": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "logo_url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "role_name": {"dataType":"string","required":true},
            "role_description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUserLogin": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "company": {"ref":"UserLoginCompany","required":true},
            "branch": {"ref":"ResBranch","required":true},
            "department": {"ref":"ResDepartment","required":true},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"ResPermission"}},
            "role": {"ref":"UserLoginRole","required":true},
            "token": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmpLogin": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResError": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDepartment": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "branch": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSuccess": {
        "dataType": "refObject",
        "properties": {
            "result": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqCompany": {
        "dataType": "refObject",
        "properties": {
            "logo_url": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqBranch": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "company": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.delete('/role/:roleId',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.deleteRole)),

            async function RoleController_deleteRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'deleteRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/role',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getAllRoles)),

            async function RoleController_getAllRoles(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getAllRoles',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/leaveRequest',
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController)),
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController.prototype.getAllLeaveRequest)),

            async function LeaveRequestController_getAllLeaveRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LeaveRequestController();

              await templateService.apiHandler({
                methodName: 'getAllLeaveRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/leaveRequest',
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController)),
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController.prototype.saveLeaveRequest)),

            async function LeaveRequestController_saveLeaveRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqLeaveRequest"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LeaveRequestController();

              await templateService.apiHandler({
                methodName: 'saveLeaveRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/leaveRequest/:leaverequestId',
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController)),
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController.prototype.updateLeaveRequest)),

            async function LeaveRequestController_updateLeaveRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqLeaveRequestN"},
                    leaverequestId: {"in":"path","name":"leaverequestId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LeaveRequestController();

              await templateService.apiHandler({
                methodName: 'updateLeaveRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hrletters',
            ...(fetchMiddlewares<RequestHandler>(HRLettersController)),
            ...(fetchMiddlewares<RequestHandler>(HRLettersController.prototype.getAllHrLetters)),

            async function HRLettersController_getAllHrLetters(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HRLettersController();

              await templateService.apiHandler({
                methodName: 'getAllHrLetters',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/hrletters',
            ...(fetchMiddlewares<RequestHandler>(HRLettersController)),
            ...(fetchMiddlewares<RequestHandler>(HRLettersController.prototype.saveHrLetters)),

            async function HRLettersController_saveHrLetters(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqHRLetter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HRLettersController();

              await templateService.apiHandler({
                methodName: 'saveHrLetters',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company/:companyId/branch/:branchId/department/:departmentId/employee',
            ...(fetchMiddlewares<RequestHandler>(EmployeeController)),
            ...(fetchMiddlewares<RequestHandler>(EmployeeController.prototype.getAllEmployeeBranch)),

            async function EmployeeController_getAllEmployeeBranch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EmployeeController();

              await templateService.apiHandler({
                methodName: 'getAllEmployeeBranch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company/:companyId/branch/:branchId/department/:departmentId/employee',
            ...(fetchMiddlewares<RequestHandler>(EmployeeController)),
            ...(fetchMiddlewares<RequestHandler>(EmployeeController.prototype.saveEmployee)),

            async function EmployeeController_saveEmployee(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqEmployee"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EmployeeController();

              await templateService.apiHandler({
                methodName: 'saveEmployee',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company/:companyId/branch/:branchId/department/:departmentId/employee/login',
            ...(fetchMiddlewares<RequestHandler>(EmployeeController)),
            ...(fetchMiddlewares<RequestHandler>(EmployeeController.prototype.userLogin)),

            async function EmployeeController_userLogin(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    loginBody: {"in":"body","name":"loginBody","required":true,"ref":"EmpLogin"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EmployeeController();

              await templateService.apiHandler({
                methodName: 'userLogin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company/:companyId/branch/:branchId/department',
            ...(fetchMiddlewares<RequestHandler>(DepartmentController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentController.prototype.getAllDepartments)),

            async function DepartmentController_getAllDepartments(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
                    branchId: {"in":"path","name":"branchId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DepartmentController();

              await templateService.apiHandler({
                methodName: 'getAllDepartments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company/:companyId/branch/:branchId/department/:departmentId',
            ...(fetchMiddlewares<RequestHandler>(DepartmentController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentController.prototype.getOneDepartment)),

            async function DepartmentController_getOneDepartment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
                    branchId: {"in":"path","name":"branchId","required":true,"dataType":"double"},
                    departmentId: {"in":"path","name":"departmentId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DepartmentController();

              await templateService.apiHandler({
                methodName: 'getOneDepartment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company/:companyId/branch/:branchId/department',
            ...(fetchMiddlewares<RequestHandler>(DepartmentController)),
            ...(fetchMiddlewares<RequestHandler>(DepartmentController.prototype.saveDepartment)),

            async function DepartmentController_saveDepartment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
                    branchId: {"in":"path","name":"branchId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqDepartment"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DepartmentController();

              await templateService.apiHandler({
                methodName: 'saveDepartment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.getAllCompanies)),

            async function CompanyController_getAllCompanies(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'getAllCompanies',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company/:companyId',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.getOneCompany)),

            async function CompanyController_getOneCompany(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'getOneCompany',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/company/:companyId',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.deleteCompany)),

            async function CompanyController_deleteCompany(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'deleteCompany',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company',
            ...(fetchMiddlewares<RequestHandler>(CompanyController)),
            ...(fetchMiddlewares<RequestHandler>(CompanyController.prototype.saveCompany)),

            async function CompanyController_saveCompany(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqCompany"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new CompanyController();

              await templateService.apiHandler({
                methodName: 'saveCompany',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company/:companyId/branch',
            ...(fetchMiddlewares<RequestHandler>(BranchController)),
            ...(fetchMiddlewares<RequestHandler>(BranchController.prototype.getAllBranch)),

            async function BranchController_getAllBranch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BranchController();

              await templateService.apiHandler({
                methodName: 'getAllBranch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/company/:companyId/branch/:branchId',
            ...(fetchMiddlewares<RequestHandler>(BranchController)),
            ...(fetchMiddlewares<RequestHandler>(BranchController.prototype.getOneBranch)),

            async function BranchController_getOneBranch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    branchId: {"in":"path","name":"branchId","required":true,"dataType":"double"},
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BranchController();

              await templateService.apiHandler({
                methodName: 'getOneBranch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/company/:companyId/branch/:branchId',
            ...(fetchMiddlewares<RequestHandler>(BranchController)),
            ...(fetchMiddlewares<RequestHandler>(BranchController.prototype.deleteBranch)),

            async function BranchController_deleteBranch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    branchId: {"in":"path","name":"branchId","required":true,"dataType":"double"},
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BranchController();

              await templateService.apiHandler({
                methodName: 'deleteBranch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/company/:companyId/branch',
            ...(fetchMiddlewares<RequestHandler>(BranchController)),
            ...(fetchMiddlewares<RequestHandler>(BranchController.prototype.saveBranch)),

            async function BranchController_saveBranch(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    companyId: {"in":"path","name":"companyId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqBranch"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BranchController();

              await templateService.apiHandler({
                methodName: 'saveBranch',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
