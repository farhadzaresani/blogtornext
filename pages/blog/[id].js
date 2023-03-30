import {
  QueryClient,
  useMutation,
  useQuery,
  dehydrate,
} from "@tanstack/react-query";
import ImageLoader from "../../components/loader/ImageLoader";
import {
  getAllBlogs,
  getSingleBlogComments,
  getSingleBlogData,
} from "../../lib/API's";
import { useEffect, useState } from "react";
import { Button, Rating, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import CommentSection from "../../components/blog/CommentSection";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs.map((blog) => {
    return {
      params: {
        id: blog._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(["data", id], () => getSingleBlogData(id));
  // await queryClient.fetchQuery(["comment", id], () =>
  //   getSingleBlogComments(id)
  // );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 5,
  };
}

const id = (props) => {
  const router = useRouter();

  const blog = useQuery({
    queryFn: () => getSingleBlogData(router.query.id),
    queryKey: ["data"],
  });
  const comments = useQuery({
    queryFn: () => getSingleBlogComments(router.query.id),
    queryKey: ["comment"],
  });

  const [rateNum, setRateNum] = useState(0);
  console.log(rateNum);
  const cookie = getCookie("ut", {});
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    if (hasCookie("ut")) {
      setIsLogedIn(true);
    }
  }, []);

  const rateBlog = useMutation({
    mutationFn: async (rate) => {
      return await axios.post(
        "http://localhost:4000/blog/submit-rate",
        {
          blogId: blog.data._id,
          score: rate,
        },
        {
          headers: { auth: `ut ${cookie}` },
        }
      );
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const enterComment = useMutation({
    mutationFn: async (cm) => {
      return await axios.post(
        "http://localhost:4000/comment/submit",
        {
          text: cm,
          blogId: blog.data._id,
        },
        {
          headers: { auth: `ut ${cookie}` },
        }
      );
    },
    onSuccess: (res) => {
      console.log(res);
      comments.refetch();
      setNewComment("");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (comments.isLoading || blog.isLoading) {
    return <ImageLoader />;
  }

  return (
    <>
      <Container
        sx={{
          minHeight: "100vh",
          marginTop: 5,
          boxShadow: "0 4px 2px -2px gray",
          paddingBottom: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            paddingX: 4,
            paddingY: 2,
            borderRadius: "3px",
            boxShadow: "0 4px 2px -2px gray",
            minHeight: "60vh",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              margin: 1,
            }}
          >
            {blog.data.title}
          </Typography>

          <Typography variant='p'>{blog.data.content}</Typography>
        </Box>
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          {cookie && (
            <Box
              sx={{ display: "flex", alignItems: "center", margin: 1 }}

              // className='flex  items-center'
            >
              <Rating
                name='half-rating-read'
                defaultValue={props.score}
                precision={0.5}
                onChange={(e, value) => {
                  setRateNum(value);
                }}
              />
              <Button
                onClick={() => rateBlog.mutate(rateNum)}
                // disabled={`${cookie ? "false" : "true"}`}
                color='warning'
                size='small'
                variant='text'
                // className='bg-blue hover:bg-blue/80 text-white active:bg-green'
              >
                Rate
              </Button>
            </Box>
          )}
          <CommentSection
            cookie={cookie}
            setNewComment={setNewComment}
            newComment={newComment}
            post={() => enterComment.mutate(newComment)}
            comments={comments.data}
          />
        </Box>
      </Container>
    </>
  );
};

export default id;
