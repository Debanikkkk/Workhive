import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthorizationError } from './models/res/ResErrors';
import { ResponseError } from './models/res/ResErrors';
import { envs } from './utils/envVars';
import { JWTTokenData } from './models/res/TokenModel';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<JWTTokenData> {
    if (securityName === 'Api-Token') {
        const token = request.body.token || request.query.token || request.headers['x-api-key'];

        return new Promise<JWTTokenData>((resolve, reject) => {
            if (!token) {
                reject(new ResponseError(403, 'Authorization required'));
            }
            // res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
            jwt.verify(token, envs.JWT_SECRET_KEY, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    const td: JWTTokenData = decoded;
                    // Check if JWT contains all required scopes
                    for (const scope of scopes ? scopes : []) {
                        // if (!td.role.permissions.includes(scope)) {
                        //     reject(new Error('JWT does not contain required scope.'));
                        // }
                        if (!td.role) {
                            reject(new Error('JWT does not contain required scope.'));
                        }
                    }
                    resolve(td);
                }
            });
        });
    }
    return Promise.reject(new AuthorizationError('Invalid Authentication'));
}
