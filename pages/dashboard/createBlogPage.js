import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import CreateBlog from "../../components/profile/CreateBlog";

const createBlogPage = () => {
  const route = useRouter();
  const goToPage = (address) => {
    route.push(address);
  };
  const cookie = getCookie("ut");
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    imgurl: "/images/article.png",
  });

  const createBlog = useMutation({
    mutationFn: async (data) => {
      return await axios.post("http://localhost:4000/blog/write", data, {
        headers: { auth: `ut ${cookie}` },
      });
    },
    onSuccess: (res) => {
      console.log("succses", res);
    },
  });
  return (
    <CreateBlog
      title={(e) => setBlogData({ ...blogData, title: e.target.value })}
      content={(e) => setBlogData({ ...blogData, content: e.target.value })}
      action={() => createBlog.mutate(blogData)}
    />
  );
};

export default createBlogPage;
