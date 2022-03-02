import React from 'react'

const NxtContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
})

export default NxtContext
