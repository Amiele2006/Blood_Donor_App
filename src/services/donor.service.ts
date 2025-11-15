import { Donor } from "../schemas/entities/donor.entity";
import { AppDataSource } from "../config/data-source";
import { DonorRepository } from '../repository/donor.repository';
import type { CreateDonorRequest, UpdateDonorRequest, DeleteDonorRequest, FindDonorByIdRequest } from "../schemas/requests/donor.request";

//getallusers
export const getAllDonors = async () : Promise<Donor[]> => {
    const donors = await DonorRepository.getAllDonors();

    return donors;
}

export const createDonor = async (data: CreateDonorRequest): Promise<Donor> => {
    const donorRepo = AppDataSource.getRepository(Donor)
    
    const createdDonorEntity = donorRepo.create(data as any);
    const createdDonor = await donorRepo.save(createdDonorEntity)
    if(!createdDonor) {
        throw new Error("Failed to create donor")
    }
    return createdDonor;
}

export const updateDonor = async (userId: string,data:Partial<Donor> ): Promise<Donor> {
    const donorToUpdate = await findOne({
        where: {
            user: { user_id: userId}
        }
    })
}