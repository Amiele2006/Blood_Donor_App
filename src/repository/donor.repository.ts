import { Repository, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Donor } from "../schemas/entities/donor.entity";
import type { CreateDonorRequest } from "../schemas/requests/donor.request"; 

const baseRepo = AppDataSource.getRepository(Donor)

export const DonorRepository = baseRepo.extend({
    async createDonor(this: Repository<Donor>, data: CreateDonorRequest): Promise<Donor> {
        const newDonorData = {
        ...data,
        blood_type: Array.isArray(data.blood_type) ? data.blood_type.join(",") : data.blood_type,
        next_donation_date: new Date(data.next_donation_date),
    } ;

    const newDonor = this.create(newDonorData as DeepPartial<Donor>);
    const saved = await this.save(newDonor);
    // const saved = Array.isArray(savedResult) ? savedResult[0] : savedResult;
    return saved;
    },

    //get all users
    async getAllDonors(this:Repository<Donor>): Promise<Donor[]> {
        return await this.find();
    },

    async updateDonor(this:Repository<Donor>, donorId: string, updates: Partial<Donor>): Promise<Donor | null> {
        const donor = await this.findOneBy({ donor_id: donorId } as any);
        if (!donor) return null

        this.merge(donor,updates);
        return await this.save(donor)
    },

    async deleteDonor(this:Repository<Donor>, userId: string): Promise<boolean> {
        const result = await this.delete({ user: { user_id: userId } as any})
        return result.affected !== 0
    },

    async getADonor(this:Repository<Donor>, userId: string): Promise<Donor |null > {
        const donor = await this.findOneBy({ user: { user_id: userId } as any});
        if(donor) return null

        return donor
    }

})