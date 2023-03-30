import React, { useRef } from "react";
import Image from "next/image";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Input, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#121212",
  boxShadow: 24,
  p: 4,
};

const EditModal = (props) => {
  const ref = useRef();
  const saveChanges = () => {
    props.onEdit();
    if (props.newAvatar) {
      props.uploadAvatar();
    }
  };
  console.log(props.image);
  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Image
              style={{
                borderRadius: "100%",
                marginLeft: 2,
                border: "1px solid black",
                objectFit: "cover",
                width: "100px",
                height: "100px",
                position: "relative",
              }}
              priority={true}
              src={`${
                props.image
                  ? `http://localhost:4000/${props.image}`
                  : "/images/pro.png"
              }`}
              width={110}
              height={110}
              alt='profile'
            />
            <Box
              sx={{
                transform: "translate(20px,-20px)",
                cursor: "pointer",
              }}
            >
              <Input
                type='file'
                hidden
                inputRef={ref}
                onChange={(e) => props.setNewAvatar(e.target.files[0])}
              />
              <AddCircleIcon
                onClick={() => ref.current.click()}
                size='32'
                variant='Outline'
                color='success'
              />
            </Box>
            <TextField
              defaultValue={props.data.name}
              onChange={(e) =>
                props.setData({ ...props.data, name: e.target.value })
              }
              id='standard-basic'
              label='Name:'
              variant='standard'
            />
            <TextField
              id='standard-basic'
              label='Bio:'
              multiline
              rows={4}
              variant='standard'
            />
            <Button
              onClick={() => saveChanges()}
              className='bg-blue p-2 mt-2 rounded-md font-bold text-white'
            >
              Save Changes
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;
