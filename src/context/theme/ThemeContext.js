import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const initialTheme = localStorage.getItem('theme')

  const [theme, setTheme] = useState(initialTheme || 'light')

  const changeTheme = () => {
    if (document.body.classList.contains('dark')) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
