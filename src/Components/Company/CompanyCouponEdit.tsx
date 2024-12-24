import './Css/CompanyCouponEdit.css';

import React, {useEffect, useState} from "react";

import {useLocation, useNavigate} from "react-router-dom";
import {Coupon} from "../../Models/Coupon.ts";
import companyServices from "../../Services/CompanyServices.ts";
import CategoryColors, {Category} from "../../Models/CategoryEnum.tsx";
import ModesEnum from "../../Models/ModesEnum.tsx";
import {useSidebarContext} from "../../Context/SidebarContext.tsx";
import {Company} from "../../Models/Company.ts";

interface companyCouponEditProps {
    coupon: Coupon|null;
    company: Company;
    editMode: string;
}


export function CompanyCouponEdit(props: companyCouponEditProps ): JSX.Element|null {
    const location =useLocation();
    const {couponData}  =location.state ;
    //const mode = couponData.id ===0?"add":"edit";
    const navigate = useNavigate();
    const { setSidebarData } = useSidebarContext();


    const  [coupon,setCoupon] = useState<Coupon>();
    const company = props.company;
    const [couponFormData, setCouponFormData] = useState<{
        id: number;
        title: string;
        description: string;
        companyName: string;
        category: Category;
        price: number;
        amount: number;
        startDate: string;
        endDate: string;
        image: string;
    }>({
        id: 0,
        title: "",
        description: "",
        companyName: company.name,
        category: "DEFAULT",
        price: 0,
        amount: 0,
        startDate: "",
        endDate: "",
        image: "",
});


    useEffect(() => {
        if (couponData) {
            setCoupon(couponData);
        }
    }, [couponData]);

    useEffect(() => {
        if (couponData) {
            setCoupon(couponData);
        }
    }, [couponData]);

    useEffect(() => {
        if (coupon) {
            setCouponFormData(prevState => ({
                ...prevState,
                id: coupon.id || prevState.id,
                title: coupon.title || prevState.title,
                description: coupon.description || prevState.description,
                companyName: company.name || prevState.companyName,
                category: coupon.category || prevState.category,
                price: coupon.price || prevState.price,
                amount: coupon.amount || prevState.amount,
                startDate: coupon.startDate || prevState.startDate,
                endDate: coupon.endDate || prevState.endDate,
                image: coupon.image || prevState.image
            }));
        }
        const newCoupon = () => {
            const temp = new Coupon(0, "", "", company.id, "DEFAULT", 0, 0, "", "", "");
            navigate("/coupon/" + 0,
                {
                    state:
                        {
                            couponData: temp,
                            companyData:company,
                            editMode: "add"
                        }
                }
            );
        };

        //todo
        const deleteCoupon = () => {
            if(coupon){
                companyServices.deleteCoupon(coupon.id)
                    .then()
                    .catch()
            }
        };

        const backToCompanyHome = () => {
            navigate( "/company/" + company.id);
        }

        if (props.editMode === "edit") {
            setSidebarData({
                mode: ModesEnum.COMP_DETAILS,
                buttons: (
                    <>
                        <button title="New" onClick={newCoupon}> New Coupon</button>
                        <br/>
                        <button title="Delete" onClick={deleteCoupon}> Delete current Coupon</button>
                        <br/>
                        <button title="Back" onClick={backToCompanyHome}> Back to company`s home</button>
                    </>
                ),
                cards: (
                    <div>
                        <h2>Coupon edit</h2>
                        <p>title: {coupon?.title}</p>
                        <p>category: {coupon?.category}</p>
                        <p>price: {coupon?.price}</p>
                        <p>amount: {coupon?.amount}</p>
                        <p>startDate: {coupon?.startDate}</p>
                        <p>endDate: {coupon?.endDate}</p>
                    </div>
                ),
            });
        } else if (props.editMode  === "add") {
            setSidebarData({
                mode: ModesEnum.COMP_DETAILS,
                buttons: (<>
                    <button title="Back" onClick={backToCompanyHome}> Back to company`s home</button>
                </>),
                cards: (
                    <div>
                        <h2>Add New Coupon</h2>
                        <p>Fill in the details to create a new coupon.</p>
                    </div>
                ),
            });
        }
    }, [props.editMode, coupon, setSidebarData]);


    if (!coupon) {
        return <div>Error: Company not found</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCouponFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const submitEdit= async (event: React.FormEvent) =>{
        event.preventDefault();
        switch (props.editMode){
            case "edit":{
                await companyServices
                    .updateCoupon(
                        new Coupon (
                            coupon.id,
                            couponFormData.title,
                            couponFormData.description,
                            company.id,
                            couponFormData.category,
                            couponFormData.price,
                            couponFormData.amount,
                            couponFormData.startDate,
                            couponFormData.endDate,
                            couponFormData.image
                        )
                    )
                    .catch((error) => console.error("update failed:", error));
            }break;
            case "add":{
                await companyServices
                    .addCoupon(
                        new Coupon (
                            0,
                            couponFormData.title,
                            couponFormData.description,
                            company.id,
                            couponFormData.category,
                            couponFormData.price,
                            couponFormData.amount,
                            couponFormData.startDate,
                            couponFormData.endDate,
                            couponFormData.image
                        )
                    )
                    .catch((error) => console.error("adding failed:", error));
            }break;
        }
        navigate(`/company/${coupon.companyId}`);
    }


    return (
        <form onSubmit={submitEdit} className="couponEdit-form">
            <label>title: </label>
            <input type="texst" name="title" value={couponFormData.title} onChange={handleChange} required/>
            <p>id: : {coupon.id}</p>
            <label>description: </label>
            <textarea  name="description" rows={4} cols={78}  value={couponFormData.description} onChange={handleChange} required/><br/>
            <label>category:</label>
            <select name="category" value={couponFormData.category} onChange={handleChange}>
                {couponFormData.category ==="DEFAULT" && <option value="" disabled>--Select a category--</option>}
                {Object.keys(CategoryColors)
                    .filter(category => category !== "DEFAULT")
                    .map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
            </select><br/>
            <label>startDate: </label>
            <input type="date" name="startDate" value={couponFormData.startDate} onChange={handleChange} required/><br/>
            <label>endDate: </label>
            <input type="date" name="endDate" value={couponFormData.endDate} onChange={handleChange} required/><br/>
            <label>price: </label>
            <input type="number" name="price" value={couponFormData.price} onChange={handleChange} required/><br/>
            <label>amount: </label>
            <input type="number" name="amount" value={couponFormData.amount} onChange={handleChange} required/><br/>
            <p>company name: {props.company.name}</p>
            <p>image: {coupon.image}</p>
            <button type="submit">{props.editMode === "add"? "Add" : "Update"}</button>
        </form>
    );
}