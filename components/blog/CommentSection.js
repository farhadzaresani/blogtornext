import React from "react";

const CommentSection = (props) => {
  return (
    <div className=" m-5 ">
      <div className="flex gap-1">
        <input
          onChange={(e) => props.setNewComment(e.target.value)}
          type={"text"}
          placeholder="Write your Comment..."
          className="p-2 rounded-md w-full bg-white "
        />
        <button
          className="bg-blue text-cream font-bold uppercase p-2 rounded-md "
          onClick={props.post}
        >
          submit
        </button>
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
