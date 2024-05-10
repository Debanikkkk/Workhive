/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TaskController } from './../controller/TaskController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SkillsController } from './../controller/SkillsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../controller/RoleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProjectController } from './../controller/ProjectController';
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
import { ClockInController } from './../controller/ClockIInController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BuddyTaskController } from './../controller/BuddyTaskController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BuddiesController } from './../controller/BuddiesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BranchController } from './../controller/BranchController';
import { expressAuthentication } from './../authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Project": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "start_date": {"dataType":"datetime"},
            "end_date": {"dataType":"datetime"},
            "skills": {"dataType":"array","array":{"dataType":"refObject","ref":"Skill"}},
            "tasks": {"dataType":"array","array":{"dataType":"refObject","ref":"Task"}},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
            "department": {"ref":"Department"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Employee": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "first_name": {"dataType":"string"},
            "last_name": {"dataType":"string"},
            "salary": {"dataType":"double"},
            "date_of_joining": {"dataType":"datetime"},
            "username": {"dataType":"string"},
            "password": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "role": {"ref":"Role"},
            "department": {"ref":"Department"},
            "branch": {"ref":"Branch"},
            "company": {"ref":"Company"},
            "buddies": {"dataType":"array","array":{"dataType":"refObject","ref":"Buddies"}},
            "skills": {"dataType":"array","array":{"dataType":"refObject","ref":"Skill"}},
            "leaverequests": {"dataType":"array","array":{"dataType":"refObject","ref":"LeaveRequest"}},
            "hrletters": {"dataType":"array","array":{"dataType":"refObject","ref":"HRLetters"}},
            "clockins": {"dataType":"array","array":{"dataType":"refObject","ref":"Clockin"}},
            "project": {"ref":"Project"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Role": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "role_name": {"dataType":"string"},
            "role_description": {"dataType":"string"},
            "employee": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"Permission"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "permission_name": {"dataType":"string"},
            "permission_description": {"dataType":"string"},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"Role"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Department": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
            "branch": {"ref":"Branch"},
            "projects": {"dataType":"array","array":{"dataType":"refObject","ref":"Project"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Branch": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
            "departments": {"dataType":"array","array":{"dataType":"refObject","ref":"Department"}},
            "company": {"ref":"Company"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Company": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "logo_url": {"dataType":"string"},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
            "branches": {"dataType":"array","array":{"dataType":"refObject","ref":"Branch"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Buddies": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "buddy_group_name": {"dataType":"string"},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
            "buddy_tasks": {"dataType":"array","array":{"dataType":"refObject","ref":"BuddyTask"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BuddyTask": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "buddy_task": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "start_date": {"dataType":"datetime"},
            "end_date": {"dataType":"datetime"},
            "buddies": {"ref":"Buddies"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Skill": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "projects": {"dataType":"array","array":{"dataType":"refObject","ref":"Project"}},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"Employee"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LeaveRequest": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "reason": {"dataType":"string"},
            "from_date": {"dataType":"string"},
            "to_date": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "employee": {"ref":"Employee"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HRLetters": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "letter_subject": {"dataType":"string"},
            "letter_content": {"dataType":"string"},
            "letter_time": {"dataType":"string"},
            "employee": {"ref":"Employee"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Clockin": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "clock_in": {"dataType":"datetime"},
            "clock_out": {"dataType":"datetime"},
            "employee": {"ref":"Employee"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Task": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "start_date": {"dataType":"datetime"},
            "end_date": {"dataType":"datetime"},
            "project": {"ref":"Project"},
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
    "ResSkill": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
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
            "skills": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ResSkill"}},{"dataType":"array","array":{"dataType":"refObject","ref":"Skill"}}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResProject": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "department": {"ref":"ResDepartment"},
            "employees": {"dataType":"array","array":{"dataType":"refObject","ref":"ResEmployee"}},
            "end_date": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "skills": {"dataType":"array","array":{"dataType":"refObject","ref":"ResSkill"}},
            "start_date": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResTask": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "end_date": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "project": {"ref":"ResProject"},
            "start_date": {"dataType":"datetime"},
            "status": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqTask": {
        "dataType": "refObject",
        "properties": {
            "end_date": {"dataType":"datetime"},
            "name": {"dataType":"string","required":true},
            "start_date": {"dataType":"datetime","required":true},
            "status": {"dataType":"enum","enums":[false],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqSkill": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqEmpSkill": {
        "dataType": "refObject",
        "properties": {
            "skill": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqProject": {
        "dataType": "refObject",
        "properties": {
            "end_date": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "skills": {"dataType":"array","array":{"dataType":"double"}},
            "start_date": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResEmployeeN": {
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
            "from_date": {"dataType":"string"},
            "to_date": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "reason": {"dataType":"string"},
            "employee": {"ref":"ResEmployeeN"},
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
    "ReqLeaveRequest": {
        "dataType": "refObject",
        "properties": {
            "from_date": {"dataType":"string"},
            "to_date": {"dataType":"string"},
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
            "letter_time": {"dataType":"string"},
            "employee": {"ref":"ResEmployeeN"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqHRLetter": {
        "dataType": "refObject",
        "properties": {
            "letter_content": {"dataType":"string"},
            "letter_subject": {"dataType":"string"},
            "letter_time": {"dataType":"string"},
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
            "skills": {"dataType":"array","array":{"dataType":"double"}},
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
    "ResSuccess": {
        "dataType": "refObject",
        "properties": {
            "result": {"dataType":"string","required":true},
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
    "ReqCompany": {
        "dataType": "refObject",
        "properties": {
            "logo_url": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResClockin": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "clock_in": {"dataType":"datetime"},
            "clock_out": {"dataType":"datetime"},
            "employee": {"ref":"ResEmployee"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqClockIn": {
        "dataType": "refObject",
        "properties": {
            "clock_in": {"dataType":"datetime"},
            "clock_out": {"dataType":"datetime"},
            "employee": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqClockInU": {
        "dataType": "refObject",
        "properties": {
            "clock_out": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResBuddy": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "buddy_group_name": {"dataType":"string"},
            "employees": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refObject","ref":"ResEmployee"}},{"dataType":"array","array":{"dataType":"refObject","ref":"ResEmployee"}}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResBuddyTask": {
        "dataType": "refObject",
        "properties": {
            "buddies": {"ref":"ResBuddy"},
            "buddyTask": {"dataType":"string"},
            "endDate": {"dataType":"datetime"},
            "id": {"dataType":"double"},
            "startDate": {"dataType":"datetime"},
            "status": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqBuddyTask": {
        "dataType": "refObject",
        "properties": {
            "buddyTask": {"dataType":"string"},
            "endDate": {"dataType":"datetime"},
            "startDate": {"dataType":"datetime"},
            "status": {"dataType":"boolean"},
            "buddy": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqBuddy": {
        "dataType": "refObject",
        "properties": {
            "buddy_group_name": {"dataType":"string"},
            "buddies": {"dataType":"array","array":{"dataType":"double"},"required":true},
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
        app.get('/project/:projectId/task/:projectId',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.getTask)),

            async function TaskController_getTask(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    projectId: {"in":"path","name":"projectId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'getTask',
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
        app.post('/project/:projectId/task',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.saveTask)),

            async function TaskController_saveTask(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    projectId: {"in":"path","name":"projectId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqTask"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'saveTask',
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
        app.get('/skill',
            ...(fetchMiddlewares<RequestHandler>(SkillsController)),
            ...(fetchMiddlewares<RequestHandler>(SkillsController.prototype.getSkills)),

            async function SkillsController_getSkills(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SkillsController();

              await templateService.apiHandler({
                methodName: 'getSkills',
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
        app.post('/skill',
            ...(fetchMiddlewares<RequestHandler>(SkillsController)),
            ...(fetchMiddlewares<RequestHandler>(SkillsController.prototype.saveSkill)),

            async function SkillsController_saveSkill(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqSkill"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SkillsController();

              await templateService.apiHandler({
                methodName: 'saveSkill',
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
        app.post('/skill/skillemp',
            ...(fetchMiddlewares<RequestHandler>(SkillsController)),
            ...(fetchMiddlewares<RequestHandler>(SkillsController.prototype.getEmployeeBySkill)),

            async function SkillsController_getEmployeeBySkill(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqEmpSkill"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new SkillsController();

              await templateService.apiHandler({
                methodName: 'getEmployeeBySkill',
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
        app.get('/project',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.getAllProject)),

            async function ProjectController_getAllProject(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'getAllProject',
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
        app.post('/project',
            ...(fetchMiddlewares<RequestHandler>(ProjectController)),
            ...(fetchMiddlewares<RequestHandler>(ProjectController.prototype.saveProject)),

            async function ProjectController_saveProject(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqProject"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProjectController();

              await templateService.apiHandler({
                methodName: 'saveProject',
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
        app.get('/leaveRequest/:leaveRequestId',
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController)),
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController.prototype.getOneLeaveRequest)),

            async function LeaveRequestController_getOneLeaveRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    leaveRequestId: {"in":"path","name":"leaveRequestId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LeaveRequestController();

              await templateService.apiHandler({
                methodName: 'getOneLeaveRequest',
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
        app.post('/leaveRequest/yourlr',
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController)),
            ...(fetchMiddlewares<RequestHandler>(LeaveRequestController.prototype.getAllLeaveRequestSelf)),

            async function LeaveRequestController_getAllLeaveRequestSelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LeaveRequestController();

              await templateService.apiHandler({
                methodName: 'getAllLeaveRequestSelf',
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
        app.get('/hrletters/:hrlettersId',
            ...(fetchMiddlewares<RequestHandler>(HRLettersController)),
            ...(fetchMiddlewares<RequestHandler>(HRLettersController.prototype.getOneHrLetters)),

            async function HRLettersController_getOneHrLetters(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    hrlettersId: {"in":"path","name":"hrlettersId","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HRLettersController();

              await templateService.apiHandler({
                methodName: 'getOneHrLetters',
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
        app.post('/hrletters/hrlettersself',
            ...(fetchMiddlewares<RequestHandler>(HRLettersController)),
            ...(fetchMiddlewares<RequestHandler>(HRLettersController.prototype.getAllHrLettersSelf)),

            async function HRLettersController_getAllHrLettersSelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new HRLettersController();

              await templateService.apiHandler({
                methodName: 'getAllHrLettersSelf',
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
        app.get('/employee/:employeeId',
            ...(fetchMiddlewares<RequestHandler>(EmployeeController)),
            ...(fetchMiddlewares<RequestHandler>(EmployeeController.prototype.getOneEmployee)),

            async function EmployeeController_getOneEmployee(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    employeeId: {"in":"path","name":"employeeId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EmployeeController();

              await templateService.apiHandler({
                methodName: 'getOneEmployee',
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
        app.get('/employee',
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
        app.post('/employee',
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
        app.post('/employee/login',
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
        app.delete('/employee/:employeeId',
            ...(fetchMiddlewares<RequestHandler>(EmployeeController)),
            ...(fetchMiddlewares<RequestHandler>(EmployeeController.prototype.deleteEmployee)),

            async function EmployeeController_deleteEmployee(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    employeeId: {"in":"path","name":"employeeId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EmployeeController();

              await templateService.apiHandler({
                methodName: 'deleteEmployee',
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
        app.get('/clockin',
            ...(fetchMiddlewares<RequestHandler>(ClockInController)),
            ...(fetchMiddlewares<RequestHandler>(ClockInController.prototype.getClockIns)),

            async function ClockInController_getClockIns(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ClockInController();

              await templateService.apiHandler({
                methodName: 'getClockIns',
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
        app.post('/clockin',
            ...(fetchMiddlewares<RequestHandler>(ClockInController)),
            ...(fetchMiddlewares<RequestHandler>(ClockInController.prototype.saveClockIn)),

            async function ClockInController_saveClockIn(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqClockIn"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ClockInController();

              await templateService.apiHandler({
                methodName: 'saveClockIn',
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
        app.put('/clockin/:clockinId',
            ...(fetchMiddlewares<RequestHandler>(ClockInController)),
            ...(fetchMiddlewares<RequestHandler>(ClockInController.prototype.updateClock)),

            async function ClockInController_updateClock(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    clockinId: {"in":"path","name":"clockinId","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqClockInU"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ClockInController();

              await templateService.apiHandler({
                methodName: 'updateClock',
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
        app.get('/buddy/:buddyId/buddyTask',
            ...(fetchMiddlewares<RequestHandler>(BuddyTaskController)),
            ...(fetchMiddlewares<RequestHandler>(BuddyTaskController.prototype.getBuddyTask)),

            async function BuddyTaskController_getBuddyTask(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    buddyId: {"in":"path","name":"buddyId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BuddyTaskController();

              await templateService.apiHandler({
                methodName: 'getBuddyTask',
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
        app.post('/buddy/:buddyId/buddyTask',
            ...(fetchMiddlewares<RequestHandler>(BuddyTaskController)),
            ...(fetchMiddlewares<RequestHandler>(BuddyTaskController.prototype.saveBuddyTask)),

            async function BuddyTaskController_saveBuddyTask(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    buddyId: {"in":"path","name":"buddyId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqBuddyTask"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BuddyTaskController();

              await templateService.apiHandler({
                methodName: 'saveBuddyTask',
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
        app.put('/buddy/:buddyId/buddyTask/:buddyTaskId',
            ...(fetchMiddlewares<RequestHandler>(BuddyTaskController)),
            ...(fetchMiddlewares<RequestHandler>(BuddyTaskController.prototype.updateBuddyTask)),

            async function BuddyTaskController_updateBuddyTask(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    buddyId: {"in":"path","name":"buddyId","required":true,"dataType":"double"},
                    buddyTaskId: {"in":"path","name":"buddyTaskId","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqBuddyTask"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BuddyTaskController();

              await templateService.apiHandler({
                methodName: 'updateBuddyTask',
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
        app.post('/buddy',
            ...(fetchMiddlewares<RequestHandler>(BuddiesController)),
            ...(fetchMiddlewares<RequestHandler>(BuddiesController.prototype.saveBuddies)),

            async function BuddiesController_saveBuddies(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqBuddy"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BuddiesController();

              await templateService.apiHandler({
                methodName: 'saveBuddies',
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
        app.get('/buddy',
            ...(fetchMiddlewares<RequestHandler>(BuddiesController)),
            ...(fetchMiddlewares<RequestHandler>(BuddiesController.prototype.getAllBuddies)),

            async function BuddiesController_getAllBuddies(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BuddiesController();

              await templateService.apiHandler({
                methodName: 'getAllBuddies',
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
        app.put('/buddy/:buddyId',
            ...(fetchMiddlewares<RequestHandler>(BuddiesController)),
            ...(fetchMiddlewares<RequestHandler>(BuddiesController.prototype.updateBuddies)),

            async function BuddiesController_updateBuddies(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    buddyId: {"in":"path","name":"buddyId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqBuddy"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BuddiesController();

              await templateService.apiHandler({
                methodName: 'updateBuddies',
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
