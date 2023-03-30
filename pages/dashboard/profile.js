"use Clinet";
import React, { useEffect, useState } from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import EditModal from "../../components/profile/EditModal";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../reducers/userReducer";
import { Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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

const profile = (props) => {
  const route = useRouter();
  const goToPage = (address) => {
    route.push(address);
  };
  const cookie = getCookie("ut");
  const [onEditProfile, setOnEditProfile] = useState(false);
  const [onEdit, setOnedit] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    bio: "",
  });
  const reduxStore = useSelector(selectUser);
  const dispatch = useDispatch();

  //get my blogs
  const posts = useQuery({
    queryFn: () => getMyBlogs(cookie),
    queryKey: ["posts"],
  });

  //get my info
  const userData = useQuery({
    queryFn: () => getMe(cookie),
    queryKey: ["data"],
    onSuccess: (res) => {
      dispatch(setUser(res));
    },
  });

  useEffect(() => {
    console.log(userData.data);
    if (userData.data) {
      setNewData({ name: userData.data.name, bio: userData.data.bio });
      // dispatch(setUser(userData.data));
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
      // console.log(res);
      // getMyData.mutate(cookie);
      setOnEditProfile(false);
      userData.refetch(token);
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
      // console.log(res);
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
      // console.log(res);
      setOnedit(false);
    },
  });
  // console.log("new", posts.data);
  if (posts.isLoading || userData.isLoading) {
    return <ImageLoader />;
  }
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
        <Box>
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
        </Box>
        <Box
          color={"primary"}
          sx={{ "& > :not(style)": { m: 1 }, paddingX: 20 }}
        >
          <Fab
            onClick={() => goToPage("createBlogPage")}
            color='success'
            variant='extended'
          >
            <AddIcon />
            Crate Blog
          </Fab>
        </Box>
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
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
            <Typography
              variant='h4'
              sx={{
                fontWeight: "bolder",
                opacity: ".2",
                margin: "auto",
              }}
            >
              There is no post
            </Typography>
          )}
        </Box>
        {/* <CreateBlog
          title={(e) => setBlogData({ ...blogData, title: e.target.value })}
          content={(e) => setBlogData({ ...blogData, content: e.target.value })}
          action={() => createBlog.mutate(blogData)}
          closeModal={setOpenCreateModal}
          discription={"Create new blog!"}
        /> */}
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
  );
};
export default profile;
