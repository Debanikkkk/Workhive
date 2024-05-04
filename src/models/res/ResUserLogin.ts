import { ResBranch } from './ResBranch';
import { ResDepartment } from './ResDepartment';
import { ResPermission } from './ResPermission';

interface UserLoginCompany {
  id: number;
  name: string;
  logo_url: string;
}
interface UserLoginRole {
  id: number;
  role_name: string;
  role_description: string;
}
export interface ResUserLogin {
  // roles: ResRole;
  name: string;
  company: UserLoginCompany;
  branch: ResBranch;
  department: ResDepartment,
  permissions?: ResPermission[];
  role: UserLoginRole;
  token?: string;
}
