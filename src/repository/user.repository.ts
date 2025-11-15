import { Repository, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { User } from "../schemas/entities/user.entity";
import type { CreateUserRequest } from "../schemas/requests/user.request"; //request 

const baseRepo = AppDataSource.getRepository(User)

export const UserRepository = baseRepo.extend({
    //find user by email
    async findByEmail(this:Repository<User>, email: string): Promise<User | null>{
        return await this.findOne({where: {email}})
    },

    //find user by id
    async findById(this:Repository<User>, userId:number): Promise<User | null> {
        return await this.findOneBy({ user_id: userId as any });
    },

    //create and save a new user
    async createUser(this: Repository<User>, data: CreateUserRequest, roleName: string): Promise<User| null> {
        // use DeepPartial<User> to satisfy Repository.create signature and map request to entity fields
        const newUserData: DeepPartial<User> = {
          role_name: roleName, // Properly structure the role relationship
          first_name: data.first_name,
          last_name: data.last_name,
          dob: new Date(data.dob), // Convert to Date object
          email: data.email,
          password: data.password,
        };

        const newUser = this.create(newUserData);
        return await this.save(newUser);
    },

    //get all users:done and tested
    async getAllUsers(this:Repository<User>): Promise<User[]> {
        return await this.find();
    },

    //update a user's details 
    //request as well
    async updateUser(
        this: Repository<User>,
        userId:string,
        updates: Partial<User>,
    ) : Promise<User | null> {
        // map to actual entity primary column name
        const user = await this.findOneBy({ user_id: userId as any });
        if(!user) return null;

        //merge data together
        this.merge(user, updates);

        //save updates
        return await this.save(user)
    },

    //delete user by ID
    async deleteUser(this: Repository<User>, userId: string): Promise<boolean> {
       const result = await this.delete({ user_id: userId as any });
       return result.affected !== 0; // should be true if user was deleted
    }
})

// export function findByName(name: any) {
//     throw new Error("Function not implemented.");
// }
