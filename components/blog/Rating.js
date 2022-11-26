import ReactStars from "react-stars";

const Rating = (props) => {
  return (
    <div>
      <ReactStars
        count={5}
        size={24}
        color2={"#ffd700"}
        value={props.rating}
        onChange={props.setRating}
      />
      {props.isLogedIn && (
        <button
          className={`bg-blue p-1 text-cream rounded-md uppercase font-bold `}
          onClick={() => props.rateBlog.mutate(props.rating)}
        >
          VoteUp!
        </button>
      )}
    </div>
  );
};

export default Rating;
