import { useSelector } from "react-redux";
import { selectUser } from "../features/counterSlice";

const useUser = () => {
  return useSelector(selectUser);
};

export default useUser;
