import { Button, TextField } from "@mui/material";
import React from "react";

const CommentSection = (props) => {
  return (
    <div className=" m-5 ">
      <div className="flex gap-1">
        <TextField
          onChange={(e) => props.setNewComment(e.target.value)}
          type={"text"}
          fullWidth
          placeholder="Write your Comment..."
          className="rounded-md bg-white "
        />
        <Button
          className="bg-blue text-white font-bold uppercase p-2 rounded-md "
          onClick={props.post}
        >
          submit
        </Button>
      </div>
      <div className="flex flex-col gap-1 mt-1 h-24 overflow-auto">
        {props.comments.map((cm, i) => {
          return (
            <div
              key={i}
              className=" bg-white rounded-md flex gap-2  w-full p-2"
            >
              <h2 className="font-bold">{cm.user.name}:</h2>
              <p>{cm.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
