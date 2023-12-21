export class Address {
  //create address
  async createAddress({
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country,
  }) {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/ecommerce/addresses", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  //get addresses
  async getAddress(page) {
    try {
      return await (
        await fetch(
          `http://localhost:8080/api/v1/ecommerce/addresses?page=${page}&limit=10`,
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
  //get addresss by id
  async getAddressById(_id) {
    try {
      return await fetch(
        `http://localhost:8080/api/v1/ecommerce/addresses/${_id}`,
        {
          credentials: "include",
          headers: {
            accept: "application/json",
          },
        }
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  //delete address
  async deleteAddress(_id) {
    try {
      return await (
        await fetch(`http://localhost:8080/api/v1/ecommerce/addresses/${_id}`, {
          method: "DELETE",
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
  //update address
  async updateAddress(_id, { addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country, }) {
    try {
      return await (await fetch(`http://localhost:8080/api/v1/ecommerce/addresses/${_id}`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body: '{\n  "addressLine1": "New lane central, D-203",\n  "addressLine2": "Opposite to central park",\n  "city": "Mumbai",\n  "state": "Maharashtra",\n  "pincode": 409209,\n  "country": "India"\n}',
        body: JSON.stringify({
          'addressLine1': addressLine1,
          'addressLine2': addressLine2,
          'city': city,
          'state': state,
          'pincode': pincode,
          'country': country
        })
      })).json()
    } catch (error) {
      console.log(error);
    }
  }
}
const address = new Address();
export default address;
