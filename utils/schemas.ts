import {z, ZodSchema} from 'zod';
export const ProductSchema = z.object({
    name: z.string().min(3),
    company: z.string(),
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

// const validateImageFile =()=>{
//     const maxUploadSize = 1024*1024;
//     const acceptedFileTypes = ['image/'];
//     return z.instanceof(File).refine((file)=>{
//         return !file || file.size <=maxUploadSize
//     }, 'file must be less than or 1MB').refine((file)=> {
//         return !file || acceptedFileTypes.some((type)=> file.type.startsWith(type))
//     }, 'file must be of image type')
// }

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image');
}


export const imageSchema = z.object({
    image: validateImageFile()   
})

export const ReviewSchema = z.object({
  rating:z.coerce.number().int().refine(value=> value>=0 && value <=5, 'rating must be between 1 and 5'),
  comment:z.string().refine((text)=> text!== '', 'description cannot be empty')

})

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    const errors = result.error?.errors.map((error)=> error.message).join(', ');
    if(!result.success) throw new Error(errors)
    return result.data
}
