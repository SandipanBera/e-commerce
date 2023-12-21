export class Cart {
    //get cart details
    async getCart() {
       try {
         return await (
             await fetch("http://localhost:8080/api/v1/ecommerce/cart", {
                 credentials: "include",
                 headers: {
                     accept: "application/json",
                 },
             })
         ).json();
       } catch (error) {
        console.log(error);
       }
    }
    //add product in cart
    async addProduct(_id, quantity=1) {
        try {
            return await (
                await fetch(`http://localhost:8080/api/v1/ecommerce/cart/item/${_id}`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantity: quantity,
                    }),
                })
            ).json();
        } catch (error) {
            console.log(error);
        }
    }
    //remove product from cart
    async removeProduct(_id) {
        try {
            return await(await fetch(`http://localhost:8080/api/v1/ecommerce/cart/item/${_id}`, {
                method: 'DELETE',
                credentials:'include',
                headers: {
                  'accept': 'application/json'
                }
              })).json()
        } catch (error) {
            console.log(error);
        }
    }
    //clear cart
    async clearCart() { 
        try {
            return await(await fetch('http://localhost:8080/api/v1/ecommerce/cart/clear', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                  'accept': 'application/json'
                }
              })).json()
        } catch (error) {
            console.log(error);
        }
    }
}
const cart = new Cart();
export default cart;
