import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import React from "react";

const LoginSignup = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const enterKey = (e) => {
    if (e.key === "Enter") {
      props.submitHandler();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className=' flex min-h-[80vh] h-full w-full'>
      <Card
        className='m-auto   rounded-md  py-10 px-5 flex flex-col
       gap-10 font-bold  justify-center items-center'
      >
        <h1 className='text-2xl  opacity-80'>{props.title}</h1>
        <div className='flex flex-col gap-5'>
          <FormControl variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              {props.firstLabel}
            </InputLabel>
            <OutlinedInput
              onChange={(e) =>
                props.setUserData({
                  ...props.userData,
                  username: e.target.value,
                })
              }
              onKeyDown={enterKey}
              id='outlined-adornment-password'
              type={"text"}
              label='username'
            />
          </FormControl>
          <div className='flex  justify-between'>
            {props.title === "Login" ? (
              <>
                <FormControl variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    {props.secondLabel}
                  </InputLabel>
                  <OutlinedInput
                    onChange={(e) =>
                      props.setUserData({
                        ...props.userData,
                        password: e.target.value,
                      })
                    }
                    onKeyDown={enterKey}
                    id='outlined-adornment-password'
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </>
            ) : (
              <FormControl variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  {props.secondLabel}
                </InputLabel>
                <OutlinedInput
                  onChange={(e) =>
                    props.setUserData({
                      ...props.userData,
                      name: e.target.value,
                    })
                  }
                  onKeyDown={enterKey}
                  id='outlined-adornment-password'
                  type={"text"}
                  label='name'
                />
              </FormControl>
            )}
          </div>
          <p
            onClick={props.isLoginHandler}
            className='text-xs cursor-pointer hover:text-blue'
          >
            {props.isLogin}
          </p>
        </div>

        <div>
          <Button
            sx={{ bgcolor: "#FF8A65" }}
            // color='#FF8A65'
            onClick={() => props.submitHandler()}
            variant='contained'
          >
            {props.clickTitle}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginSignup;
