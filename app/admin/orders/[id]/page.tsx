import { OrderManager } from '../../../../components/admin/order-manager';
export default async function OrderPage({params}:{params:Promise<{id:string}>}){const{id}=await params;return <OrderManager id={id}/>}
