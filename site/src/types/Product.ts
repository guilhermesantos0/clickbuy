export interface Product {
    _id: string,
    name: string,
    price: number,
    location: string,
    images: String[],
    mainImage: string,
    category: string,
    announcer: string,
    condition: {
        quality: string,
        used: boolean
    }
}