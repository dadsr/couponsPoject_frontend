import axios from "axios";
import {Company} from "../Models/Company.ts";
import {Coupon} from "../Models/Coupon.ts";

export class CompanyServices{

    async getCompany(id: number){
        return (await axios.get<Company>(`http://localhost:8080/com/company/${id}`)).data;
    }

    async getCoupons(companyId: number){
        return (await axios.get<Coupon[]>(`http://localhost:8080/com/coupons/${companyId}`)).data;
    }

    async updateCoupon(coupon: Coupon){
        return (await axios.put(`http://localhost:8080/com/coupon`),coupon);
    }

    async addCoupon(coupon: Coupon){
        return (await axios.post(`http://localhost:8080/com/coupon/add`),coupon);
    }

    async deleteCoupon(id: number){
        return (await axios.delete(`http://localhost:8080/com/coupons/${id}`));
    }

}
const companyServices =new CompanyServices();
export default companyServices;