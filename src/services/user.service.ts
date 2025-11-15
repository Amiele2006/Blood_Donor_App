import { User } from "../schemas/entities/user.entity";
import { UserRepository } from '../repository/user.repository';
import { RoleRepository } from '../repository/role.repository';
import type { CreateUserRequest, UpdateUserRequest, DeleteUserRequest, FindByIdRequest } from "../schemas/requests/user.request";
import * as bcrypt from 'bcryptjs';

//getallusers
export const getAllUsers = async () : Promise<User[]> => {
    const users = await UserRepository.getAllUsers();

    return users;
}

//findbyid
export const findById = async (user_id:string, data?: FindByIdRequest): Promise<User> => {
    const userToBeFound = await UserRepository.preload({
        user_id:user_id,
    });
    if (!userToBeFound) {
        throw new Error("User not found") //edge case 
    }

    return userToBeFound;

}

//create new user
export const createNewUser = async (data: CreateUserRequest, userRepo: typeof UserRepository, roleRepo: typeof RoleRepository): Promise<User> => {
    const hashedPassword = await bcrypt.hash(data.password, 10);// hash password
    const datahashed = {
        ...data,
        password: hashedPassword, //prepare data for repository
    };
    const role = await roleRepo.findOne({where: { role_name: data.role_name } });
    
    if(!role) {
        throw new Error(`Role with name ${data.role_name} not found`)
    }
    const createdUser = await userRepo.createUser(datahashed, role.role_name); //push to repository
    if (!createdUser) {
        throw new Error("Failed to create user");
    }
    return createdUser;
};

//update user
export const updateuser = async (user_id: string, data: UpdateUserRequest, userRepo: typeof UserRepository): Promise<User> => {
    const userToUpdate = await userRepo.preload({
        user_id: user_id,
        ...data,
    }); // data needed for the service

    if (!userToUpdate) {
        throw new Error("User not found") //edge case 
    }

    const updatedUser = await userRepo.save(userToUpdate);

    return updatedUser;
}

//delete user
export const deleteuser = async (user_id: string,userRepo: typeof UserRepository, data?: DeleteUserRequest): Promise<boolean> => {
    const userToDelete = await userRepo.findOne({ where: { user_id }})

    if(!userToDelete) {
        throw new Error("User not found");
    }

    const deletedUser = await userRepo.delete(user_id);

    return (deletedUser?.affected ?? 0) !== 0; //should return true if deleted
}

