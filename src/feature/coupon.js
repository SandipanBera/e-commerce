export class Coupon {
  //create coupons
  async createCoupons({
    name,
    couponCode,
    type,
    discountValue,
    minimumCartValue,
    expiryDate,
    startDate,
  }) {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/ecommerce/coupons", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: '{\n  "name": "Season sale",\n  "couponCode": "GET600",\n  "type": "FLAT",\n  "discountValue": 600,\n  "minimumCartValue": 700,\n  "expiryDate": "2024-06-13T11:07:10.693Z",\n  "startDate": "2023-02-13T11:07:10.693Z"\n}',
          body: JSON.stringify({
            name: name,
            couponCode: couponCode,
            type: type,
            discountValue: discountValue,
            minimumCartValue: minimumCartValue,
            expiryDate: `${expiryDate}T11:07:10.693Z`,
            startDate: `${startDate}T11:07:10.693Z`,
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCoupons(page = 1, limit = 5) {
    try {
      return await (
        await fetch(
          `http://localhost:8080/api/v1/ecommerce/coupons?page=${page}&limit=${limit}`,
          {
            credentials: "include",
            headers: {
              accept: "application/json",
            },
          }
        )
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async applyCoupon(code) {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/ecommerce/coupons/c/apply", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: '{\n  "couponCode": "GET500"\n}',
          body: JSON.stringify({
            couponCode: code,
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
}
const coupon = new Coupon();
export default coupon;
