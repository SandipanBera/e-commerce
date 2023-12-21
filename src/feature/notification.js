import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export class Toastify{
    success (message) {
      toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    })
    
  }
}
const toastify = new Toastify();
export default toastify;