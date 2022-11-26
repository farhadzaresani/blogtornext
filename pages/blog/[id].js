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
} from "../../lib/getUsersData";
import { useEffect, useState } from "react";

import axios from "axios";
import { getCookie, hasCookie } from "cookies-next";
import Rating from "../../components/blog/Rating";
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
  await queryClient.fetchQuery(["comment", id], () =>
    getSingleBlogComments(id)
  );

  // const data = await getSingleBlogData(params.id);
  // const posts = await getSingleBlogComments(params.id);
  // console.log(params.id);
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

  // const comments = useQuery({
  //   queryFn: () => getSingleBlogComments(props.data._id),
  //   queryKey: ["posts"],
  //   initialData: props.posts,
  // });

  const [rateNum, setRateNum] = useState(0);
  // console.log(rating);
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
          blogId: data._id,
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
          blogId: data._id,
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

  if (comments.isLoading || blog.isLoading) {
    return <ImageLoader />;
  }
  // console.log(comments.data);
  // console.log(blog.data);

  return (
    <>
      <div className="bg-cream/80 m-4 p-2 rounded-md ">
        <h1 className="font-bold m-4">{blog.data.title}</h1>
        <div>
          {/* <Rating
            setRating={setRateNum}
            isLogedIn={isLogedIn}
            rateBlog={rateBlog}
            rating={rateNum} 
  />*/}
        </div>
        <p>{blog.data.content}</p>
      </div>
      <div>
        <CommentSection
          setNewComment={setNewComment}
          post={() => enterComment.mutate(newComment)}
          comments={comments.data}
        />
      </div>
    </>
  );
};

export default id;
