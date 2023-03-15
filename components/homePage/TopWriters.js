import { Typography, Box } from "@mui/material";
import React from "react";
import UserCard from "../user/UserCard";
import { InView } from "react-intersection-observer";
import { useState } from "react";

const TopWriters = ({ users }) => {
  const [animate, setAnimate] = useState(false);

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
          padding: 14,
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box className=''>
          <Typography
            variant='h1'
            sx={{
              translate: `${animate ? "" : "0 100vw"}`,
              transitionDuration: "2s",
              fontWeight: "bold",
              fontSize: { xs: "1.5em", sm: "2em" },
              margin: "10px 0",
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
            users?.data?.map((user, i) => {
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
    </InView>
  );
};

export default TopWriters;
