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
    <div className="flex flex-wrap justify-center gap-10 m-10">
      {data.map((blog, i) => {
        return (
          <BCard
            key={i}
            image={blog.imgurl}
            content={blog.content}
            name={blog.title}
            id={blog._id}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
