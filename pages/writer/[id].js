import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BCard from "../../components/blog/BCard";
import ImageLoader from "../../components/loader/ImageLoader";
import ProfileHero from "../../components/profile/ProfileHero";
import {
  getSingleUserData,
  getUserBlogs,
  getUsersData,
} from "../../lib/getUsersData";

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
  if (userData.isLoading) {
    return <ImageLoader />;
  }
  return (
    <div>
      <ProfileHero
        username={userData.data.username}
        name={userData.data.name}
        bio={userData.data.bio}
        avaragescore={userData.data.avarageScore}
        createdAt={userData.data.createdAt}
        image={userData.data.avatar}
        logedIn={false}
      />
      <div className=" m-12 items-center justify-around flex flex-wrap gap-12  ">
        {posts.data.map((blog, i) => {
          return (
            <BCard
              key={i}
              image={blog.imgurl}
              content={blog.content}
              name={blog.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default id;
