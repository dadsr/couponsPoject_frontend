import './Filters.css';

import {Coupon} from "../../Models/Coupon.ts";
import {useState} from "react";
import CategoryColors from "../../Models/CategoryEnum.tsx";


interface SetProps {
    coupons: Coupon[];
    setFilteredCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
}

export function Filters(props: SetProps): JSX.Element {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [category, setCategory] = useState<string>("DEFAULT");


    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilter(event.target.value);
        applyFilters(event.target.value, category, maxPrice);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
        if (selectedFilter === "ByCategory") {
            applyFilters(selectedFilter, newCategory, maxPrice);
        }
    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = parseFloat(event.target.value);
        setMaxPrice(price);
        if (selectedFilter === "ByMaxPrice") {
            applyFilters(selectedFilter, category, price);
        }
    };

    const applyFilters = (filterType: string, category: string, maxPrice?: number) => {
        let filteredCoupons = props.coupons;

        if (filterType === "ByCategory" && category !== "DEFAULT") {
            filteredCoupons = filteredCoupons.filter(coupon => coupon.category === category);
        }

        if (filterType === "ByMaxPrice" && maxPrice !== undefined) {
            filteredCoupons = filteredCoupons.filter(coupon => coupon.price <= maxPrice);
        }

        props.setFilteredCoupons(filteredCoupons);
    };


    return (
        <div className="CustomerCouponsFilters">
            <fieldset className="filters-radio">
                <label className="custom-radio">
                    <input type="radio"
                           value="All"
                           checked={selectedFilter === "All"}
                           onChange={handleRadioChange}
                    /> Show All <br/>
                </label>
                <label className="custom-radio">
                    <input type="radio"
                           value="ByCategory"
                           checked={selectedFilter === "ByCategory"}
                           onChange={handleRadioChange}
                    /> By Category <br/>
                </label>
                <label className="custom-radio">
                    <input type="radio"
                           value="ByMaxPrice"
                           checked={selectedFilter === "ByMaxPrice"}
                           onChange={handleRadioChange}
                    /> By Max Price <br/>
                </label>
            </fieldset>

            {selectedFilter === "ByCategory" && (
                <select name="category"
                        value={category}
                        onChange={handleSelectChange}>
                    {category === "DEFAULT" && <option value="DEFAULT" disabled>--Select a category--</option>}
                    {Object.keys(CategoryColors)
                        .filter(cat => cat !== "DEFAULT")
                        .map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                </select>
            )}
            {selectedFilter === "ByMaxPrice" && (
                <input type="number" placeholder="Enter maximum price" value={maxPrice || ""} onChange={handleMaxPriceChange}/>
            )}
        </div>
    );

//
}