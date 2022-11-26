"use Clinet";
import React, { useEffect, useState } from "react";
import { setUser } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import ProfileHero from "../../components/profile/ProfileHero";
import { useRouter } from "next/router";
import EditModal from "../../components/profile/EditModal";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import ImageLoader from "../../components/loader/ImageLoader";
import { Add } from "iconsax-react";
import CreateBlog from "../../components/profile/CreateBlog";
import { getMe, getMyBlogs } from "../../lib/getUsersData";
import BCard from "../../components/blog/BCard";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("ut", { req, res });
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(["posts", token], () => getMyBlogs(token));
  await queryClient.fetchQuery(["data", token], () => getMe(token));
  // const posts = await getMyBlogs(token);
  // const data = await getMe(token);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

const profile = (props) => {
  //get my blogs
  const posts = useQuery({
    queryFn: () => getMyBlogs(cookie),
    queryKey: ["posts"],
  });

  //get my info
  const userData = useQuery({
    queryFn: () => getMe(cookie),
    queryKey: ["data"],
  });

  const cookie = getCookie("ut", {});
  const [onEditProfile, setOnEditProfile] = useState(false);
  const [onEdit, setOnedit] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    bio: "",
  });
  const [newAvatar, setNewAvatar] = useState(null);

  //edit Profile data
  const editProfile = useMutation({
    mutationFn: async (token) => {
      return await axios.post("http://localhost:4000/user/edit", newData, {
        headers: { auth: `ut ${token}` },
      });
    },
    onSuccess: (res) => {
      console.log(res);
      getMyData.mutate(cookie);
      setOnEditProfile(false);
    },
  });

  //update profile picture
  const uploadAvatar = useMutation({
    mutationFn: async (file) => {
      return await axios.post(
        "http://localhost:4000/user/update-avatar",
        file,
        {
          headers: { auth: `ut ${cookie}` },
        }
      );
    },
    onSuccess: (res) => {
      console.log(res);
      getMyData.mutate(cookie);
      setOnEditProfile(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const submitAvatar = (data) => {
    const formData = new FormData();
    formData.append("avatar", data);
    uploadAvatar.mutate(formData);
  };

  //create new blog
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
      setOpenCreateModal(false);
    },
  });

  const editBlog = useMutation({
    mutationFn: async (data) => {
      return await axios.post("http://localhost:4000/blog/edit", data, {
        headers: { auth: `ut ${cookie}` },
      });
    },
    onSuccess: (res) => {
      console.log(res);
      setOnedit(false);
    },
  });
  const deleteBlog = useMutation({
    mutationFn: async (data) => {
      return await axios.post("http://localhost:4000/blog/delete", data, {
        headers: { auth: `ut ${cookie}` },
      });
    },
    onSuccess: (res) => {
      console.log(res);
      setOnedit(false);
    },
  });

  if (posts.isLoading || userData.isLoading) {
    return <ImageLoader />;
  }
  return (
    <div>
      {onEditProfile && (
        <EditModal
          onEdit={() => editProfile.mutate(cookie)}
          close={() => setOnEditProfile(false)}
          data={newData}
          setData={setNewData}
          setNewAvatar={setNewAvatar}
          newAvatar={newAvatar}
          uploadAvatar={() => submitAvatar(newAvatar)}
          image={userData.data.avatar}
        />
      )}
      <ProfileHero
        username={userData.data.username}
        name={userData.data.name}
        bio={userData.data.bio}
        avaragescore={userData.data.avarageScore}
        createdAt={userData.data.createdAt}
        image={userData.data.avatar}
        onEdit={() => setOnEditProfile(true)}
        logedIn={true}
      />
      <button
        onClick={() => setOpenCreateModal(true)}
        className="bg-green/70 hover:bg-green transition-all duration-300
       uppercase font-bold px-3 py-1 rounded-md flex m-4 text-charocoal "
      >
        Create new blog
        <Add size="22" variant="Bold" />
      </button>
      {openCreateModal && (
        <CreateBlog
          title={(e) => setBlogData({ ...blogData, title: e.target.value })}
          content={(e) => setBlogData({ ...blogData, content: e.target.value })}
          action={() => createBlog.mutate(blogData)}
          closeModal={setOpenCreateModal}
          discription={"Create new blog!"}
        />
      )}
      <div className=" m-12 items-center justify-around flex flex-wrap gap-12  ">
        {posts.data.map((blog, i) => {
          return (
            <BCard
              key={i}
              image={blog.imgurl}
              content={blog.content}
              name={blog.title}
              id={blog._id}
              isLogedIn={true}
              setOnedit={setOnedit}
              onEdit={onEdit}
              editBlog={editBlog}
              deleteBlog={deleteBlog}
            />
          );
        })}
      </div>
    </div>
  );
};

export default profile;
