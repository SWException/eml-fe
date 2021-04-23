import { Order, Orders, OrdersData, OrderData } from 'types';
import { APIClass } from 'aws-amplify';
import { sessionService } from './sessionService';

export const fetchOrder = async (orderid: string): Promise<OrderData> => {
    const token = await sessionService.getCookie('token');
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
         }
      };
      const res = await fetch(`${process.env.AWS_ENDPOINT}/order/${orderid}`, requestOptions)
      const data = await res.json();
  
      const orderData: OrderData = {
        order: data.data
      };
      
      console.log("fetchOrder", orderData);
      
      return orderData;
    } catch (error) {
      throw new Error(error);
    }
  };

const fetchOrders = async (): Promise<OrdersData> => {
    const token = await sessionService.getCookie('token');
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
         }
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/orders`, requestOptions);
      const orders = await res.json();
  
      console.log("fetchOrder data", orders.data);
  
      const ordersData: OrdersData = {
        orders: orders.data,
      };
      
      console.log("fetchOrder", ordersData);
  
      return ordersData;
  
    } catch (error) {
      throw new Error('Error on fetching Products');
    }
  };


export const OrdersService = {
  fetchOrder,
  fetchOrders
};