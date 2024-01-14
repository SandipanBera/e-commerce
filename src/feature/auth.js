export class AuthService {
  // constructor use for refresh access token
  constructor() {
    this.refreshToken();
  }
  async userReg({ email, password, role = "USER", username }) {
    // code for register a new user
    try {
      const register = await fetch(
        "http://localhost:8080/api/v1/users/register",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
            role: role,
            username: username,
          }),
        }
      );
      const response = await register.json();
      if (response.statusCode === 200) {
        return this.loginUser({ password, username });
      } else {
        throw response.message;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async currentUser() {
    // code for current login user
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/current-user", {
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
  async loginUser({ password, username }) {
    // code for login user
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/login", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            username: username,
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async logoutUser() {
    // code for log out the user
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
          },
          body: "",
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async assignAdmin(_id) {
    // code for assign admin role
    try {
      return await (
        await fetch(`http://localhost:8080/api/v1/users/assign-role/${_id}`, {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            role: "ADMIN",
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async changePassword({ oldPassword, newPassword }) {
    // code for reset password
    try {
      return await (
        await fetch("http://localhost:8080/api/v1/users/change-password", {
          method: "POST",
          credentials: "include",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          // body: '{\n  "newPassword": "test@123",\n  "oldPassword": "new@123"\n}',
          body: JSON.stringify({
            newPassword: newPassword,
            oldPassword: oldPassword,
          }),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  async refreshToken() {
    try {
      await fetch("http://localhost:8080/api/v1/users/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
const authService = new AuthService();
export default authService;
