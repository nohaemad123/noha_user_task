import { IAddress } from "./IAddress";

export interface ICompany {
    department: string;
    name: string;
    title: string;
    address: IAddress
}