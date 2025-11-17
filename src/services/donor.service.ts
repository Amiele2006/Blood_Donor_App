import { Donor } from "../schemas/entities/donor.entity";
import { AppDataSource } from "../config/data-source";
import { DonorRepository } from '../repository/donor.repository';
import type { CreateDonorRequest, UpdateDonorRequest, DeleteDonorRequest, FindDonorByIdRequest } from "../schemas/requests/donor.request";

//getallusers
export const getAllDonors = async () : Promise<Donor[]> => {
    const donors = await DonorRepository.getAllDonors();

    return donors;
}

export const createDonor = async (data: CreateDonorRequest): Promise<Donor |Donor[]> => {
    const donorRepo = AppDataSource.getRepository(Donor)
    
    const createdDonorEntity = donorRepo.create(data as any);
    const createdDonor = await donorRepo.save(createdDonorEntity)
    if(!createdDonor) {
        throw new Error("Failed to create donor")
    }
    return createdDonor;
}

export const updateDonor = async (userId: string,data:Partial<Donor> ): Promise<Donor> => {

    const donorRepo = AppDataSource.getRepository(Donor)

    const donorToUpdate = await donorRepo.findOne({
        where: {
            user: { user_id: userId}
        }
    })

    if (!donorToUpdate) {
        throw new Error("User not found")
    }

    let processedData : Partial<Donor> = { };
    if (data.next_donation_date) {
        (processedData as any).next_donation_date = new Date(data.next_donation_date);
    }
    // Also handle clinic_id if it's being updated
    if (data.blood_type) {
        (processedData as any).blood_type = data.blood_type as any;
    }

    if (data.status) {
        (processedData as any).status = data.status as any;
    }

    // if (user && user.user_id === data.user_id) {
    //     (processedData as any).user_id = data.user_id as any;
    // }

    donorRepo.merge(donorToUpdate, processedData)
    const updatedDonor = await donorRepo.save(donorToUpdate)

    return updatedDonor;

}

export const deleteDonor = async (userId: string) : Promise<boolean> => {
    const donorRepo = AppDataSource.getRepository(Donor)

    const donorToDelete = await donorRepo.findOne({
        where: {
            user: { user_id: userId}
        }
    })

    if (!donorToDelete) {
        throw new Error("User not found");
    }

    const deletedResult = await donorRepo.remove(donorToDelete);

    return true;

}

export const getADonor = async (userId: string) : Promise<Donor | null> => {
    const donorRepo = AppDataSource.getRepository(Donor)

    const donor = await donorRepo.findOne({
        where: {
            user: { user_id: userId}
        },
        relations: ['user','donations']
    })

    if (!donor) {
        throw new Error("User not found");
    }

    return donor;
}