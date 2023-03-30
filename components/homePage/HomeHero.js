import { Box, Link, Paper, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageLoader from "../loader/ImageLoader";
import { InView } from "react-intersection-observer";
import { Container } from "@mui/system";
import TitleBar from "./TitleBar";

const HomeHero = () => {
  const myloader = ({ src }) => {
    return <ImageLoader />;
  };

  const [animate, setAnimate] = useState(false);

  return (
    <InView
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
        <TitleBar
          animate={animate}
          title={" Breaking Barriers: How AI's is Changing the Game"}
          translate={"0 -50vh"}
          color='#94AED7'
        />
        <Box
          sx={{
            overflow: "hidden",
            height: "100vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            padding: { md: 5 },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={"/images/people.png"}
            width={250}
            height={400}
            loader={myloader}
            blurDataURL='data:/images/people.png'
            alt='blog tor header'
            loading='eager'
            priority={true}
            style={{
              width: "auto",
              height: "auto",
              translate: `${animate ? "" : "-100vw"}`,
              transitionDuration: "1s",
            }}
          />
          <Box
            sx={{
              width: {
                md: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
            // className=' md:w-1/2 flex flex-col justify-center items-center'
          >
            <Typography
              variant='h1'
              sx={{
                translate: `${animate ? "" : "100vw"}`,
                transitionDuration: "2s",
                fontWeight: "bold",
                fontSize: { xs: "2em", sm: "3.5em" },
              }}
            >
              Create Your Own Blog!
            </Typography>

            <Typography
              variant='p'
              color={"secondary"}
              sx={{
                translate: `${animate ? "" : "100vw"}`,
                transitionDuration: "1.5s",
              }}
            >
              Show to the world what you got😉
            </Typography>
          </Box>
        </Box>
      </Box>
    </InView>
  );
};

export default HomeHero;
