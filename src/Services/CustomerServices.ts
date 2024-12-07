import axios from "axios";
import {Coupon} from "../Models/Coupon.ts";
import {Customer} from "../Models/Customer.ts";

export class CustomerServices{

    async getCustomer(id: number){
        return (await axios.get<Customer>(`http://localhost:8080/cus/customer/${id}`)).data;
    }

    async getCoupons(customerId: number){
        return (await axios.get<Coupon[]>(`http://localhost:8080/cus/customer/${customerId}/coupons/`)).data;
    }

    async couponPurchase( customerId: number,couponId: number){
        return (await axios.post(`http://localhost:8080/cus//customer/${customerId}/coupon/${couponId}`))
    }

}
const customerServices =new CustomerServices();
export default customerServices;