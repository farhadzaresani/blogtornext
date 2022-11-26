const CreateBlog = (props) => {
  return (
    <div className="bg-charocoal/50 absolute top-0 flex justify-center items-center w-[100%] h-[100%]">
      <div
        className={`bg-white/80 p-10 z-30 space-y-5 relative rounded-md transition-all duration-300 delay-50 `}
      >
        <button
          onClick={() => props.closeModal(false)}
          className="absolute top-2 left-2"
        >
          X
        </button>
        <div className="uppercase text-charocoal font-bold">
          {props.discription}
        </div>
        <div className="flex flex-col">
          <label>Title:</label>
          <input
            type={"text"}
            value={props.blogtitle}
            onChange={props.title}
            className="rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label>Content:</label>
          <textarea
            value={props.blogcontent}
            onChange={props.content}
            className="w-[30vw] h-[30vh] rounded-md resize-none"
          />
        </div>
        <div>
          <button
            onClick={props.action}
            className="bg-green/75 hover:bg-green active:bg-white 
          px-3 py-1 font-bold uppercase rounded-md "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
