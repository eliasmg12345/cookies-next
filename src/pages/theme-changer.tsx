import { useState, useEffect, ChangeEvent, FC } from 'react'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Layout } from '@/components/layouts'
import { GetServerSideProps } from 'next';

import Cookies from "js-cookie";
import axios from "axios";

interface Props {
    theme: string
}
const ThemeChangerPage: FC<Props> = ({ theme }) => {


    const [currentTheme, setCurrentTheme] = useState('light')

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value
        console.log({ selectedTheme });

        setCurrentTheme(selectedTheme)

        localStorage.setItem('theme', selectedTheme)
        //cuando aceptane l manejo de cookies  realmente le estan diciendo: si rastrea la informacion 
        //si estoy buscando teclado graban eso en las cookies 
        Cookies.set('theme', selectedTheme)
        //Las cookies son enviadas al backend en requestTime
        //las cokies viajan al servidor cuando se hace una request
    }

    const onClick = async () => {
        const { data } = await axios.get('/api/hello')

        console.log({ data });

    }

    useEffect(() => {
        console.log('cookies', Cookies.get('theme'));

    }, [])

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={currentTheme}
                            onChange={onThemeChange}
                        >
                            <FormControlLabel value='light' control={<Radio />} label='Light' />
                            <FormControlLabel value='dark' control={<Radio />} label='Dark' />
                            <FormControlLabel value='custom' control={<Radio />} label='Custom' />
                        </RadioGroup>
                    </FormControl>
                    <Button onClick={onClick}>
                        Solicitud
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { theme = 'light', name = 'no name' } = req.cookies

    const validThemes = ['light', 'dark', 'custom']

    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'dark',
            name
        }
    }
}

export default ThemeChangerPage