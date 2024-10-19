import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';

import agent from '@/api/agent';
import { Button } from '@/components/custom/button';
import { useNavigate } from 'react-router-dom';



export const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [orderDetail, setOrderDetail] = useState<any>(null);
    const [, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await agent.Orders.getOrderById(Number(orderId));
                setOrderDetail(response);
            } catch (error) {
                setError("Failed to fetch order detail. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!orderDetail) {
        return <div></div>;
    }
    const handleBack = () => {
        navigate("/admin/orders");
      };

    const { orderDto, listOrderDetail, voucherDto } = orderDetail;

    return (
        <>







            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {listOrderDetail.map((orderItem: any) => {
                        const image = orderItem.product.image
                            .replace(/[\[\]]/g, "")
                            .split(",");

                        return (
                            <tr key={orderItem.orderDetailId}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img className="h-10 w-10 rounded-full" src={image[0]} alt="Product" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{orderItem.product.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orderItem.unitPrice.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orderItem.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orderItem.totalPrice.toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>





            <div className="card">
                <div className="card-body">
                    <table className='col-lg-4 text-left'>
                        <tbody>
                            <tr>
                                <th className="px-4 py-2">Subtotal</th>
                                <td className="px-4 py-2"><span className="amount">{orderDto.totalAmount}</span></td>
                            </tr>
                            {voucherDto && (
                                <tr>
                                    <th className="px-4 py-2">Voucher ({voucherDto.voucherCode})</th>
                                    <td className="px-4 py-2"><span className="amount">-{voucherDto.discount.toLocaleString()}</span></td>
                                </tr>
                            )}
                            <tr>
                                <th className="px-4 py-2">Total</th>
                                <td className="px-4 py-2"><strong><span className="amount">{orderDto.afterTotalAmount.toLocaleString()}</span></strong></td>
                            </tr>
                            <tr>
                                <th>
                                    <td><Button type="button" variant="outline" onClick={handleBack}>
                                        Back
                                    </Button></td>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
       






        </>
    );
};

export default OrderDetail;
