import { useNavigate } from "react-router-dom";
import { logOut } from "../services/logout/logOut";

/* <-----Handle LogOut button -----> */
export const useHandleLogOut = () => {
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {

            const response = await logOut();

            if (!response?.error) {
                navigate('/');
            }

        } catch (error) {
            return error;
        }
    }
    return handleLogOut;
}
