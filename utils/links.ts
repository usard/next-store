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