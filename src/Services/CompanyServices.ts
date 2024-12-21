import axios from "axios";
import {Company} from "../Models/Company.ts";
import {Coupon} from "../Models/Coupon.ts";
import {BASE_URL} from "../constants.ts";

//todo get exseptions
//todo transfer to DTO
export class CompanyServices{

    async getCompany(id: number){
        return (await axios.get<Company>(`${BASE_URL}/company/${id}`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async getCoupons(companyId: number){
        return (await axios.get<Coupon[]>(`${BASE_URL}/company/coupons/${companyId}`,{headers: {Authorization: "Bearer" + localStorage.token}})).data;
    }

    async updateCoupon(coupon: Coupon){
        return (await axios.put(`${BASE_URL}/company/coupon/update`),coupon,{headers: {Authorization: "Bearer" + localStorage.token}});
    }

    async addCoupon(coupon: Coupon){
        return (await axios.post(`${BASE_URL}/company/coupon/add`),coupon,{headers: {Authorization: "Bearer" + localStorage.token}});
    }

    async deleteCoupon(id: number){
        return (await axios.delete(`${BASE_URL}/company/coupon/${id}/delete`,{headers: {Authorization: "Bearer" + localStorage.token}}));
    }

}
const companyServices =new CompanyServices();
export default companyServices;