import  {useState, useEffect} from 'react'

export const useLightMode
 = () => { 
  const [theme, setTheme] = useState("dark")

  const toggleTheme = ()=>{
    setTheme(prev => (prev === "dark" ? "light" : "dark"))

  }

  useEffect(()=>{
    document.documentElement.className = theme;

  }, [theme])

  return (
    [theme, toggleTheme]
  )
}

