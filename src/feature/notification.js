import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { LuXCircle } from "react-icons/lu";
export class Toastify {
  success(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
  remove(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progressClassName: "bg-red-600",
      icon:'❌',
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
}
const toastify = new Toastify();
export default toastify;
