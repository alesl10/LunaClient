import { Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({
    isLogin,
    redirectPath = '/'
}) => {
    if(!isLogin){
return <Navigate to={redirectPath} replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute;