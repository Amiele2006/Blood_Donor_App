import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "../schemas/entities/user.entity";
// import { Role } from "../schemas/entities/role.entity";
// import { Donor } from "../schemas/entities/donor.entity";
// import { Admin } from "../schemas/entities/admin.entity";
// import { Donations } from "../schemas/entities/donations.entity";
// import { Clinic } from "../schemas/entities/clinic.entity";

import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST) throw new Error('Missing environment variable: DB_HOST');
if (!DB_PORT) throw new Error('Missing environment variable: DB_PORT');
if (!DB_USERNAME) throw new Error('Missing environment variable: DB_USERNAME');
if (!DB_PASSWORD) throw new Error('Missing environment variable: DB_PASSWORD');
if (!DB_NAME) throw new Error('Missing environment variable: DB_NAME');

// console.log("--- DATABASE CONNECTION ATTEMPT ---");
// console.log(`Host: ${DB_HOST}`);
// console.log(`Port: ${DB_PORT}`);
// console.log(`User: ${DB_USERNAME}`);
// console.log(`Database: ${DB_NAME}`);
// console.log("-----------------------------------");

export const AppDataSource = new DataSource({
    // Database Driver
    type: "postgres", //Database type

    //Database connections

    host:process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'secrestpassword',
    database: process.env.DB_NAME ?? 'dbname',

    //TypeORM Settings

    logging:true,

    // Entity Loading

    entities: [
        "src/schemas/entities/**/*.entity.ts"
    ],

    synchronize: true, // turn false in production
    migrations: [],
    subscribers: [],
});                                                                                                                                                                                                                                                                                                                                                