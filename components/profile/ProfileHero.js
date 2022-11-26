import Image from "next/image";
import React from "react";
import ImageLoader from "../loader/ImageLoader";

const ProfileHero = (props) => {
  const myLoader = () => {
    return <ImageLoader />;
  };
  return (
    <div className=" flex flex-col bg-cream/40 relative pt-4 px-6">
      <div className="mx-auto font-bold text-cream uppercase ">
        <p className="tracking-widest">{props.username}</p>
      </div>
      <div className=" px-5 relative ">
        <Image
          className="rounded-full ml-1 border-[2px] aspect-square object-cover "
          src={`${
            props.image
              ? `http://localhost:4000/${props.image}`
              : "/images/pro.png"
          }`}
          loader={myLoader}
          priority={true}
          width={110}
          height={150}
          alt="profle"
        />

        {props.logedIn && (
          <button
            onClick={props.onEdit}
            className=" px-6 mt-2 rounded-md hover:bg-blue transition-all duration-300
           from-blue to-blue/70 bg-gradient-to-b text-cream border-cream "
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className=" p-4 flex flex-col gap-2 ">
        <div>
          <h2 className="font-bold  text-xl">{props.name}</h2>
          <p className="m-2">{props.bio}</p>
        </div>
        <div>
          <p>{props.avaragescore}</p>
          <div className="opacity-50 flex tracking-wider">
            created at <p>{props.createdAt?.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
