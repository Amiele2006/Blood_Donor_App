import { Request, Response } from 'express';
import * as AdminService from "../services/admin.service";
import { AdminRepository } from '../repository/admin.repository';
import { CreateAdminRequest, UpdateAdminRequest } from "../schemas/requests/admin.request";
import { AdminResponse } from "../schemas/responses/admin.response";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

//getalladmins
export const handleGetAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminService.getAllAdmins();
        res.status(200).json({
            message: "Successfully fetched admins",
            data: admins
        });
    } catch (error) {
        res.status(500).json({
            message: "Erorr fetching admins",
            error: (error as Error).message
        })
    }
}

//create admin
export const handleCreateAdmin = async (req:Request, res:Response) => {
    try {
        const createAdminRequest = plainToInstance(CreateAdminRequest, req.body);// convert plain request to classes
        const errors = await validate(createAdminRequest) // run validators: isemaial, minlength;

        if (errors.length > 0) {
            return  res.status(400).json({
                message: "Validation failed", //validate values
                errors: errors,
            })
        }

        // const userIdFromUserTable = "some-uuid-from-a-user"; // Get the User's ID
        // const clinicIdFromRequest = clinicId; // Get the clilnic's ID
        const newAdmin = await AdminService.createAdmin(createAdminRequest);

        const adminResponse = plainToInstance(AdminResponse, newAdmin, {
            excludeExtraneousValues: true, //transform outgoing data
        })

        return res.status(201).json({
            message: "Admin created successfully",
            data: adminResponse, // created admin
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating user", // handles other errors
            error: (error as Error).message,
        });
    }
}

//update admin
export const handleUpdateAdmin = async (req:Request, res:Response) => {
    try {
        const {user_id} = req.params;
        if (!user_id) {
            return res.status(400).json({
                message: "User id is required",
            });
        }

        const updateAdminRequest = plainToInstance(UpdateAdminRequest, req.body);
        const errors = await validate(updateAdminRequest)
            
        if (errors.length > 0) {
            return  res.status(400).json({
                message: "Validation failed", //validate values
                errors: errors,
            })
        }

        // convert the request to a plain payload compatible with Partial<Admin>
        const payload: any = { ...updateAdminRequest as any };
        if (payload.hiring_date && typeof payload.hiring_date === 'string') {
            payload.hiring_date = new Date(payload.hiring_date);
        }

        const updateAdmin = await AdminService.updateAdmin(user_id, payload);

        const adminResponse = plainToInstance(AdminResponse, updateAdmin, {
            excludeExtraneousValues: true, //transform outgoing data
        })

        return res.status(201).json({
            message: "Admin updated successfully",
            data: adminResponse, // updated admin
        });


    } catch(error) {
        return res.status(500).json({
            message: "Error updating Admin, Admin not found",
            error: (error as Error).message,
        })
    }
}

//delete admin
export const handleDeleteAdmin = async (req: Request, res: Response) => {
    try {
        const {user_id} = req.params;
        if(!user_id) {
            return res.status(400).json({
                message: "User id is required",
            });
        }

        const deletedAdmin = await AdminService.deleteadmin(user_id)

        if (!deletedAdmin) {
           throw new Error("Admin was not deleted");
        }

        return res.status(200).json({
            message: "Admin deleted successfully",
            // data: deletedUser, // deleted user
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        const statusCode = errorMessage === "Admin not found" ? 404 : 500;

        return res.status(statusCode).json({
            message: "Error deleting Admin",
            error: errorMessage,
        }) 
    }
}