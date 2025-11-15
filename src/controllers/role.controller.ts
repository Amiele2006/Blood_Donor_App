import { Request, Response } from 'express';
import * as RoleService from "../services/role.service";
import { RoleRepository } from '../repository/role.repository';
import { CreateRoleRequest, UpdateRoleRequest } from "../schemas/requests/role.request";
import { RoleResponse } from "../schemas/responses/role.response";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// create new role
export const handleCreateRole = async(req:Request, res:Response) => {
    try {
        const createRoleRequest = plainToInstance(CreateRoleRequest, req.body);
        const errors = await validate(createRoleRequest)

        if(errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors,
            })
        }

        // call the service to create a new role
        const newRole: RoleResponse = await RoleService.createRole(createRoleRequest);

        return res.status(201).json({
            message: "Role created successfully",
            data: newRole,
        });
        
    } catch (error: any) {

    if (error.message.includes('already exists')) {
      // If so, send a 409 Conflict
      return res.status(409).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
    }
}

//get all roles
export const handleGetAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await RoleService.getAllRoles();
        res.status(200).json({
            message: "Sucessfully fetched roles",
            data: roles
        });
    } catch(error) {
        res.status(500).json({
            messaeg: "Error fetching roles",
            error: (error as Error).message
        })
    }
}

//update a role details 
export const handleUpdateRole = async (req:Request, res: Response) => {
    try {
        const {role_name} = req.params;
        if (!role_name) {
            return res.status(400).json({
                message: "Role name is required",
            });
        }

        const updateRoleRequest = plainToInstance(UpdateRoleRequest, req.body);
        const errors = await validate(updateRoleRequest)

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors,
            })
        }

        const updatedRole = await RoleService.updateRole(role_name, updateRoleRequest, RoleRepository);

        const roleResponse = plainToInstance(RoleResponse, updatedRole, {
            excludeExtraneousValues: true, //transform outgoing data
        })

        return res.status(201).json({
            message: "Role Updated successfully",
            data: roleResponse, //updated role
        })
    } catch(error) {
        console.error(error)
        const errorMessage = (error as Error).message;
        const statusCode = errorMessage === "Role not found" ? 404 : 500;

        return res.status(statusCode).json({
            message: "Error updating Role",
            error: errorMessage,
        });;
    }
}

//delete role
export const handleDeleteRole = async (req: Request, res: Response) => {
    try {
        const {role_name} = req.params;
        if(!role_name) {
            return res.status(400).json({
                message: "Roole name is required",
            });
        }

        const deletedRole = await RoleService.deleterole(role_name, RoleRepository)

        if (!deletedRole) {
           throw new Error("Role was not deleted");
        }

        return res.status(200).json({
            message: "Role deleted successfully",
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        const statusCode = errorMessage === "Role not found" ? 404 : 500;

        return res.status(statusCode).json({
            message: "Error deleting Role",
            error: errorMessage,
        }) 
    }
}