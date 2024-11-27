import { Product } from "./product";

export interface LatestRankingResponse {
    latestRankingId: string;
    ranks: Record<string, number>;
    recommendations: any[];
    timestamp: Date;
    products: Product[];
}