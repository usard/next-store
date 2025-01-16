export type Link = {
    id: number;
    href: string;
    text: string;
}

export const links: Link[] = [
    {id: 1, href:'/', text: 'Home'},
    {id: 2, href:'/about', text: 'About'},
    {id: 3, href:'/products', text: 'Products'},
    {id: 4, href:'/cart', text: 'Cart'},
    {id: 5, href:'/orders', text: 'Orders'}
]


export const adminLinks: Link[] = [
    {id:1, href:'/admin/sales', text:'sales'},
    {id:2, href:'/admin/products', text: 'my products'},
    {id:3, href:'/admin/products/create', text:'create products'},
    // {id:4, href:'/admin/products/:id/edit', text: 'edit product'} 
]