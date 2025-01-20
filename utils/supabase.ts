import  {createClient} from '@supabase/supabase-js';

export const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

const bucket = 'main_bucket';

export const uploadImage = async(image:File) => {
    const timeStamp = Date.now();
    const newName = `${timeStamp}-${image.name}`;
    const {data} = await supabase.storage.from(bucket).upload(newName, image, {cacheControl: '3600'})

    if(!data)  throw new Error('Image upload failed')
    console.log(supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl);
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}

export const deleteImage = async(url:string) => {
    console.log('to delete image url :', url)
    const imageFileName = url.split('/').pop();
    if(!imageFileName) throw new Error('invalid image url');
    await supabase.storage.from(bucket).remove([imageFileName])
}