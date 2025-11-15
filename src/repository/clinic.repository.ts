import { Repository, DeepPartial } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Clinic } from "../schemas/entities/clinic.entity";
import type { CreateClinicRequest } from "../schemas/requests/clinic.request";

const baseRepo = AppDataSource.getRepository(Clinic)

export const ClinicRepository = baseRepo.extend({
    async findClinicByName(this:Repository<Clinic>, clinic_name: string): Promise<Clinic | null> {
        return await this.findOne({ where: {clinic_name}})
    },

    async getAllClinics(this:Repository<Clinic>): Promise<Clinic[]> {
        return await this.find();
    },

    async createClinic(this: Repository<Clinic>, data: CreateClinicRequest): Promise<Clinic | null> {
        const newClinicData: DeepPartial<Clinic> = {
            clinic_name: data.clinic_name,
            registration_number: data.registration_number,
            address: data.address,
            location_id: data.location_id as any,
        };

        const newClinic = this.create(newClinicData)
        return await this.save(newClinic)
    },

    async updateClinic(this: Repository<Clinic>, clinicName: string, updates: Partial<Clinic>): Promise<Clinic | null> {
        const clinic = await this.findOneBy({ clinic_name: clinicName as any});
        if (!clinic) return null;

        this.merge(clinic, updates);
        return await this.save(clinic)
    },

    async deleteClinic(this: Repository<Clinic>, clinicName: string): Promise<boolean> {
        const result = await this.delete({ clinic_name: clinicName as any });
        return result.affected !== 0;
    }
})