export class Order {
    //get order based on status
    async getOrderByStatus({ status, page, limit }) {
        try {
            return await (await fetch(`http://localhost:8080/api/v1/ecommerce/orders/list/admin?status=${status}&page=${page}&limit=${limit}`, {
                credentials: 'include',
                headers: {
                    'accept': 'application/json'
                }
            })).json()
        } catch (error) {
            console.log(error);
        }
    }
    //get order by id
    async getOrderById(_id) {
        try {
            return await (fetch(`http://localhost:8080/api/v1/ecommerce/orders/${_id}`, {
                credentials: 'include',
                headers: {
                    'accept': 'application/json'
                }
            })).json()
        } catch (error) {
            console.log(error);
        }
    }
    //place order using razorpay(payment gateway)
    async placeOrder(address_id) {
        try {
            const response = await (await fetch('http://localhost:8080/api/v1/ecommerce/orders/provider/razorpay', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // body: '{\n  "addressId": "655f72a8d0f9f840fa8491e9"\n}',
                body: JSON.stringify({
                    'addressId': address_id
                })
            })).json();
            const razorpay_order_id = response.data.id;
            if (response) {
                return this.verifyOrder(razorpay_order_id);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    //verify order
    async verifyOrder(razorpay_order_id) {
        try {
            return await(await fetch('http://localhost:8080/api/v1/ecommerce/orders/provider/razorpay/verify-payment', {
                method: 'POST',
                credentials:'include',
                headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                // body: '{\n  "razorpay_order_id": "order_LyeEiwrtVj1rLh",\n  "razorpay_payment_id": "pay_LyeHd4Puzr6c8h",\n  "razorpay_signature": "b1fea28efbca9a5090b60c4f2b5ffabd9b651d2da8c543eaf86a703a7f598c3d"\n}',
                body: JSON.stringify({
                  'razorpay_order_id': razorpay_order_id,
                  'razorpay_payment_id': 'pay_LyeHd4Puzr6c8h', //own payment id changeable
                  'razorpay_signature': 'b1fea28efbca9a5090b60c4f2b5ffabd9b651d2da8c543eaf86a703a7f598c3d' //own payment signature changeable
                })
              })).json()
        } catch (error) {
            console.log(error);
        }

     }
    //update order status
    async updateOrderStatus(order_id,status) {
       try {
           return await (await fetch(`http://localhost:8080/api/v1/ecommerce/orders/status/${order_id}`, {
               method: 'PATCH',
               credentials: 'include',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            // body: '{\n  "status": "DELIVERED"\n}',
            body: JSON.stringify({
               status
            })
          })
            ).json()
       } catch (error) {
        console.log(error);
       }
    }
    //get all orders
    async getAllOrders(page) {
        try {
            return await(await fetch(`http://localhost:8080/api/v1/ecommerce/profile/my-orders?page=${page}&limit=10`, {
                headers: {
                  'accept': 'application/json'
                }
              }) ).json()
        } catch (error) {
            console.log(error);
        }

     }
}
const order = new Order();
export default order;