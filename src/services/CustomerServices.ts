import axios from "axios";
import {Coupon} from "../Models/Coupon.ts";
import {Customer} from "../Models/Customer.ts";
import {interceptorInit} from "./AxiosInterseptor.ts";
import {errorHandler} from "../errors/errorHandler.ts";


interceptorInit();

export class CustomerServices {

    async getCustomer(id: number): Promise<Customer> {
        try {
            const response = await axios.get<Customer>(`/customer/${id}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async getCoupons(customerId: number): Promise<Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>(`/customer/${customerId}/coupons/`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    //Receiving coupons that can be purchased
    async getPurchaseCoupons(customerId: number): Promise<Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>(`/customer/${customerId}/purchase_coupons/`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async postCouponPurchase(customerId: number, couponId: number): Promise<string> {
        try {
            const response = await axios.post(`/customer/${customerId}/coupon/${couponId}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

//
}
const customerServices = new CustomerServices();
export default customerServices;