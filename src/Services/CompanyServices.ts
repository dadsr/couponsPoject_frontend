import axios from "axios";
import {Company} from "../Models/Company.ts";
import {Coupon} from "../Models/Coupon.ts";
import {BASE_URL} from "../constants.ts";
import handleAxiosError from "./ErrorHandling/HandleAxiosError.ts";

//todo get exseptions
//todo transfer to DTO
export class CompanyServices{

    async getCompany(id: number) :Promise<Company>{
        try {
            const response = await axios.get<Company>(`${BASE_URL}/company/${id}`,{headers: {Authorization: "Bearer" + localStorage.token}});
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };

    }

    async getCoupons(companyId: number):Promise <Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>(`${BASE_URL}/company/coupons/${companyId}`,{headers: {Authorization: "Bearer" + localStorage.token}});
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async updateCoupon(coupon: Coupon):Promise <string>{
        try {
            const response = await axios.put(`${BASE_URL}/company/coupon/update`,coupon,{headers: {Authorization: "Bearer" + localStorage.token}});
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async addCoupon(coupon: Coupon):Promise <string>{
        try {
            const response = await axios.post(`${BASE_URL}/company/coupon/add`,coupon,{headers: {Authorization: "Bearer" + localStorage.token}});
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }

    async deleteCoupon(id: number):Promise <string> {
        try {
            const response = await axios.delete(`${BASE_URL}/company/coupon/${id}/delete`,{headers: {Authorization: "Bearer" + localStorage.token}});
            return response.data;
        } catch(error) {
            handleAxiosError(error);
            throw error;
        };
    }
}
const companyServices =new CompanyServices();
export default companyServices;