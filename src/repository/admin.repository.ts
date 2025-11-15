import { Repository, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../schemas/entities/admin.entity";
import type { CreateAdminRequest } from "../schemas/requests/admin.request";

const baseRepo = AppDataSource.getRepository(Admin)

export const AdminRepository = baseRepo.extend({
    //create admins
    async createAdmin(this: Repository<Admin>, data: CreateAdminRequest): Promise<Admin | null> {
        const newAdminData: DeepPartial<Admin> = {
            hiring_date: data.hiring_date,
            user: { user_id: data.user_id } as any,
            clinic: { clinic_id: data.clinic_id } as any,
        }
        const newAdmin = this.create(newAdminData);
        return await this.save(newAdmin);
    },

    //get all users
    async getAllAdmins(this:Repository<Admin>): Promise<Admin[]> {
        return await this.find();
    },

    //update admin details
    async updateAdmin(this: Repository<Admin>, adminId: number, updates: Partial<Admin>): Promise<Admin | null> {
        const admin = await this.findOneBy({ admin_id: adminId } as any);
        if (!admin) return null;

        this.merge(admin, updates);
        return await this.save(admin);
    },

    //delete admin
    async deleteAdmin(this: Repository<Admin>, userId: string): Promise<boolean> {
        const result = await this.delete({ user: { user_id: userId } as any});
        return result.affected !== 0;
    }
})