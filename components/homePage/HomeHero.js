import Image from "next/image";
import React from "react";
import ImageLoader from "../loader/ImageLoader";

const HomeHero = () => {
  const myloader = ({ src }) => {
    return <ImageLoader />;
  };
  return (
    <div className=" md:flex md:px-28 md:py-5 md:justify-between ">
      <Image
        src={"/images/people.png"}
        width={250}
        height={400}
        loader={myloader}
        alt="blog tor header"
        priority={true}
        className=" w-auto "
      />
      <div className=" md:w-1/2 flex flex-col justify-center items-center">
        <h1 className="font-bold uppercase text-[2em] md:text-[2.5em]">
          Crate Your Own Blog!
        </h1>
        <p className="text-cream tracking-widest ">
          Show to the world what you got😉
        </p>
      </div>
    </div>
  );
};

export default HomeHero;
