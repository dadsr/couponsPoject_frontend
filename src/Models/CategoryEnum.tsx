const CategoryEnum ={
    'DEFAULT': 'rgba(0,0,0,0)',
    'ELECTRONICS': 'rgba(242,12,105,0.1)',
    'FASHION': 'rgba(55,61,235,0.1)',
    'FOOD': 'rgba(172,214,12,0.1)',
    'TRAVEL': 'rgba(148,37,247,0.1)',
} as const;

export type Category = keyof typeof CategoryEnum;
export default CategoryEnum ;