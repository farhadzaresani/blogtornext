import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/userReducer";

const CommentSection = ({
  cookie,
  setNewComment,
  newComment,
  post,
  comments,
}) => {
  const addCommentWithEnter = (key) => {
    if (key.code === "Enter") {
      post();
    }
  };
  const me = useSelector(selectUser);
  console.log(me);

  return (
    <Box>
      {cookie && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            onKeyDown={addCommentWithEnter}
            type={"text"}
            placeholder='Write your Comment...'
            fullWidth
            sx={{
              bgcolor: "white",
              input: { color: "black" },
              borderRadius: "5px",
            }}
          />
          <Button variant='contained' color='secondary' onClick={post}>
            submit
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          marginTop: 1,
        }}
      >
        {comments.map((cm, i) => {
          console.log("cm", cm);
          return (
            <Box
              key={i}
              sx={{
                bgcolor: "white",
                gap: 0.5,
                padding: 1,
                display: "flex",
                boxShadow: "0 4px 2px -2px gray",
                borderRadius: "3px",
              }}
              // className=' bg-white rounded-md flex gap-2  w-full p-2'
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
                variant='p'
              >
                {cm.userId === me._id ? "you" : cm.user.name}:
              </Typography>
              <Typography variant='p'>{cm.text}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CommentSection;
