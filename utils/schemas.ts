import {z} from 'zod';
export const ProductSchema = z.object({
    name: z.string().min(3),
    company: z.string().min(9),
    price: z.coerce.number().int(),
    description: z.string().refine((description)=>{
        console.log(description.split(' '));
        const wordsLength = description.split(' ').filter((word)=> word !== '').length;
        console.log(wordsLength >=10 && wordsLength <=1000);
        return wordsLength >=10 && wordsLength <=1000
    }, {
        message: 'description should be in between 10 and 1000 words...'
    }),
    featured: z.coerce.boolean(),
});