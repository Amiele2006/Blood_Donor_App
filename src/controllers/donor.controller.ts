import { Request, Response } from 'express';
import * as DonorService from "../services/donor.service";
import { CreateDonorRequest  } from "../schemas/requests/donor.request";
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