import SectionTitle from "@/components/global/SectionTitle"
import { fetchUserOrders } from "@/utils/actions";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableCaption } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/utils/format";

async function  OrdersPage() {
  const orders = await fetchUserOrders()
  if(orders.length ==0 ) return <SectionTitle text='No orders placed' />
  return (
    <>
      <SectionTitle text='Your orders'/>
      <div>
            <Table>
              <TableCaption>Total orders: {orders.length}</TableCaption>
              <TableHeader>
                  <TableRow>
                    <TableHead>Products</TableHead>
                    <TableHead>Order total</TableHead>
                    <TableHead>Tax</TableHead>
                    <TableHead>Shipping</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {
                  orders.map((order)=> {
                    const {products, orderTotal, tax, shipping, createdAt} = order;
                    return(
                      <TableRow>
                          <TableCell>{products}</TableCell>
                          <TableCell>{formatCurrency(orderTotal)}</TableCell>
                          <TableCell>{formatCurrency(tax)}</TableCell>
                          <TableCell>{formatCurrency(shipping)}</TableCell>
                          <TableCell>{formatDate(createdAt)}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
      </div>
    </>
  )

}

export default OrdersPage