export interface OrdersEdit {

    orderitem   : any;
    note        : string;
    quantity    : number;
    unit        : string;
    unitprice   : number;
    totalprice  : number;
    
}

export class Details {
constructor (
   public locationID : number,
   public userID     : number
){}
}