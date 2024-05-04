import { Controller, Delete, Get, Path, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
// import { Role } from '../entity/Role';
import { Time } from '../entity/Time';
import { Role } from 'entity/Role';
import { ResRole } from 'src/models/res/ResRole';
import { ResPermission } from 'src/models/res/ResPermission';
@Tags('Role')
@Route('/role')
export class RoleController extends Controller {
    private rolerepository = AppDataSource.getRepository(Role);

    @Delete('/{roleId}')
    public async deleteRole(@Path() roleId: number) {
        const roleToDelete = await this.rolerepository.findOne({
            where: {
                id: roleId,
            },
        });
        if (!roleToDelete) {
            return Promise.reject(new Error('ROLE NOT FOUND'));
        }

        await this.rolerepository.remove(roleToDelete);
        return Promise.resolve({ result: 'success' });
    }

    @Get()
    public async getAllRoles(): Promise<ResRole[]> {
        const roles = await this.rolerepository.find()
        if (!roles) {
            Promise.reject(new Error('NOT FOUND'))

        }

        const roleArr: Role[] = []
        for (const role of roles) {
            const perm = role.permissions;
            const permsArr: ResPermission[] = [];
            perm?.forEach((perm) => {
                const permToresperm: ResPermission = {
                    id: perm.id,
                    permission_name: perm.permissionName,
                    permission_description: perm.permissionDescription,
                };
                permsArr.push(permToresperm);
            });
            roleArr.push({
                id: role.id,
                roleDescription: role.roleDescription,
                roleName: role.roleName,
                permissions: permsArr
            })
        }

        return roleArr
    }
}
