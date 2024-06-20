import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import LoginIllustration from "assets/images/login.svg"
import { useState } from "react"
import { login } from "service/authService"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "constants/routes"
import { CONSTANTS } from "constants/constants"

interface userInterface {
  email: string,
  password: string
}

const Login = () => {
  const [details, setDetails] = useState<userInterface>({email: '', password: ''})
  const navigate = useNavigate();

  const handleLogin = () => {
    login(details)
    .then((res) => {
      localStorage.setItem('id', res.data.id)
      console.log(CONSTANTS.LOGGED_IN_SUCCESSFUL);
      navigate(ROUTES.DASHBOARD)
    })
    .catch((err) => console.error(err))
  }

  const handleChange = (property: 'email' | 'password', event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({...prev, [property]: event.target.value}))
  }

  return (
    <Grid container alignItems='center' height='100%' className='login'>
      <Grid item xs={8} alignItems='center'>
        <img src={LoginIllustration} alt='people having conversation' style={{height: '80vh', width: '100%'}} />
      </Grid>
      <Grid item xs={4} sx={{backgroundColor: '#5046e5', height: '100%',  padding:'60px 80px', display:'flex', alignItems:'center'}}>
        <Box>
          <Typography variant='h4' fontWeight='600' color='#FFF'>Login</Typography>
          <Typography variant='h5' color='#FFF' pt={1}>Welcome back! Please login to your account</Typography>
          <TextField variant='outlined' label='Username' type='text' required={true} sx={{mt: 4}} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e)} />
          <TextField variant='outlined' label='Password' type='password' required={true} sx={{mt: 2}} fullWidth onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e)}/>
          <Button fullWidth variant='contained' sx={{mt: 2}} onClick={handleLogin}>Login</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Login;