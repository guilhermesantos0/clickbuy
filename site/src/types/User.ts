import { Product } from "./Product";

export interface User {
    _id: string;
    email: string;
    password: string;
    profilePic?: string;
    cart: Product[];
    favourites: Product[];
    personalData: {
        name: string;
        bornDate: string;
        cpf: string;
        phone: string;
        address: {
            road: string;
            number: string;
            city: string;
            state: string;
            zip: string;
            complement: string;
            neighborhood: string;
        }
    }
}