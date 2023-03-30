import Image from "next/image";
import React from "react";
import ImageLoader from "../loader/ImageLoader";
import Container from "@mui/material/Container";
import { Box, Button, Typography } from "@mui/material";

const ProfileHero = (props) => {
  const myLoader = () => {
    return <ImageLoader />;
  };
  return (
    <Container
      sx={{
        bgcolor: "#121212",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: 5,
      }}
    >
      <Box sx={{ marginX: "auto" }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {props.username}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: 2,
        }}
      >
        <Image
          style={{
            borderRadius: "100%",
            marginLeft: 2,
            border: "2px solid #FF8A65",
            objectFit: "cover",
            width: "100px",
            height: "100px",
          }}
          src={`${
            props.image
              ? `http://localhost:4000/${props.image}`
              : "/images/pro.png"
          }`}
          loader={myLoader}
          priority={true}
          width={110}
          height={150}
          alt='profle'
        />

        {props.logedIn && (
          <Button
            onClick={props.onEdit}
            color='success'
            sx={{
              color: "white",
              margin: "10px 0",
            }}
          >
            Edit Profile
          </Button>
        )}
      </Box>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant='h4'
            sx={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Typography>
          <Typography
            variant='p'
            sx={{
              color: "white",
              margin: 2,
              opacity: ".5",
            }}
          >
            {props.bio}
          </Typography>
        </Box>
        <Box>
          <Typography>{props.avaragescore}</Typography>
          <Box
            sx={{
              opacity: ".5",
              display: "flex",
              gap: 1,
              color: "white",
            }}
            // className='opacity-50 flex tracking-wider'
          >
            <Typography> created at:</Typography>
            <Typography>{props.createdAt?.slice(0, 10)}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileHero;
