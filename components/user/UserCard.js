import React from "react";
import Image from "next/image";
import style from "./User.module.css";
import Link from "next/link";
import ImageLoader from "../loader/ImageLoader";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function UserCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Link
      className=" hover:scale-105
       transition-all duration-500 delay-200 cursor-pointer "
      href={`/writer/${props.id}`}
    >
      <Card sx={{ maxWidth: 345, bgcolor: "#3C4048" }}>
        <CardHeader className="text-white" title={props.name} />
        <CardMedia
          component="img"
          height="140"
          image={`${
            props.image
              ? `http://localhost:4000/${props.image}`
              : "/images/pro.png"
          }`}
          alt={props.name}
        />
        <CardContent>
          <Typography variant="body2">{props.bio}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default UserCard;
