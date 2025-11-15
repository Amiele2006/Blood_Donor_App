import { Request, Response } from 'express';
//  
// import { Role } from '../schemas/entities/role.entity';
import { UserRepository } from '../repository/user.repository';
import { RoleRepository } from '../repository/role.repository';
import * as UserService from "../services/user.service";
import { CreateUserRequest, UpdateUserRequest } from "../schemas/requests/user.request";
import { UserResponse } from "../schemas/responses/user.response";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// const MainUserRepository = new UserRepository(AppDataSource); 
// const MainRoleRepository = AppDataSource.getRepository(Role);

//getallusers
export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json({
            message: "Successfully fetched users",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Erorr fetching users",
            error: (error as Error).message
        })
    }
}


//create new user
export const handleCreateUser = async (req:Request, res:Response) => {
    try {
        const createUserRequest = plainToInstance(CreateUserRequest, req.body);// convert plain request to classes
        const errors = await validate(createUserRequest) // run validators: isemaial, minlength;

        if (errors.length > 0) {
            return  res.status(400).json({
                message: "Validation failed", //validate values
                errors: errors,
            })
        }

       const newUser = await UserService.createNewUser(createUserRequest, UserRepository, RoleRepository);

        const userResponse = plainToInstance(UserResponse, newUser, {
            excludeExtraneousValues: true, //transform outgoing data
        })

        return res.status(201).json({
            message: "User created successfully",
            data: userResponse, // created user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creating user", // handles other errors
            error: (error as Error).message,
        });
    }
}

//update a user
export const handleUpdateUser = async (req:Request, res:Response) => {
    try {
        const {user_id} = req.params;
        if (!user_id) {
            return res.status(400).json({
                message: "User id is required",
            });
        }

        const updateUserRequest = plainToInstance(UpdateUserRequest, req.body);
        const errors = await validate(updateUserRequest)
            
        if (errors.length > 0) {
            return  res.status(400).json({
                message: "Validation failed", //validate values
                errors: errors,
            })
        }

        const updateUser = await UserService.updateuser(user_id, updateUserRequest, UserRepository);

        const userResponse = plainToInstance(UserResponse, updateUser, {
            excludeExtraneousValues: true, //transform outgoing data
        })

        return res.status(201).json({
            message: "User updated successfully",
            data: userResponse, // updated user
        });


    } catch(error) {
        const errorMessage = (error as Error).message;
        const statusCode = errorMessage === "User not found" ? 404 : 500;

        return res.status(statusCode).json({
            message: "Error updating User",
            error: errorMessage,
        })
    }
}

//delete user
export const handleDeleteUser = async (req: Request, res: Response) => {
    try {
        const {user_id} = req.params;
        if(!user_id) {
            return res.status(400).json({
                message: "User id is required",
            });
        }

        const deletedUser = await UserService.deleteuser(user_id, UserRepository)

        if (!deletedUser) {
           throw new Error("User was not deleted");
        }

        return res.status(200).json({
            message: "User deleted successfully",
            // data: deletedUser, // deleted user
        });
    } catch(error) {
        const errorMessage = (error as Error).message;
        const statusCode = errorMessage === "User not found" ? 404 : 500;

        return res.status(statusCode).json({
            message: "Error deleting User",
            error: errorMessage,
        }) 
    }
}