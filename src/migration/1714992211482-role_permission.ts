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
