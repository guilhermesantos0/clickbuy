export interface User {
    _id: string;
    email: string;
    password: string;
    profilePic?: string;
    favourites?: any[];
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