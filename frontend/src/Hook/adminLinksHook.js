import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useEffect } from "react";
import { setLinks } from "@/redux/slices/adminSlice";

const useAdminLinks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        const res = await axios.get("https://portfolio-website-tnpr.onrender.com/link/get-link", {
          withCredentials: true,
        });
        if (res.data?.success) {
          dispatch(setLinks(res.data.links));
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };

    fetchAllLinks();
  }, []);
};

export default useAdminLinks;
