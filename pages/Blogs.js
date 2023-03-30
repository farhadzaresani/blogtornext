import { Box, Typography } from "@mui/material";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import React from "react";
import BCard from "../components/blog/BCard";
import { getAllBlogs } from "../lib/API's";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["data"], getAllBlogs);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

const Blogs = (props) => {
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: getAllBlogs,
  });

  return (
    <Box
      sx={{
        height: "100%",
        padding: 2,
        boxShadow: "0 4px 2px -2px gray",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2em",
          margin: 4,
          textTransform: "uppercase",
        }}
      >
        Blogs
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "wrap",
          justifyContent: "center",
          gap: 10,
          margin: 10,
          flexFlow: "wrap",
        }}
        //  className='flex flex-wrap justify-center gap-10 m-10 h-[100%]'
      >
        {data.map((blog, i) => {
          return (
            <BCard
              key={i}
              image={blog.imgurl}
              content={blog.content}
              name={blog.title}
              id={blog._id}
              score={blog.averageScore}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Blogs;
