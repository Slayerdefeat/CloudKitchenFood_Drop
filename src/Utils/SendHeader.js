import StorageHelper from "src/Httphelper"

const getAuthHeader=()=> {
    return {
        headers: {
            "Authorization": StorageHelper.getToken(),
        }
    }
}

export default getAuthHeader