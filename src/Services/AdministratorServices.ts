import {Company} from "../Models/Company.ts";
import axios from "axios";
import {Customer} from "../Models/Customer.ts";
import {BASE_URL} from "../constants.ts";
import handleAxiosError from "./ErrorHandling/HandleAxiosError.ts";

export class AdministratorServices {

    async getCompanies(): Promise<Company[]>{
        try {
            const response = await axios.get<Company[]>
            (`${BASE_URL}/admin/companies`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async getCustomers(): Promise<Customer[]>{
        try {
            const response = await axios.get<Customer[]>
            (`${BASE_URL}/admin/customers`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async getCompany(id: number): Promise<Company>{
        try {
            const response = await axios.get<Company>
            (`${BASE_URL}/admin/company/${id}`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async getCustomer(id: number): Promise<Customer>{
        try {
            const response = await axios.get<Customer>
            (`${BASE_URL}/admin/costomer/${id}`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async deleteCompany(id: number):Promise<String>{
        try {
            const response = await axios.delete
            (`${BASE_URL}/admin/company/${id}/delete`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async deleteCustomer(id: number):Promise<string>{
        try {
            const response = await axios.delete
            (`${BASE_URL}/admin/costomer/${id}/delete`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async updateCompany(company: Company): Promise<string> {
        try {
            const response = await axios.put
            (`${BASE_URL}/admin/company/update`, company,
                {
                    headers:
                        {
                            Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "application/json",
                        }
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            throw error;
        }
    }

    async updateCustomer(customer: Customer): Promise<string> {
        try {
            const response = await axios.put
            (`${BASE_URL}/admin/customer/update`, customer,
                {
                    headers:
                        {
                            Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "application/json",
                        }
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            throw error;
        }
    }

    async addCompany(company: Company):Promise<String>{
        try {
            const response = await axios.post
            (`${BASE_URL}/admin/company/add`, company,
                {
                    headers:
                        {
                            Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "application/json",
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async addCustomer(customer: Customer):Promise<String>{
        try {
            const response = await axios.post
            (`${BASE_URL}/admin/customer/add`, customer,
                {
                    headers:
                        {
                            Authorization: "Bearer " + localStorage.token,
                            "Content-Type": "application/json",
                        }
                }
            );
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }
}

const administratorServices = new AdministratorServices();
export default administratorServices;