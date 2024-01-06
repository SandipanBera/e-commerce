export class Product{
    //create prodduct
    async createProduct({category,description,mainImage,name,price,stock,subImages},mainImageName,subImagesName) {
      try {
        const form = new FormData();
      form.append('category', category);
      form.append('description', description);
      form.append('mainImage',new File([mainImage],mainImageName ));
      form.append('name', name);
      form.append('price', price);
      form.append('stock', stock);
      form.append('subImages',new File([subImages],subImagesName ));
    return await(await fetch('http://localhost:8080/api/v1/ecommerce/products', {
        method: 'POST',
        credentials:'include',
        headers: {
          'accept': 'application/json',
        },
        body: form
     })).json()
      } catch (error) {
        console.log(error);
      }  
  }
  //get all product
  async getAllProduct(page=1,limit=20) {
    try {
      return await (await fetch(`http://localhost:8080/api/v1/ecommerce/products?page=${page}&limit=${limit}`, {
        credentials: 'include',
        headers: {
          'accept': 'application/json'
        }
      })).json()
    } catch (error) {
      console.log(error);
    }
  }
  //get product by id
  async getProductById(_id) { 
    try {
      return await (await fetch(`http://localhost:8080/api/v1/ecommerce/products/${_id}`, {
        credentials:'include',
       headers: {
         'accept': 'application/json'
       }
     })).json();
    } catch (error) {
      console.log(error);
    }
  }
  async getProductByCategoryId(_id,page=1) {
    try {
      return await (await fetch(`http://localhost:8080/api/v1/ecommerce/products/category/${_id}?page=${page}&limit=10`, {
        credentials:'include',
        headers: {
          'accept': 'application/json'
        }
      })).json()
    } catch (error) {
      console.log(error);
    }
  }
  //delete product
  async deleteProduct(_id,) {
    try {
      return await (await fetch(`http://localhost:8080/api/v1/ecommerce/products/${_id}`, {
        credentials:'include',
        method: 'DELETE',
        headers: {
          'accept': 'application/json'
        }
      })
      ).json()
    } catch (error) {
      console.log(error);
    }
  }
  //update product 
  async updateProduct(_id,mainImageName,subImagesName,{category,description,mainImage,name,price,stock,subImages }) {
    try {
      const form = new FormData();
      form.append('category', category);
      form.append('description', description);
      form.append('mainImage',new File([mainImage],mainImageName ));
      form.append('name', name);
      form.append('price', price);
      form.append('stock', stock);
      form.append('subImages',new File([subImages],subImagesName ));
    return await ( 
      await fetch(`http://localhost:8080/api/v1/ecommerce/products/${_id}`, {
        method: 'PATCH',
        credentials:'include',
        headers: {
          'accept': 'application/json',
          
        },
        body: form
      })).json();
    } catch (error) {
      console.log(error);
      
    }
  }
}
const product = new Product();
export default product;