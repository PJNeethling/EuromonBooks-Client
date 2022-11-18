import { DecimalPipe } from "@angular/common";

export default interface BookResponse {
    id: number;
    name: string;
    description: string;
    purchasePrice: number;
    text: string;
    isActive: boolean;
    // ts: Date;
}