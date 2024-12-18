enum ModesEnum {
    COMP_DETAILS = 'COMP_DETAILS',
    COMP_COUPONS = 'COMP_COUPONS',
    CLINT_DETAILS = 'CLINT_DETAILS',
    CLINT_COUPONS = 'CLINT_COUPONS',
    ADMIN_COMPS = 'ADMIN_COMPS',
    ADMIN_CLINT = 'ADMIN_CLINT'
}

export type Mods = keyof typeof ModesEnum;
export default ModesEnum;