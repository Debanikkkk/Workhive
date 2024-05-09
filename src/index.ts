// import express, { NextFunction } from 'express';
// import * as bodyParser from 'body-parser';
// import { Request, Response } from 'express';
// import 'reflect-metadata';
// import { AppDataSource } from './data-source';
// // import { Routes } from './routes';
// import { envs } from './utils/envVars';
// import cors = require('cors');
// import { RegisterRoutes } from './tsoa-auto/routes';
// import swaggerUi from 'swagger-ui-express';
// import { ValidateError } from 'tsoa';
// import swaggerJson from './tsoa-auto/swagger.json';
// // import { ResponseError } from 'models/res/ResErrors';
// import { ResponseError } from './models/res/ResErrors';

// AppDataSource.initialize()
//     .then(async () => {
//         AppDataSource.runMigrations({ transaction: 'each' });

//         // create express app
//         const app = express();

//         // Add a list of allowed origins.
//         // If you have more origins you would like to add, you can add them to the array below.
//         const allowedOrigins = envs.CORS_ALLOWED_ORIGINS;

//         const options: cors.CorsOptions = {
//             origin: allowedOrigins,
//         };

//         app.use(cors(options));
//         app.use(bodyParser.json());

//         app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
//             return res.send(swaggerUi.generateHTML(swaggerJson));
//         });

//         // app.use("/oem", oemRouter);
//         RegisterRoutes(app);

//         app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
//             if (err instanceof ValidateError) {
//                 console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
//                 return res.status(422).json({
//                     message: 'Validation Failed',
//                     details: err?.fields,
//                 });
//             }
//             if (err instanceof ResponseError) {
//                 return res.status(err.statusCode).json({
//                     message: err.message,
//                 });
//             }
//             if (err instanceof Error) {
//                 console.log('Internal Server Error: ', err);
//                 return res.status(500).json({
//                     message: 'Internal Server Error',
//                 });
//             }

//             next();
//         });

//         // register express routes from defined application routes
//         // Routes.forEach((route) => {
//         //   (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         //     const result = new (route.controller as any)()[route.action](req, res, next);
//         //     if (result instanceof Promise) {
//         //       result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
//         //     } else if (result !== null && result !== undefined) {
//         //       res.json(result);
//         //     }
//         //   });
//         // });

//         // setup express app here
//         // ...

//         // start express server
//         app.listen(envs.PORT);

//         console.log('Express server has started on port', envs.PORT);
//     })
//     .catch((error) => console.log(error));

import express, { NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { envs } from './utils/envVars';
import cors = require('cors');
import { RegisterRoutes } from './tsoa-auto/routes';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import swaggerJson from './tsoa-auto/swagger.json';
import { ResponseError } from './models/res/ResErrors';

AppDataSource.initialize()
    .then(async () => {
        AppDataSource.runMigrations({ transaction: 'each' });

        // create express app
        const app = express();

        // Add a list of allowed origins.
        // If you have more origins you would like to add, you can add them to the array below.
        // const allowedOrigins = envs.CORS_ALLOWED_ORIGINS;
        const allowedOrigins =[...envs.CORS_ALLOWED_ORIGINS, 'http://localhost:3001'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins,
        };

        app.use(cors(options));
        app.use(bodyParser.json());

        app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
            return res.send(swaggerUi.generateHTML(swaggerJson));
        });

        RegisterRoutes(app);

        app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
            if (err instanceof ValidateError) {
                console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
                return res.status(422).json({
                    message: 'Validation Failed',
                    details: err?.fields,
                });
            }
            if (err instanceof ResponseError) {
                return res.status(err.statusCode).json({
                    message: err.message,
                });
            }
            if (err instanceof Error) {
                console.log('Internal Server Error: ', err);
                return res.status(500).json({
                    message: 'Internal Server Error',
                });
            }

            next();
        });

        app.listen(envs.PORT);

        console.log('Express server has started on port', envs.PORT);
    })
    .catch((error) => console.log(error));
