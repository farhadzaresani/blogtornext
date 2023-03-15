import Link from "next/link";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Rating } from "@mui/material";

const BCard = (props) => {
  // const name = props.name[0].toUpperCase() + props.name.slice(1);
  // const bull = (
  //   <Box
  //     component="span"
  //     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  //   >
  //     •
  //   </Box>
  // );
  const [newBlogData, setNewBlogData] = useState({
    blogId: props.id,
    data: {
      title: props.name,
      content: props.content,
      imgurl: "/images/article.png",
    },
  });
  const [deletModal, setDeleteModal] = useState(false);
  const remove = () => {
    props.deleteBlog.mutate({ blogId: props.id });
    setDeleteModal(false);
  };

  const myLoader = () => {
    return <ImageLoader />;
  };
  return (
    <Card sx={{ width: 275, height: 300 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color=''
          gutterBottom
        >
          {props.name}
        </Typography>

        <Box
          sx={{
            height: "20vh",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              mb: 1.5,
              // width: "50%",
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.content}
          </Typography>
        </Box>
        <Rating
          name='half-rating-read'
          defaultValue={props.score}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button className='text-white active:bg-white/50'>
          <Link href={`/blog/${props.id}`}>See More</Link>
        </Button>
      </CardActions>
    </Card>

    // <>
    //   <div
    //     className={`${styles.card} hover:scale-105 duration-300 delay-150 transition-all `}
    //   >
    //     <Link
    //       href={`/blog/${props.id}`}
    //       className=" flex flex-col md:flex-row m-auto p-4 items-center "
    //     >
    //       <Image
    //         className="rounded-full aspect-square object-cover "
    //         loader={myLoader}
    //         priority={true}
    //         src={`${props.image ? `${props.image}` : "/images/pro.png"}`}
    //         width={100}
    //         height={100}
    //         alt="profile"
    //       />
    //       <div>
    //         <p className="font-bold">{props.name}</p>
    //         <p className=" text-opacity-30 truncate w-28 ">
    //           {props.content}...
    //         </p>
    //       </div>
    //     </Link>
    //     {props.isLogedIn && (
    //       <div className=" flex justify-around mb-2 ">
    //         <button
    //           // onClick={() => props.editBlog(props.id, newBlogData)}
    //           onClick={() => props.setOnedit(true)}
    //           className="bg-green p-1 rounded-md  hover:scale-105 transition-all "
    //         >
    //           Edit
    //         </button>
    //         <button
    //           onClick={() => setDeleteModal(true)}
    //           className="bg-red p-1 rounded-md text-cream hover:scale-105 transition-all  "
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     )}
    //   </div>
    //   {props.onEdit && (
    //     <CreateBlog
    //       title={(e) =>
    //         setNewBlogData({
    //           ...newBlogData,
    //           data: { ...newBlogData.data, title: e.target.value },
    //         })
    //       }
    //       content={(e) =>
    //         setNewBlogData({
    //           ...newBlogData,
    //           data: { ...newBlogData.data, content: e.target.value },
    //         })
    //       }
    //       action={() => props.editBlog.mutate(newBlogData)}
    //       closeModal={props.setOnedit}
    //       blogtitle={newBlogData.data.title}
    //       blogcontent={newBlogData.data.content}
    //       discription={"Edit"}
    //     />
    //   )}
    //   {deletModal && (
    //     <div className="bg-cream/20 flex absolute top-0 w-full h-full z-20 ">
    //       <div className=" m-auto bg-white rounded-md p-8 gap-12 flex flex-col ">
    //         <p className=" font-semibold">
    //           Are you sure want to delete this blog?
    //         </p>
    //         <div className=" gap-3 flex">
    //           <button
    //             onClick={() => setDeleteModal(fasle)}
    //             className="  rounded-md "
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             onClick={() => remove()}
    //             className=" border-2 px-1 border-charocoal rounded-md "
    //           >
    //             Yes
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
};

export default BCard;
