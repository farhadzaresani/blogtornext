"use Clinet";
import React, { useEffect, useState } from "react";
import { setUser, thisUser } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
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
import { getMe, getMyBlogs } from "../../lib/API's";
import BCard from "../../components/blog/BCard";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMemo } from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const cookie = getCookie("ut");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [onEditProfile, setOnEditProfile] = useState(false);
  const [onEdit, setOnedit] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    bio: "",
  });
  useEffect(() => {
    if (userData.data) {
      setNewData({ name: userData.data.name, bio: userData.data.bio });
    }
  }, [userData.data]);
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
      // getMyData.mutate(cookie);
      setOnEditProfile(false);
    },
  });

  // const catchedData = useMemo(userData.data, []);
  console.log(userData.data);

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
      // getMyData.mutate(cookie);
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
  // const redux = useSelector(thisUser);
  // console.log("thisuser", redux);
  // useEffect(() => {
  //   if (userData.data && userData.data !== newData) {
  //     setNewData({ name: userData.data.name, bio: userData.data.bio });
  //   }
  // }, []);

  console.log("new", posts.data);
  if (posts.isLoading || userData.isLoading) {
    return <ImageLoader />;
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Create Blog" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
          <div className=" m-12 items-center justify-around flex flex-wrap gap-12  ">
            {posts.data.length > 0 ? (
              posts.data.map((blog, i) => {
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
              })
            ) : (
              <h1 className="text-2xl font-extrabold text-[#3C4048]/50 ">
                There is no post
              </h1>
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateBlog
            title={(e) => setBlogData({ ...blogData, title: e.target.value })}
            content={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
            action={() => createBlog.mutate(blogData)}
            closeModal={setOpenCreateModal}
            discription={"Create new blog!"}
          />
        </TabPanel>
      </Box>

      <EditModal
        onEdit={() => editProfile.mutate(cookie)}
        close={() => setOnEditProfile(false)}
        open={onEditProfile}
        data={newData}
        setData={setNewData}
        setNewAvatar={setNewAvatar}
        newAvatar={newAvatar}
        uploadAvatar={() => submitAvatar(newAvatar)}
        image={userData.data.avatar}
      />
    </>
    // <div>

    //   <button
    //     onClick={() => setOpenCreateModal(true)}
    //     className="bg-green/70 hover:bg-green transition-all duration-300
    //    uppercase font-bold px-3 py-1 rounded-md flex m-4 text-charocoal "
    //   >
    //     Create new blog
    //     <Add size="22" variant="Bold" />
    //   </button>

    //   <div className=" m-12 items-center justify-around flex flex-wrap gap-12  ">

    //   </div>
    // </div>
  );
};
export default profile;
