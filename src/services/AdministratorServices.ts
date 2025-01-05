import {Company} from "../models/Company.ts";
import axios from "axios";
import {Customer} from "../models/Customer.ts";
import {interceptorInit} from "./AxiosInterseptor.ts";

interceptorInit(); // Initializes the interceptor.

/**
 * The `AdministratorServices` class provides methods to manage API operations related to companies and customers.
 */
export class AdministratorServices {

    /**
     * Fetches a list of all companies from the server.
     *
     * @returns {Promise<Company[]>} A promise that resolves to an array of Company objects.
     */
    async getCompanies(): Promise<Company[]> {
            const response = await axios.get<Company[]>(`/admin/companies`);
            return response.data;
    }

    /**
     * Fetches a list of all customers from the server.
     *
     * @returns {Promise<Customer[]>} A promise that resolves to an array of Customer objects.
     */
    async getCustomers(): Promise<Customer[]> {
            const response = await axios.get<Customer[]>(`/admin/customers`);
            return response.data;
    }

    /**
     * Fetches details of a specific company by its ID.
     *
     * @param {number} id - The ID of the company to fetch.
     * @returns {Promise<Company>} A promise that resolves to a single Company object.
     */
    async getCompany(id: number): Promise<Company> {
            const response = await axios.get<Company>(`/admin/company/${id}`);
            return response.data;
    }

    /**
     * Fetches details of a specific customer by their ID.
     *
     * @param {number} id - The ID of the customer to fetch.
     * @returns {Promise<Customer>} A promise that resolves to a single Customer object.
     */
    async getCustomer(id: number): Promise<Customer> {
            const response = await axios.get<Customer>(`/admin/customer/${id}`);
            return response.data;
    }

    /**
     * Deletes a specific company by its ID and returns a confirmation message.
     *
     * @param {number} id - The ID of the company to delete.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async deleteCompany(id: number): Promise<string> {
            const response = await axios.delete(`/admin/company/${id}`);
            return response.data;
    }

    /**
     * Deletes a specific customer by their ID and returns a confirmation message.
     *
     * @param {number} id - The ID of the customer to delete.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async deleteCustomer(id: number): Promise<string> {
            const response = await axios.delete(`/admin/customer/${id}`);
            return response.data;
    }

    /**
     * Updates an existing company's details and returns a confirmation message.
     *
     * @param {Company} company - The updated Company object with new details.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async updateCompany(company: Company): Promise<string> {
            const response = await axios.put(`/admin/company/update`, company);
            return response.data;
    }

    /**
     * Updates an existing customer's details and returns a confirmation message.
     *
     * @param {Customer} customer - The updated Customer object with new details.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async updateCustomer(customer: Customer): Promise<string> {
            const response = await axios.put(`/admin/customer/update`, customer);
            return response.data;
    }

    /**
     * Adds a new company to the database and returns a confirmation message.
     *
     * @param {Company} company - The new Company object to add.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async addCompany(company: Company): Promise<string> {
            const response = await axios.post(`/admin/company/add`, company);
            return response.data;
    }

    /**
     * Adds a new customer to the database and returns a confirmation message.
     *
     * @param {Customer} customer - The new Customer object to add.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async addCustomer(customer: Customer): Promise<string> {
            const response = await axios.post(`/admin/customer/add`, customer);
            return response.data;
    }
}
const administratorServices = new AdministratorServices();
export default administratorServices;