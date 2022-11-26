import React from "react";
import Image from "next/image";
import style from "./User.module.css";
import Link from "next/link";
import ImageLoader from "../loader/ImageLoader";
function UserCard(props) {
  // const writerName = props.name[0].toUpperCase() + props.name.slice(1);
  const myLoader = () => {
    return <ImageLoader />;
  };
  return (
    <Link
      href={`/writer/${props.id}`}
      className={`${style.card} p-6 gap-2 flex flex-col px-10 hover:scale-105 
      transition-all duration-500 delay-200 cursor-pointer  items-center`}
    >
      <Image
        className="rounded-md aspect-square object-cover "
        loader={myLoader}
        priority={true}
        src={`${
          props.image
            ? `http://localhost:4000/${props.image}`
            : "/images/pro.png"
        }`}
        width={150}
        height={150}
        alt="profile"
      />
      <div className="gap-5 flex flex-col">
        <p className="font-bold text-lg">{props.name}</p>
        <p>{props.bio}</p>
      </div>
    </Link>
  );
}

export default UserCard;
