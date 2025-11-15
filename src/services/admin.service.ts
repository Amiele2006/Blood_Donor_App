import { AppDataSource } from "../config/data-source";
import { Admin } from "../schemas/entities/admin.entity";
import type { CreateAdminRequest, DeleteAdminRequest } from "../schemas/requests/admin.request";

//getallusers
export const getAllAdmins = async () : Promise<Admin[]> => {
    const repo = AppDataSource.getRepository(Admin);
    const admins = await repo.find();

    return admins;
}

export const createAdmin = async (data: CreateAdminRequest): Promise<Admin> => {
    const adminRepo = AppDataSource.getRepository(Admin);

    // ensure hiring_date (if provided) is converted from string to Date to match the Admin entity
    const payload: Partial<Admin> = {
        ...(data as unknown as Partial<Admin>),
        ...((data as any)?.hiring_date ? { hiring_date: new Date((data as any).hiring_date) } : {}),
        user: data.user_id as any,
        clinic: data.clinic_id as any
    };

    const adminEntity = adminRepo.create(payload);
    const createdAdmin = await adminRepo.save(adminEntity);

    if(!createdAdmin) {
        throw new Error("Failed to create an admin")        
    }
    return createdAdmin;
}

export const updateAdmin = async (id: string, data: Partial<Admin>): Promise<Admin> => {
    const repo = AppDataSource.getRepository(Admin);

    // attempt to find by user_id (adjus  t if your primary key is different)
    const adminToUpdate = await repo.findOne({
        where: {
            user: { user_id: id }
        }, 
        relations: ['user', 'clinic']
    });

    if (!adminToUpdate) {
        throw new Error("Admin not found")
    }

    // Convert string dates to Date objects before merging
    let processedData : Partial<Admin> = { };
    if (data.hiring_date) {
        (processedData as any).hiring_date = new Date(data.hiring_date);
    }
    // Also handle clinic_id if it's being updated
    if (data.clinic) {
        (processedData as any).clinic = data.clinic as any;
    }

    repo.merge(adminToUpdate, processedData);
    const updatedAdmin = await repo.save(adminToUpdate);

    return updatedAdmin;
}

export const deleteadmin = async (id:string, data?: DeleteAdminRequest): Promise<boolean> => {
    const repo = AppDataSource.getRepository(Admin);

    // find the admin first (you can also call delete directly if you prefer)
    const adminToDelete = await repo.findOne({
        where: { user: { user_id: id } },
        relations: ['user'] //must include relations
    });

    if(!adminToDelete) {
        throw new Error("Admin not found")
    }

    const deletedResult = await repo.remove(adminToDelete);

    return true;
}