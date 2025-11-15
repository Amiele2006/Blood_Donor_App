// console.log("i love you")
import "reflect-metadata";
import express, { Express } from 'express'; // do npm i @types/express for typescript
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import userRoutes from './routers/user.routes';
import roleRoutes from './routers/role.routes';
import adminRoutes from './routers/admin.routes';

//initializing
const app: Express = express()
app.use(express.json());
const PORT = process.env.PORT || 3000

//define async func
const startServer = async () => {
    try {
        //connecting to database using typeorm
        await AppDataSource.initialize();

        console.log("Data Source has been initialized");
        console.log("Successfully connected to PostgreSQL with TypeORM!");

        //adding routes

        //adding middleware
        app.use(express.json())

        app.use('/api/v1/users', userRoutes);
        app.use('/api/v1/roles', roleRoutes); // Add role routes
        app.use('/api/v1/admins', adminRoutes); //add admin routes

        app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
} catch (error) {
    //catch and log any startup errors
    console.error("Failed to start the server or initialize data source");
    console.error(error)
    process.exit(1)
}
}

startServer()