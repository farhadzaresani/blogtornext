import { Box, Typography } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { dehydrate } from "react-query";
import BCard from "../components/blog/BCard";
import HomeHero from "../components/homePage/HomeHero";
import ImageLoader from "../components/loader/ImageLoader";
import UserCard from "../components/user/UserCard";
import { getTopBlogs, getTopUsers } from "../lib/API's";
import styles from "../styles/Home.module.css";
import { useInView } from "react-intersection-observer";
import TopWriters from "../components/homePage/TopWriters";
import TopBlogs from "../components/homePage/TopBlogs";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["posts"],
    getTopBlogs && ["data"],
    getTopUsers
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home(props) {
  const users = useQuery({
    queryKey: ["data"],
    queryFn: getTopUsers,
  });
  const blogs = useQuery({
    queryKey: ["post"],
    queryFn: getTopBlogs,
  });

  if (blogs.isLoading || users.isLoading) {
    return <ImageLoader />;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Blog</title>
        <meta name='Blog to next app' content='Generated by create next app' />
        <link rel='icon' href='/blogtor.png' />
      </Head>
      <main>
        <HomeHero />
        <TopWriters users={users} />
        <TopBlogs blogs={blogs} />
      </main>
    </div>
  );
}
