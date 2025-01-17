import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {deleteProductAction, fetchAdminProducts} from '@/utils/actions';
import  Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import { Button } from '@/components/ui/button';
import FormContainer from '@/components/form/FormContainer';
import { actionFunction } from '@/utils/types';
import { Loader2 } from 'lucide-react';
import { IconButton } from '@/components/form/Buttons';


// export const IconButton = ({actionType}:{actionType: actionType}) => {
//   const {pending } = useFormStatus();

//   const renderIcon = () => {
//     if (actionType === 'edit') {
//       return <CiEdit />
//     }
//     if (actionType === 'delete') {
//       return <RiDeleteBin5Line />
//     }
//   }

//   return (
//     <Button type='submit'>
//       {pending ?<Loader2 /> : renderIcon()}
//     </Button>
//   )
// }

async function AdminProductsPage() {
  const products = await fetchAdminProducts();
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow className='text-lg'>
            <TableHead>Product name</TableHead>
            <TableHead>company</TableHead>
            <TableHead>price</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {
              products.map((item)=> {
                return(
                  <TableRow className='text-md tracking-wide'>
                    <TableCell>
                      <Link className='underline text-muted-foreground' href={`products/${item.id}`}>
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-x-4 cursor-pointer'>
                        <Button type='button' variant='outline' asChild>
                          <Link href={`/admin/products/${item.id}/edit`}>
                            <IconButton actionType='edit' />
                          </Link>
                        </Button>
                        <DeleteButton productId={item.id} deleteProductAction={deleteProductAction}/> 
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            }
        </TableBody>
      </Table>
    </section>
  )
}

const DeleteButton = ({productId, deleteProductAction}:{productId:string, deleteProductAction: actionFunction}) => {
  console.log('product id :', productId)
  const id = productId;
  const deleteProduct = deleteProductAction.bind(null, {id})
  return (
   <FormContainer action={deleteProduct}>
      <IconButton actionType='delete'/>
   </FormContainer>
  )
}
export default AdminProductsPage;

