import { Request, Response } from 'express';
import * as DonorService from "../services/donor.service";
import { CreateDonorRequest, UpdateDonorRequest, DeleteDonorRequest, FindDonorByIdRequest  } from "../schemas/requests/donor.request";
import { DonorResponse } from "../schemas/responses/donor.response";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

//getallusers
export const handleGetAllDonors = async (req: Request, res: Response) => {
    try {
        const donors = await DonorService.getAllDonors();
        res.status(200).json({
            message: "Successfully fetched donors",
            data: donors,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching donors",
            error: (error as Error).message
        })
    }
}

//create new user
export const handleCreateDonor = async (req:Request, res:Response) => {
    try {
        const createDonorRequest = plainToInstance(CreateDonorRequest, req.body);// convert plain request to classes
        const errors = await validate(createDonorRequest) // run validators: isemaial, minlength;

        if (errors.length > 0) {
            return  res.status(400).json({
                message: "Validation failed", //validate values
                errors: errors,
            })
        }

       const newDonor = await DonorService.createDonor(createDonorRequest);

        const donorResponse = plainToInstance(DonorResponse, newDonor, {
            excludeExtraneousValues: true, //transform outgoing data
        })

        return res.status(201).json({
            message: "User created successfully",
            data: donorResponse, // created user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating donor", // handles other errors
            error: (error as Error).message,
        });
    }
}

//update Donor
export const handleUpdateDonor = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        if(!user_id) {
            return res.status(400).json({
                message: "Donor is required",
            })
        }

        const updateDonorRequest = plainToInstance(UpdateDonorRequest, req.body);
        const errors = await validate(updateDonorRequest);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors,
            })
        }

        //convert payload to plain payload compatible to partial donor
        // const payload: any = { ...updateDonorRequest as any };
        // if (payload.next_donation_date && typeof payload.next_donation_date === 'string') {
        //     payload.next_donation_date = new Date(payload.next_donation_date);
        // }

        const updateDonor = await DonorService.getADonor(user_id);

        const donorResponse = plainToInstance(DonorResponse, updateDonor,{
            excludeExtraneousValues: true,
        })

        return res.status(201).json({
            message: "Admin updated sucessfully",
            data: donorResponse,
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error updating Admin, Admin not found",
            error: (error as Error).message
        })
    }
}

//delete donor
export const handleDeleteDonor = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(404).json({
                message: "User id is required"
            })
        }

        const deletedDonor = await DonorService.deleteDonor(user_id);

        if (!deletedDonor) {
            throw new Error(" Donor was not deleted")
        }

        return res.status(200).json({
            message: "Donor was deleted successfully"
        });
    } catch (error) {
        const errorMessage = (error as Error).message;
        const statusCode = errorMessage === "Admin not found" ? 404 : 500;

        return res.status(statusCode).json({
            message: "Error deleting Admin",
            error: errorMessage,
        }) 
    }
}

//get a donor
export const handleGetADonor = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({
                message: "User id is required"
            })
        }

        const getaDonor = await DonorService.getADonor(user_id)

        if (!getaDonor) {
            throw new Error("Donor was not found")
        }

        return res.status(200).json({
            message: "Donor retrieved successfully",
            data: getaDonor,
        })
    } catch(error) {
        return res.status(500).json({
            message: "Error geeting Donor, Donor was not found",
            error: (error as Error).message,
        })
    }
}