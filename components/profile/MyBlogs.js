import React from "react";
import { getCookie, getCookies } from "cookies-next";
import { getMyBlogs } from "../../lib/getUsersData";
import { useQuery } from "@tanstack/react-query";
import ImageLoader from "../loader/ImageLoader";
import BCard from "../blog/BCard";
import axios from "axios";

export async function getServerSideProps(context) {
  const token = getCookie("ut", {});
  // const data = await getMyBlogs(token);
  // console.log("cookie:", token);
  const { data } = await axios.get("http://localhost:4000/blog/my-blogs", {
    headers: { auth: `ut ${token}` },
  });
  return {
    props: { data },
  };
}

const MyBlogs = (props) => {
  console.log(props.data);
  // const token = getCookie("ut");
  // const cookie = getCookies("ut");
  // console.log("cookie:", token);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: getMyBlogs,
  //   initialData: props.data,
  // });
  // console.log(isLoading);
  // if (isLoading) {
  //   return <ImageLoader />;
  // }
  // console.log(props.data);

  // const getMyBlogs = async (token) => {
  //   const { data } = await axios.get("http://localhost:4000/blog/my-blogs", {
  //     headers: { auth: `ut ${token}` },
  //   });
  //   console.log(data);
  //   return data;
  // };
  // getMyBlogs(cookie);

  return (
    <>
      <div className=" mx-12 items-center justify-around flex flex-wrap gap-12  ">
        {/* {data.map((blog, i) => {
          return (
            <BCard
              key={i}
              image={blog.imgurl}
              content={blog.content}
              name={blog.title}
            />
          );
        })} */}
      </div>
    </>
  );
};

export default MyBlogs;
