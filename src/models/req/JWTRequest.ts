import { Request } from 'express';
// import { JWTTokenData } from 'models/TokenModel';
import { JWTTokenData } from '../res/TokenModel';

export interface JWTRequest extends Request {
  user: JWTTokenData;
}
