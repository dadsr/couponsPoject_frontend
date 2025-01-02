enum ModesEnum {
    COMP_DETAILS = 'COMP_DETAILS',
    COMP_COUPONS = 'COMP_COUPONS',
    CUST_DETAILS = 'CUST_DETAILS',
    CUST_COUPONS = 'CUST_COUPONS',
    ADMIN_COMPS = 'ADMIN_COMPS',
    ADMIN_CLINT = 'ADMIN_CLINT'
}

export type Mods = keyof typeof ModesEnum;
export default ModesEnum;