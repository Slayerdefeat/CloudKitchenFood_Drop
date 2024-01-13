const { Navigate } = require("react-router-dom")
const { default: StorageHelper } = require("src/Httphelper")

const Protection=({children})=>{
    const token=StorageHelper.getToken()
    if(!token){
        return <Navigate to="/login"/>
    }
    return children


}
export default Protection

