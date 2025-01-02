import {Company} from "../Models/Company.ts";
import axios from "axios";
import {errorHandler} from "../errors/errorHandler.ts";
import {Customer} from "../Models/Customer.ts";
import {interceptorInit} from "./AxiosInterseptor.ts";

interceptorInit();

export class AdministratorServices {

    async getCompanies(): Promise<Company[]> {
        try {
            const response = await axios.get<Company[]>(`/admin/companies`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async getCustomers(): Promise<Customer[]> {
        try {
            const response = await axios.get<Customer[]>(`/admin/customers`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async getCompany(id: number): Promise<Company> {
        try {
            const response = await axios.get<Company>(`/admin/company/${id}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async getCustomer(id: number): Promise<Customer> {
        try {
            const response = await axios.get<Customer>(`/admin/customer/${id}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async deleteCompany(id: number): Promise<string> {
        try {
            const response = await axios.delete(`/admin/company/${id}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async deleteCustomer(id: number): Promise<string> {
        try {
            const response = await axios.delete(`/admin/customer/${id}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
        ;
    }

    async updateCompany(company: Company): Promise<string> {
        try {
            const response = await axios.put(`/admin/company/update`, company);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async updateCustomer(customer: Customer): Promise<string> {
        try {
            const response = await axios.put(`/admin/customer/update`, customer);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async addCompany(company: Company): Promise<string> {
        try {
            const response = await axios.post(`/admin/company/add`, company);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
        ;
    }

    async addCustomer(customer: Customer): Promise<string> {
        try {
            const response = await axios.post(`/admin/customer/add`, customer);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
        ;
    }
}
const administratorServices = new AdministratorServices();
export default administratorServices;