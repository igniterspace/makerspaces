export class Order {
    id: number;
    userName: string;
    locationName: string;
    userImage: string;
    createdDate: Date;
}

export class PackOrder {
    lessonId     : number;
    packQuantity : number;
    dueDate      : any;
    lessonName   : string;
}