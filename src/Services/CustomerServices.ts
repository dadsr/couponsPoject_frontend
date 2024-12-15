import axios from "axios";
import {Coupon} from "../Models/Coupon.ts";
import {Customer} from "../Models/Customer.ts";
import {BASE_URL} from "../constants.ts";

export class CustomerServices{

    async getCustomer(id: number){
        return (await axios.get<Customer>(`${BASE_URL}/cus/customer/${id}`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async getCoupons(customerId: number){
        return (await axios.get<Coupon[]>(`${BASE_URL}/cus/customer/${customerId}/coupons/`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    //Receiving coupons that can be purchased
    async getPurchaseCoupons(customerId: number){
        return (await axios.get<Coupon[]>(`${BASE_URL}/cus/customer/${customerId}/purchase_coupons/`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async postCouponPurchase(customerId: number , couponId: number){
        return (await  axios.post(`${BASE_URL}/cus/customer/${customerId}/coupon/${couponId}`,{headers: {Authorization: `Bearer ${localStorage.token}` }}));
    }



}
const customerServices =new CustomerServices();
export default customerServices;