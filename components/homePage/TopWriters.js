import { Typography, Box, Link, Button } from "@mui/material";
import React from "react";
import UserCard from "../user/UserCard";
import { InView } from "react-intersection-observer";
import { useState } from "react";
import ImageLoader from "../loader/ImageLoader";
import TitleBar from "./TitleBar";

const TopWriters = ({ users }) => {
  const [animate, setAnimate] = useState(false);

  // console.log("users", users);

  if (users.isRefetching) {
    return <ImageLoader />;
  }
  return (
    <InView
      threshold={0.2}
      as='div'
      onChange={(inView, entry) => {
        if (inView) {
          setAnimate(true);
        }
      }}
    >
      <Box
        sx={{
          boxShadow: "0 4px 2px -2px gray",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
          }}
        ></Box>
        <Box
          sx={{
            padding: 14,
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant='h1'
              sx={{
                translate: `${animate ? "" : "0 100vw"}`,
                transitionDuration: "2s",
                fontWeight: "bold",
                fontSize: { xs: "1.5em", sm: "2em" },
                margin: "20px",
                opacity: ".7",
              }}
            >
              Top Writers
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 10,
              height: "100vh",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            {users.data &&
              users.data.map((user, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      translate: `${animate ? "" : "0 100vw"}`,
                      transitionDuration: "2.5s",
                    }}
                  >
                    <UserCard
                      image={user.avatar}
                      name={user.name}
                      bio={user.bio}
                      id={user._id}
                      score={user.averageScore}
                    />
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingX: 4,
            paddingY: 1,
          }}
        >
          <Button color='success'>See more!</Button>
        </Box>
      </Box>
    </InView>
  );
};

export default TopWriters;
