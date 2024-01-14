export class Profile {
  async createProfile({ code ="91", firstname, lastname, number }) {
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/ecommerce/profile", {
          method: "PATCH",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            countryCode: code,
            firstName: firstname,
            lastName: lastname,
            phoneNumber: number,
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async getProfile() {
    try {
      return await(await fetch(
        "http://localhost:8080/api/v1/ecommerce/profile",
        {
          credentials:"include",
          headers: {
            accept: "application/json",
          },
        }
      )) .json();
    } catch (error) {
      console.log(error);
    }
  }
  async updateAvatar(image,imageName) {
    try {
      const form = new FormData();
      form.append(
        "avatar",
       new File([image], imageName)
      );
      return await (
        await fetch("http://localhost:8080/api/v1/users/avatar", {
          method: "PATCH",
          credentials:'include',
          headers: {
            accept: "application/json",
          },
          body: form,
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
}
const profile = new Profile();
export default profile;
