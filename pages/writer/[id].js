import { Box, Typography } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BCard from "../../components/blog/BCard";
import ImageLoader from "../../components/loader/ImageLoader";
import ProfileHero from "../../components/profile/ProfileHero";
import { getSingleUserData, getUserBlogs, getUsersData } from "../../lib/API's";

export async function getStaticProps({ params }) {
  const { id } = params;
  const queryClient = new QueryClient();
  queryClient.fetchQuery(["data", id], () => getSingleUserData(id));
  queryClient.fetchQuery(["posts", id], () => getUserBlogs(id));
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export async function getStaticPaths() {
  const writers = await getUsersData();
  const paths = writers.map((writer) => {
    return {
      params: {
        id: writer._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const id = (props) => {
  const router = useRouter();
  const userData = useQuery({
    queryFn: () => getSingleUserData(router.query.id),
    queryKey: ["data"],
  });
  const posts = useQuery({
    queryFn: () => getUserBlogs(router.query.id),
    queryKey: ["posts"],
  });
  if (userData.isLoading || posts.isLoading) {
    return <ImageLoader />;
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <ProfileHero
        username={userData.data.username}
        name={userData.data.name}
        bio={userData.data.bio}
        avaragescore={userData.data.avarageScore}
        createdAt={userData.data.createdAt}
        image={userData.data.avatar}
        logedIn={false}
      />
      <Box
        sx={{
          margin: 8,
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
                id={blog._id}
                key={i}
                image={blog.imgurl}
                content={blog.content}
                name={blog.title}
              />
            );
          })
        ) : (
          <Typography
            variant='h4'
            sx={{
              fontWeight: "bolder",
              opacity: "0.3",
            }}
          >
            There is no post
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default id;
