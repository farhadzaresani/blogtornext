import {
  hydrate,
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
import { Button, Rating } from "@mui/material";
import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import CommentSection from "../../components/blog/CommentSection";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";

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
  await queryClient.fetchQuery(["comment", id], () =>
    getSingleBlogComments(id)
  );
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
      setNewComment("");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (comments.isLoading || blog.isLoading) {
    return <ImageLoader />;
  }
  console.log("cm", comments);
  // console.log(comments.data);
  // console.log(blog.data);

  return (
    <>
      <Box className="bg-[#3C4048]  m-5 p-5 pb-0 rounded-md ">
        <Container className="p-4 text-black bg-white/70 rounded-lg">
          <h1 className="font-bold  m-4">{blog.data.title}</h1>
          <div></div>
          <p className="">{blog.data.content}</p>
        </Container>
        <Container className="border-t-[1px] pt-2 mt-2 border-[#eeee]">
          <Box className="flex  items-center">
            <Rating
              name="half-rating-read"
              defaultValue={props.score}
              precision={0.5}
              onChange={(e, value) => {
                setRateNum(value);
              }}
            />
            <Button
              onClick={() => rateBlog.mutate(rateNum)}
              className="bg-blue hover:bg-blue/80 text-white active:bg-green"
            >
              Rate
            </Button>
          </Box>
          <CommentSection
            setNewComment={setNewComment}
            post={() => enterComment.mutate(newComment)}
            comments={comments.data}
          />
        </Container>
      </Box>
    </>
  );
};

export default id;
