import React, { useState, createContext } from 'react'
const CustomeContext = createContext()
const CutomeProvider = ({ children }) => {
  const [data, setData] = useState('king')

  return <CustomeContext.Provider value={{ data }}>{children}</CustomeContext.Provider>
}
export { CutomeProvider }
export default CustomeContext
