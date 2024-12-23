import axios from "axios";
import {Coupon} from "../Models/Coupon.ts";
import {Customer} from "../Models/Customer.ts";
import {BASE_URL} from "../constants.ts";
import handleAxiosError from "./ErrorHandling/HandleAxiosError.ts";

export class CustomerServices {

    async getCustomer(id: number): Promise<Customer> {
        try {
            const response = await axios.get<Customer>
            (`${BASE_URL}/customer/${id}`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            throw error;
        }
        ;
    }

    async getCoupons(customerId: number): Promise<Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>
            (`${BASE_URL}/customer/${customerId}/coupons/`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            throw error;
        }
        ;
    }

    //Receiving coupons that can be purchased
    async getPurchaseCoupons(customerId: number): Promise<Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>
            (`${BASE_URL}/customer/${customerId}/purchase_coupons/`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            throw error;
        }
        ;
    }

    async postCouponPurchase(customerId: number, couponId: number): Promise<string> {
        try {
            const response = await axios.post
            (`${BASE_URL}/customer/${customerId}/coupon/${couponId}`,
                {
                    headers:
                        {
                            Authorization: "Bearer" + localStorage.token
                        }
                }
            );
            return response.data;
        } catch (error) {
            handleAxiosError(error);
            throw error;
        }
        ;
    }
}

const customerServices =new CustomerServices();
export default customerServices;