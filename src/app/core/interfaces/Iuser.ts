import { IAddress } from "./IAddress";
import { IBank } from "./IBank";
import { ICompany } from "./ICompany";
import { ICrypto } from "./ICrypto";
import { iHair } from "./IHair";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    maidenName: string;
    role: string;
    phone: number;
    email: string;
    age: number;
    gender: string;
    birthDate: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: iHair;
    bloodGroup: string;
    address: IAddress;
    university: string;
    company: ICompany;
    bank: IBank;
    ip: string;
    macAddress: string;
    userAgent: string;
    crypto: ICrypto
}

