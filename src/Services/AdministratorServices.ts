import {Company} from "../Models/Company.ts";
import axios from "axios";
import {Customer} from "../Models/Customer.ts";
import {BASE_URL} from "../constants.ts";

export class AdministratorServices {

    async getCompanies(): Promise<Company[]>{
        return  (await axios.get<Company[]>(`${BASE_URL}/ad/companies`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async getCustomers(): Promise<Customer[]>{
        return (await axios.get<Customer[]>(`${BASE_URL}/ad/customers`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async getCompany(id: number): Promise<Company>{
        return (await axios.get<Company>(`${BASE_URL}/ad/company/${id}`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async getCustomer(id: number): Promise<Customer>{
        return (await axios.get<Customer>(`${BASE_URL}ad/costomer/${id}`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async deleteCompany(id: number){
        return (await axios.delete(`${BASE_URL}/ad/company/${id}/delete`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async deleteCustomer(id: number){
        return (await axios.delete(`${BASE_URL}/ad/costomer/${id}/delete`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async updateCompany(company: Company){
        return (await axios.put(`${BASE_URL}/ad/company/update`),company,{headers: {Authorization: "Bearer" + localStorage.token}});
    }

    async updateCustomer(customer: Customer){
        return (await axios.put(`${BASE_URL}/ad/customer/update`),customer,{headers: {Authorization: "Bearer" + localStorage.token}});
    }

    async addCompany(company: Company){
        return (await axios.post(`${BASE_URL}/ad/company/add`),company,{headers: {Authorization: "Bearer" + localStorage.token}});
    }

    async addCustomer(customer: Customer){
        return (await axios.post(`${BASE_URL}/ad/customer/add`),customer,{headers: {Authorization: "Bearer" + localStorage.token}});
    }

}

const administratorServices = new AdministratorServices();
export default administratorServices;