import { Link } from "react-router-dom";
import Signin from "../Pages/Signin";
function BottomWarning({label,linkText,to}){
    return(
        <div className="flex justify-center">
        <div className="mx-1">{label}</div>
        <Link className="text-blue-600 underline " to={to}>
            {linkText}
        </Link>
        </div>       
    )
}

export default BottomWarning;