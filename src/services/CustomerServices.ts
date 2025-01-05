import axios from "axios";
import {Coupon} from "../models/Coupon.ts";
import {Customer} from "../models/Customer.ts";
import {interceptorInit} from "./AxiosInterseptor.ts";


interceptorInit();// Initializes the interceptor.

/**
 * The `CustomerServices` class provides methods to handle operations related to customers and their coupons.
 */
export class CustomerServices {

    /**
     * Fetches details of a specific customer by their ID.
     *
     * @param {number} id - The ID of the customer to fetch.
     * @returns {Promise<Customer>} A promise that resolves to the Customer object.
     */
    async getCustomer(id: number): Promise<Customer> {
        const response = await axios.get<Customer>(`/customer/${id}`);
        return response.data;
    }

    /**
     * Fetches all coupons associated with a specific customer.
     *
     * @param {number} customerId - The ID of the customer whose coupons are to be fetched.
     * @returns {Promise<Coupon[]>} A promise that resolves to an array of Coupon objects.
     */
    async getCoupons(customerId: number): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`/customer/${customerId}/coupons/`);
        return response.data;
    }

    /**
     * Fetches all coupons available for purchase by a specific customer.
     *
     * @param {number} customerId - The ID of the customer who wants to view purchasable coupons.
     * @returns {Promise<Coupon[]>} A promise that resolves to an array of Coupon objects available for purchase.
     */
    async getPurchaseCoupons(customerId: number): Promise<Coupon[]> {
        const response = await axios.get<Coupon[]>(`/customer/${customerId}/purchase_coupons/`);
        return response.data;
    }

    /**
     * Allows a customer to purchase a specific coupon and returns a confirmation message.
     *
     * @param {number} customerId - The ID of the customer making the purchase.
     * @param {number} couponId - The ID of the coupon being purchased.
     * @returns {Promise<string>} A promise that resolves to a success message as a string.
     */
    async postCouponPurchase(customerId: number, couponId: number): Promise<string> {
        const response = await axios.post(`/customer/${customerId}/coupon/${couponId}`);
        return response.data;
    }

//
}

const customerServices = new CustomerServices();
export default customerServices;