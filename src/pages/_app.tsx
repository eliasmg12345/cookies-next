import '@/styles/globals.css'
import { darkTheme, customTheme, lightTheme } from '@/themes'
import { ThemeProvider, CssBaseline, Theme } from '@mui/material'
import type { AppContext, AppProps } from 'next/app'
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';

interface Props extends AppProps {
  theme: string
}
export default function App({ Component, pageProps, theme = 'dark' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
        ? darkTheme
        : customTheme
    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

/*
App.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
  const validThemes = ['light', 'dark', 'custom']

  // console.log('getinitial', cookies);

  return {
    theme: validThemes.includes(theme) ? theme : 'dark',

  }
}
*/