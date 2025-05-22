import { User } from "./User";

export interface Product {
    _id: string,
    name: string,
    price: string,
    location: string,
    images: String[],
    mainImage: string,
    category: string,
    announcer: User,
    condition: {
        quality: string,
        used: boolean
    },
    createdAt: string | Date,
    description: string,
    sold?: boolean | false
}