import {Company} from "../Models/Company.ts";
import axios from "axios";
import {Customer} from "../Models/Customer.ts";

export class AdministratorServices {

    async getCompanies(): Promise<Company[]>{
        return  (await axios.get<Company[]>(`http://localhost:8080/ad/companies`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async getCustomers(): Promise<Customer[]>{
        return (await axios.get<Customer[]>(`http://localhost:8080/ad/customers`)).data;
    }

    async getCompany(id: number): Promise<Company>{
        return (await axios.get<Company>(`http://localhost:8080/ad/company/${id}`)).data;
    }

    async getCustomer(id: number): Promise<Customer>{
        return (await axios.get<Customer>(`http://localhost:8080/ad/costomer/${id}`)).data;
    }

    async deleteCompany(id: number){
        return (await axios.delete(`http://localhost:8080/ad/company/${id}/delete`)).data;
    }

    async deleteCustomer(id: number){
        return (await axios.delete(`http://localhost:8080/ad/costomer/${id}/delete`)).data;
    }

    async updateCompany(company: Company){
        return (await axios.put(`http://localhost:8080/ad/company/update`),company);
    }

    async updateCustomer(customer: Customer){
        return (await axios.put(`http://localhost:8080/ad/customer/update`),customer);
    }

    async addCompany(company: Company){
        return (await axios.post(`http://localhost:8080/ad/company/add`),company);
    }

    async addCustomer(customer: Customer){
        return (await axios.post(`http://localhost:8080/ad/customer/add`),customer);
    }

}

const administratorServices = new AdministratorServices();
export default administratorServices;