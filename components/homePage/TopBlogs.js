import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import BCard from "../blog/BCard";
import TitleBar from "./TitleBar";

const TopBlogs = ({ blogs }) => {
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
                fontSize: "2em",
                margin: "20px",
                opacity: ".8",
              }}
            >
              Top Blogs
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 10,
              height: "100%",
              width: "90%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {blogs.data.map((blog, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    translate: `${animate ? "" : "0 100vw"}`,
                    transitionDuration: "2.5s",
                  }}
                >
                  <BCard
                    key={i}
                    image={blog.imgurl}
                    content={blog.content}
                    name={blog.title}
                    id={blog._id}
                    score={blog.averageScore}
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

export default TopBlogs;
