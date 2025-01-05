export class Customer {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string | null;


    constructor(id: number, firstName: string, lastName: string, email: string, password:string | null) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;//only for addCustomer
    }
}