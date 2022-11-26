import React, { useRef } from "react";
import Image from "next/image";
import styles from "./Profile.module.css";
import { CloseCircle, AddCircle } from "iconsax-react";

const EditModal = (props) => {
  const ref = useRef();

  console.log(props.newAvatar);

  const saveChanges = () => {
    // props.onEdit();
    if (props.newAvatar) {
      props.uploadAvatar();
    }
  };

  return (
    <div className=" h-[100vh] bg-cream/80 w-[100vw] absolute z-10 flex top-0">
      <div className={`${styles.modal} m-auto p-8`}>
        <button className="absolute top-1 left-1" onClick={props.close}>
          <CloseCircle size="28" color="rgb(255, 53, 56)" variant="Bold" />
        </button>

        <div className="flex flex-col justify-center items-center">
          {/* <Image
            className="rounded-full  ml-1 border-[2px] border-blue "
            src="/images/pro.png"
            width={120}
            height={150}
            alt="profle"
            priority={""}
          /> */}
          <Image
            className="rounded-full  ml-1 border-[2px] border-blue "
            priority={true}
            src={`${
              props.image.length > 1
                ? `http://localhost:4000/${props.image}`
                : "/images/pro.png"
            }`}
            width={150}
            height={150}
            alt="profile"
          />
          <button
            className=" font-bold hover:scale-110 transition-all text-cream hover:text-white bg-blue
          rounded-full w-5 h-5  flex justify-center items-center -translate-y-7 translate-x-10  "
          >
            <AddCircle
              onClick={() => ref.current.click()}
              size="32"
              variant="Outline"
            />
            <input
              onChange={(e) => props.setNewAvatar(e.target.files[0])}
              className="hidden"
              ref={ref}
              type="file"
              name="img"
              accept="image/*"
            />
          </button>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col">
            <label>Name:</label>
            <input
              className="rounded-md"
              value={props.data.name}
              onChange={(e) =>
                props.setData({ ...props.data, name: e.target.value })
              }
              type={"text"}
            />
          </div>
          <div className="flex flex-col">
            <label>Bio:</label>
            <textarea
              value={props.data.bio}
              onChange={(e) =>
                props.setData({ ...props.data, bio: e.target.value })
              }
              className="rounded-md resize-none"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => saveChanges()}
            className="bg-blue p-2 mt-2 rounded-md font-bold text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
