import { Customer } from './customer'

export class Order {
    public sapId: number;
    public id: number;
    public client: Customer;
    public comment: string;
    public components: StorageViewComponent[];
    public status: string
    public poNo: string
    public createdAt: Date
    public updtatedAt: Date
    public componentCount: number
    public locked: boolean
}

export class StorageViewComponent {
        public id: number
        public typeId: number
        public type: string
        public barcode: string
        public components: StorageViewComponent[]
        public fatTests: FatTest[]
        public intersectionName: string
        public intersectionNo: string
        public intersectionId: number
        public sn: string
        public machine: boolean
        public rack: boolean
}

 export class FatTest {
     public id: number
     public test: string
     public procedure: string
     public accepted: boolean
 }