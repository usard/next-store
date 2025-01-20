import React from 'react';
import { fetchAdminProductById, updateProductAction  } from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CheckboxInput from '@/components/form/CheckboxInput';
import UpdateImage from '@/components/form/UpdateImage';
import SubmitBtn from '@/components/form/SubmitBtn';


async function EditProductsPage({params} :{params:{id: string}}) {
  const {id} = params;
  const product = await fetchAdminProductById(id);
  const {name, company, price, description, featured, image} = product;
  console.log('image in edit page :', image)
  

  return (
    <section>
        <div className='py-2'>
          <UpdateImage src={image} >
            <input type="hidden" id={id} name='id' value={id} />
            <input type="hidden" id={'url'} name='url' value={image}/>
          </UpdateImage>
        </div>
        <div>
          <FormContainer action={updateProductAction}>
              <input type="hidden"  name='id' value={id} />
              <FormInput type='text' labelText={'product name'} name='name' defaultValue={name}/>
              <FormInput type='text' labelText={'company'} name='company' defaultValue={company}/>
              <PriceInput labelText={'price'} name='price' defaultValue={price}/>
              <TextAreaInput labelText='description' name='description' defaultValue={description} />
              <CheckboxInput labelText='featured' name='featured' defaultChecked={featured}/>
              <SubmitBtn btnText='update product' variant='default' size='lg' />
          </FormContainer>
        </div>
    </section>
  )
}

export default EditProductsPage;