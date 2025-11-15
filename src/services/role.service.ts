import { AppDataSource } from "../config/data-source";
import { Role } from "../schemas/entities/role.entity";
import { RoleRepository } from '../repository/role.repository';
import type { CreateRoleRequest, UpdateRoleRequest, DeleteRoleRequest, FindByRoleNameRequest } from "../schemas/requests/role.request";


//getallroles
export const getAllRoles = async (): Promise<Role[]> => {
    const roles = await RoleRepository.getAllRoles();
    return roles;
}

//findbyrolename
export const findByRoleName = async (role_name: string, data?: FindByRoleNameRequest): Promise<Role> => {
    const roleToBeFound = await RoleRepository.preload({
        role_name: role_name,
    });
    if (!roleToBeFound) {
        throw new Error("Role not found")
    }

    return roleToBeFound;
}

//createrole
export const createRole = async (data: CreateRoleRequest): Promise<Role> => {
    const roleRepo = AppDataSource.getRepository(Role);
    const existingRole = await roleRepo.findOne({ where: { role_name: data.role_name } });
    if (existingRole) {
        const err = new Error("Role already exists");
        (err as any).status = 409;
        throw err;
    }
    const newRoleEntity = roleRepo.create(data as any);
    const newRole = await roleRepo.save(newRoleEntity);

    if (Array.isArray(newRole)) {
        return newRole[0]!;
    }
    return newRole;
}

//update role
export const updateRole = async(role_name:string, data: UpdateRoleRequest, roleRepo: typeof RoleRepository): Promise<Role> => {
    // const roleToUpdate = await roleRepo.preload({
    //     role_name: role_name,
    //     ...data,
    // });
    const roleToUpdate = await roleRepo.findOne({
        where: { role_name }
    });
    // console.log(roleToUpdate)

    if (!roleToUpdate) {
        throw new Error("Role not found")
    }

    if(data.role_name !== null) {
        roleToUpdate.role_name = data.role_name ?? roleToUpdate.role_name;
    }

    if(data.role_description !== null) {
        roleToUpdate.role_description = data.role_description ?? roleToUpdate.role_description;
    }

    if(data.permissions !== null && Array.isArray(data.permissions)) {
        // roleToUpdate.permissions = data.permissions ?? roleToUpdate.permissions;
        //merge existing permissions with new ones
        roleToUpdate.permissions = [
            ...new Set([ ...roleToUpdate.permissions, ...data.permissions]),
        ];
    } //"view_own_profile","view_own_appointments","edit_own_profile","view_donation_history"

//FOR THE MANY TO MANY RELATIONS
// if (data.permissions && Array.isArray(data.permissions)) {
//   const permissionRepo = AppDataSource.getRepository(Permission);
  
//   // Fetch the new permissions by IDs
//   const newPermissions = await permissionRepo.findByIds(data.permissions);

//   // Merge with existing ones
//   roleToUpdate.permissions = [
//     ...roleToUpdate.permissions,
//     ...newPermissions.filter(p => !roleToUpdate.permissions.some(ep => ep.id === p.id))
//   ];
// }

// await roleRepo.save(roleToUpdate);

// if roletoupdate is not null, roletoupdate.role_name = data.role_name assign the data files to it 
    const updatedrole = await roleRepo.save(roleToUpdate);

    return updatedrole;
}

//delete role
export const deleterole = async (role_name: string,roleRepo: typeof RoleRepository, data?: DeleteRoleRequest): Promise<boolean> => {
    const roleToDelete = await roleRepo.findOne({ where: { role_name }})

    if(!roleToDelete) {
        throw new Error("Role not found");
    }

    const deletedRole = await roleRepo.delete({ role_name }); //roleToDelete.id

    return (deletedRole?.affected ?? 0) !== 0; //should return true if deleted
}