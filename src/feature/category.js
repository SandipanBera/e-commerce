export class Category {
  async createCategory({ productName }) {
    // code for create catagory
    try {
      return await(await fetch("http://localhost:8080/api/v1/ecommerce/categories", {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: '{\n  "name": "shirts"\n}',
        body: JSON.stringify({
          name: productName,
        }),
      })).json();
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCategories() {
    try {
      return await(await fetch(
        "http://localhost:8080/api/v1/ecommerce/categories?page=1&limit=10",
        {
          credentials: "include",
          headers: {
            accept: "application/json",
          },
        }
      )).json();
    } catch (error) {
      console.log(error);
    }
  }
  async getCategory(_id) {
    try {
      return await(await fetch(
        `http://localhost:8080/api/v1/ecommerce/categories/${_id}`,
        {
          credentials: "include",
          headers: {
            accept: "application/json",
          },
        }
      )).json();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCategory(_id) {
    try {
      return await(await fetch(
        `http://localhost:8080/api/v1/ecommerce/categories/${_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            accept: "application/json",
          },
        }
      )).json();
    } catch (error) {
      console.log(error);
    }
  }
  async updateCategory(_id, name) {
    try {
      return await(await fetch(
        `http://localhost:8080/api/v1/ecommerce/categories/${_id}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: '{\n  "name": "womens-wear"\n}',
          body: JSON.stringify({
             name,
          }),
        }
      )).json();
    } catch (error) {
      console.log(error);
    }
  }
}
const category = new Category();
export default category;
