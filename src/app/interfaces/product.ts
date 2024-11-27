export interface Product {
    designerCode: string;
    imageURL: string;
    shortDescription: string;
    categoryID: string;
    productCode: string;
    productSin: string;
    designerName: string;
    price: number;
    designerFolderId: string;
    gender: string;
    eloRating?: number;
    wins?: number;
    losses?: number;
}