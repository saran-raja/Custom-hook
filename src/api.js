import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Api = ({url,method}) => {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async (data) => {
    setState((prev)=>({...prev ,isLoading: true,error:null}));
    // setState({ ...state, isLoading: true, error: null });
    try {
      const response = await axios[method](url);
      setState({ data: response.data, isLoading: false, error: null });
    } catch (err) {
      console.error(err);
      setState((prev)=>({...prev , isLoading:false ,error: "Unable to fetch " }))
      // setState({ ...state, isLoading: false, error: "Unable to fetch data" });
    }
  }, [url]);


  return { ...state, fetchData };
};

export default Api;
