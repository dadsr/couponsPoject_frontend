
export class Company {
    id:number;
    name:string;
    email:string;
    password:string | null;



    constructor(id: number, name: string, email: string, password:string | null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;//only for addCompany
    }

}