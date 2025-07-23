import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useEffect } from "react";
import { setAdmin } from "@/redux/slices/adminSlice";

const useGetAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/user/get-admin",
          {
            withCredentials: true,
          }
        );
        if (res.data?.success) {
          dispatch(setAdmin(res.data.admin));
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };

    fetchAdmin();
  }, []);
};

export default useGetAdmin;
