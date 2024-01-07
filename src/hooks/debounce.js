import { useEffect,useState  } from "react";
export const useDebounce = (value,delay=1000) => {
    const [query, setQuery] = useState("");
    useEffect(() => {
        let timer = setTimeout(() => {
            setQuery(value);
        },delay )     
      return () => {
       clearTimeout(timer)
      }
    }, [delay,value])
 return query   
}