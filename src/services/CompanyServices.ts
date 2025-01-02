import axios from "axios";
import {Company} from "../Models/Company.ts";
import {Coupon} from "../Models/Coupon.ts";
import {interceptorInit} from "./AxiosInterseptor.ts";
import {errorHandler} from "../errors/errorHandler.ts";

interceptorInit();

export class CompanyServices {

    async getCompany(id: number): Promise<Company> {
        try {
            const response = await axios.get<Company>(`/company/${id}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }

    }

    async getCoupons(companyId: number): Promise<Coupon[]> {
        try {
            const response = await axios.get<Coupon[]>(`/company/coupons/${companyId}`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async updateCoupon(coupon: Coupon): Promise<string> {
        try {
            const response = await axios.put(`/company/coupon/update`, coupon);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async addCoupon(coupon: Coupon): Promise<string> {
        try {
            const response = await axios.post(`/company/coupon/add`, coupon);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    async deleteCoupon(id: number): Promise<string> {
        try {
            const response = await axios.delete(`/company/coupon/${id}/delete`);
            return response.data;
        } catch (error) {
            errorHandler(error);
            throw error;
        }
    }

    //
}
const companyServices = new CompanyServices();
export default companyServices;