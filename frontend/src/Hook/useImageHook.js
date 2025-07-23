import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useEffect } from "react";
import { setImages } from "@/redux/slices/imageSlice";

const useGetImages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/image/get-images",
          { withCredentials: true }
        );
        if (res.data?.success) {
          dispatch(setImages(res.data.image));
        //   toast.success(res.data?.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    };

    fetchAllImages();
  }, []);
};

export default useGetImages; 
