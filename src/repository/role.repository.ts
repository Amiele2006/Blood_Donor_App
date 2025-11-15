import { Repository, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Role } from "../schemas/entities/role.entity";
import type { CreateRoleRequest } from "../schemas/requests/role.request"; //request 

const baseRepo = AppDataSource.getRepository(Role)

export const RoleRepository = baseRepo.extend({

    //create roles
    async createRole(data: CreateRoleRequest): Promise<Role> {
        const newRoleData: DeepPartial<Role> = {
            // role_id: data.role_id as any,
            role_name: data.role_name,
            role_description: data.role_description,
            permissions: data.permissions,
        }

        const newRole = this.create(newRoleData);
        return await this.save(newRole);
    },

    //find role by name
    async findByRoleName(this:Repository<Role>, roleName:string): Promise<Role | null> {
        return await this.findOneBy({ role_name: roleName as any});
    },

    //getAllRoles
    async getAllRoles(this:Repository<Role>): Promise<Role[]> {
        return await this.find();
    },

    //update role details
    async updateRole(this:Repository<Role>, roleName:string, updates:Partial<Role>): Promise<Role | null> {
        const role = await this.findOne({  where: { role_name: roleName as any } });
        if(!role) return null;

        //merge data together
        this.merge(role, updates);

        //save updates
        return await this.save(role);
    },

    //delete a role 
    async deleteRole(this:Repository<Role>, roleName: string): Promise<boolean> {
        const result = await this.delete({ role_name: roleName as any})
        return result.affected !== 0;
    },

});