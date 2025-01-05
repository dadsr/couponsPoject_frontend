import axios from "axios";
import {Company} from "../models/Company.ts";
import {Coupon} from "../models/Coupon.ts";
import {interceptorInit} from "./AxiosInterseptor.ts";

interceptorInit();// Initializes the interceptor.

/**
 * The `CompanyServices` class provides methods to handle operations related to companies and their coupons.
 */
export class CompanyServices {

    /**
     * Fetches details of a specific company by its ID.
     *
     * @param {number} id - The ID of the company to fetch.
     * @returns {Promise<Company>} A promise that resolves to the Company object.
     */
    async getCompany(id: number): Promise<Company> {
        const response = await axios.get<Company>(`/company/${id}`);
        return response.data;
    }

    /**
     * Fetches all coupons associated with a specific company.
     *
     * @param {number} companyId - The ID of the company whose coupons are to be fetched.
     * @returns {Promise<Coupon[]>} A promise that resolves to an array of Coupon objects.
     */
    async getCoupons(companyId: number): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`/company/coupons/${companyId}`);
        return response.data;
    }

    /**
     * Updates an existing coupon's details and returns a confirmation message.
     *
     * @param {Coupon} coupon - The updated Coupon object with new details.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async updateCoupon(coupon: Coupon): Promise<string> {
        const response = await axios.put(`/company/coupon/update`, coupon);
        return response.data;

    }

    /**
     * Adds a new coupon for the company and returns a confirmation message.
     *
     * @param {Coupon} coupon - The new Coupon object to add.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async addCoupon(coupon: Coupon): Promise<string> {
        const response = await axios.post(`/company/coupon/add`, coupon);
        return response.data;
    }

    /**
     * Deletes an existing coupon by its ID and returns a confirmation message.
     *
     * @param {number} id - The ID of the coupon to delete.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async deleteCoupon(id: number): Promise<string> {
        const response = await axios.delete(`/company/coupon/${id}/delete`);
        return response.data;
    }

    //
}

const companyServices = new CompanyServices();
export default companyServices;