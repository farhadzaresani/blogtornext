import Image from "next/image";
import React from "react";
import ImageLoader from "../loader/ImageLoader";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

const ProfileHero = (props) => {
  const myLoader = () => {
    return <ImageLoader />;
  };
  return (
    <Container className=" rounded-md flex flex-col bg-[#3C4048] relative pt-4 px-6">
      <div className="mx-auto font-bold text-white uppercase ">
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
          <Button
            onClick={props.onEdit}
            className=" px-6 mt-2 rounded-md hover:bg-blue transition-all duration-300
           from-blue to-blue/70 bg-gradient-to-b text-white "
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className=" p-4 flex flex-col gap-2 ">
        <div>
          <h2 className="font-bold text-white text-xl">{props.name}</h2>
          <p className="m-2 text-white/70">{props.bio}</p>
        </div>
        <div>
          <p>{props.avaragescore}</p>
          <div className="opacity-50 flex tracking-wider">
            created at <p>{props.createdAt?.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileHero;
