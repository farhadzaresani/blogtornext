import React, { useRef } from "react";
import Image from "next/image";
import styles from "./Profile.module.css";
import { CloseCircle, AddCircle } from "iconsax-react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { FullscreenExit } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#3C4048",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef();

  console.log(props.newAvatar);

  const saveChanges = () => {
    // props.onEdit();
    if (props.newAvatar) {
      props.uploadAvatar();
    }
  };
  console.log(props.image);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade className="rounded-lg flex flex-col" in={props.open}>
          <Box sx={style}>
            <Image
              className="rounded-full  ml-1 border-[2px] border-blue "
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
            <div
              className="  hover:scale-110 transition-all bg-blue cursor-pointer
           rounded-full w-5 h-5  flex justify-center items-center -translate-y-6 translate-x-6  "
            >
              <AddCircleIcon
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
            </div>
            <TextField
              defaultValue={props.data.name}
              onChange={(e) =>
                props.setData({ ...props.data, name: e.target.value })
              }
              id="standard-basic"
              label="Name:"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Bio:"
              multiline
              rows={4}
              variant="standard"
            />
            <Button
              onClick={() => saveChanges()}
              className="bg-blue p-2 mt-2 rounded-md font-bold text-white"
            >
              Save Changes
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
    // <div className=" h-[100vh] bg-cream/80 w-[100vw] absolute z-10 flex top-0">
    //   <div className={`${styles.modal} m-auto p-8`}>
    //     <button className="absolute top-1 left-1" onClick={props.close}>
    //       <CloseCircle size="28" color="rgb(255, 53, 56)" variant="Bold" />
    //     </button>

    //     <div className="flex flex-col justify-center items-center">
    //       {/* <Image
    //         className="rounded-full  ml-1 border-[2px] border-blue "
    //         src="/images/pro.png"
    //         width={120}
    //         height={150}
    //         alt="profle"
    //         priority={""}
    //       /> */}

    //     </div>
    //     <div className="flex flex-col gap-5 mt-5">
    //       <div className="flex flex-col">
    //         <label>Name:</label>
    //         <input
    //           className="rounded-md"
    //           value={props.data.name}
    //           onChange={(e) =>
    //             props.setData({ ...props.data, name: e.target.value })
    //           }
    //           type={"text"}
    //         />
    //       </div>
    //       <div className="flex flex-col">
    //         <label>Bio:</label>
    //         <textarea
    //           value={props.data.bio}
    //           onChange={(e) =>
    //             props.setData({ ...props.data, bio: e.target.value })
    //           }
    //           className="rounded-md resize-none"
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <button
    //         onClick={() => saveChanges()}
    //         className="bg-blue p-2 mt-2 rounded-md font-bold text-white"
    //       >
    //         Save Changes
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default EditModal;
