const StorageHelper = {}
StorageHelper.setToken =  (data) => {
  return localStorage.setItem('token', data)
}
StorageHelper.getToken =  () => {
  return localStorage.getItem('token')
}
StorageHelper.setData =  (data) => {
  return localStorage.setItem('data', JSON.stringify(data))
}
StorageHelper.getData =  () => {
  return JSON.parse(localStorage.getItem('data'))
}

export default StorageHelper
