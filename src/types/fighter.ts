import { Timestamp } from "firebase/firestore";
import Model from "./model";

interface Competitors {
    name: string;
    points: number
}



export interface FightsData {
    id: string;
    competitors: Competitors[];
    timer: Number;
    created_at?: Timestamp;
    deleted_at?: Timestamp;
}

export class FightModel extends Model<FightsData> {
    constructor() {
        super('fights');
    }
}

export default FightModel