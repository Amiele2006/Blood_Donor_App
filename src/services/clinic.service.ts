import { AppDataSource } from "../config/data-source";
import { Clinic } from "../schemas/entities/clinic.entity";
import { ClinicRepository } from '../repository/clinic.repository';
import type { CreateClinicRequest, UpdateClinicRequest, DeleteClinicRequest, FindClinicByNameRequest } from "../schemas/requests/clinic.request";

//get all clinics
export const getAllClinics = async () : Promise<Clinic[]> => {
    const clinics = await ClinicRepository.getAllClinics()

    return clinics
}

//findbyname
export const findClinicByName = async (clinic_name: string, data?:FindClinicByNameRequest): Promise<Clinic> => {
    const clinicToBeFound = await ClinicRepository.preload({
        clinic_name: clinic_name,
    })
    if (!clinicToBeFound) {
        throw new Error("Clinic not found")
    }

    return clinicToBeFound
}

//create new clinic
export const createClinic = async (data: CreateClinicRequest): Promise<Clinic> => {
    const createdClinic = await ClinicRepository.createClinic(data);
    if(!createdClinic) {
        throw new Error("Failed to create clinic")        
    }
    return createdClinic
}

//update clinic details
export const updateClinic = async (clinic_name: string, data: UpdateClinicRequest): Promise<Clinic> => {
    const clinicToUpdate = await ClinicRepository.preload({
        clinic_name: clinic_name,
        ...data,
    }); // data needed for the service

    if (!clinicToUpdate) {
        throw new Error("Clinic not found") //edge case 
    }

    const updatedClinic = await ClinicRepository.save(clinicToUpdate);

    return updatedClinic ;
}