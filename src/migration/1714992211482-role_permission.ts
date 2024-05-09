import { MigrationInterface, QueryRunner } from "typeorm";

export class RolePermission1714992211482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO role(role_name, role_description) VALUES('employee', 'employee in the organization');
        INSERT INTO role(role_name, role_description) VALUES('manager', 'manager in the organization');
        INSERT INTO role(role_name, role_description) VALUES('hr', 'hr in the organization');
       
        
        INSERT INTO permission(permission_name, permission_description) VALUES('manageProject', 'Permission to Create, Update and Delete Projects');
        INSERT INTO permission(permission_name, permission_description) VALUES('manageTasks', 'Permission to Create, Update and Delete Tasks');
        INSERT INTO permission(permission_name, permission_description) VALUES('viewProject', 'Permission to view Projects');
        INSERT INTO permission(permission_name, permission_description) VALUES('viewTasks', 'Permission to view tasks');
        INSERT INTO permission(permission_name, permission_description) VALUES('manageEmployees', 'Permission to Create, Update and Delete employees');

        INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewTasks'));
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM role_permission;
        DELETE FROM role;
        DELETE FROM permission;
        `)
    }

}

// import { MigrationInterface, QueryRunner } from "typeorm";

// export class RolePermission1714992211482 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`

//         DELETE FROM role_permission;
//         DELETE FROM role;
//         DELETE FROM permission;

//         INSERT INTO role(role_name, role_description) VALUES('employee', 'employee in the organization');
//         INSERT INTO role(role_name, role_description) VALUES('manager', 'manager in the organization');
//         INSERT INTO role(role_name, role_description) VALUES('hr', 'hr in the organization');
       
        
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewEmployee', 'Permission to View Employee Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageEmployee', 'Permission to Manage Employee Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewManager', 'Permission to View Manager Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageManager', 'Permission to Manage Manager Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewHR', 'Permission to View HR Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageHR', 'Permission to Manage HR Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewTasks', 'Permission to View Tasks Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageTasks', 'Permission to Manage Tasks Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageTaskStatus', 'Permission to Manage Tasks Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewProjects', 'Permission to View Projects Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageProjects', 'Permission to Manage Projects Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewBuddies', 'Permission to View Buddies Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageBuddies', 'Permission to Manage Buddies Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewBuddyTasks', 'Permission to View Buddy Tasks Information');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageBuddyTasks', 'Permission to Manage Buddy Tasks Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('manageBuddyTaskStatus', 'Permission to Manage Buddy Tasks Information, including creation, modification, and deletion');
//         INSERT INTO permission(permission_name, permission_description) VALUES('viewTimer', 'Permission to View Timer Information');
      

//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewManager'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewHR'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='manageTaskStatus'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewProjects'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewBuddies'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewBuddyTask'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='manageBuddyTaskStatus'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='employee'), (SELECT id FROM permission WHERE permission_name='viewTimer'));

        
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewManager'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewHR'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewProjects'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='manageProjects'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewBuddies'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='manageBuddies'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='manageTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewBuddyTask'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='manageBuddyTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='manager'), (SELECT id FROM permission WHERE permission_name='viewTimer'));

//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewManager'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='manageManager'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewHR'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='manageHR'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewProjects'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='manageProjects'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewBuddies'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='manageBuddies'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='manageTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewBuddyTask'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='manageBuddyTasks'));
//         INSERT INTO role_permission(role_id, permission_id) VALUES((SELECT id FROM role WHERE role_name='hr'), (SELECT id FROM permission WHERE permission_name='viewTimer'));
//         `)
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`
//         DELETE FROM role_permission;
//         DELETE FROM role;
//         DELETE FROM permission;
//         `)
//     }

// }

