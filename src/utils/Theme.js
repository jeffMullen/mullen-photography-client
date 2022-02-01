import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F7F7F7',
            light: '#F7F7F7',
            dark: '#EFEFEF',
        },
        secondary: {
            main: '#143109',
            light: '#143109',
            dark: '#143109',
        }
    },
    typography: {
        fontSize: 16,
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
})

export default theme;