import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
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
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Card
        sx={{
          margin: "auto",
          padding: 6,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: "2em",
            opacity: 0.8,
          }}
        >
          {props.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
          </Box>
          <Typography
            variant='p'
            onClick={props.isLoginHandler}
            sx={{
              fontSize: "0.75em",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
          >
            {props.isLogin}
          </Typography>
        </Box>

        <Box>
          <Button
            sx={{ color: "#FF8A65" }}
            onClick={() => props.submitHandler()}
            variant='contained'
          >
            {props.clickTitle}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginSignup;
