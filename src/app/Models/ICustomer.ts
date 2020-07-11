export interface ICustomer {
    customerID: number,
    name: {
        first: string,
        last: string
    },
    birthday:string,
    gender:"m" | "w",
    lastContact : string,
    customerLifetimeValue : number

}