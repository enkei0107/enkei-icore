import { ValueTransformer } from "typeorm";
import * as crypto from 'crypto';
require("dotenv").config();


export class EncryptTransformer implements ValueTransformer{
    private algorithm:string;
    private secretKey:string;
    private iv:Buffer;
    constructor(algorithm: string, secretKey: string=process.env.DATABASE_SECRET_KEY) {
        this.algorithm = algorithm;
        this.secretKey = crypto.createHash('sha256').update(secretKey).digest('base64').substr(0, 32);
        this.iv = crypto.randomBytes(16); 
    }
    to(value: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
        let encryptedValue = cipher.update(value, 'utf8', 'hex');
        encryptedValue += cipher.final('hex');
        return `${this.iv.toString('hex')}:${encryptedValue}`;
      }
    
      from(value: string): string {
        const [ivHex, encryptedValue] = value.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
        let decryptedValue = decipher.update(encryptedValue, 'hex', 'utf8');
        decryptedValue += decipher.final('utf8');
        return decryptedValue;
      }

}