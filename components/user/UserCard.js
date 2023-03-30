import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { Box } from "@mui/system";
// import { Scale } from "@mui/icons-material";

function UserCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Link href={`/writer/${props.id}`}>
      <Card
        sx={{
          width: 250,
          maxHeight: 330,
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "1px 1px 20px 1px black",
          },
        }}
      >
        <CardHeader className='text-white' title={props.name} />
        <Box
          sx={{
            width: "200px",
            height: "200px",
          }}
        >
          <Image
            style={{
              objectFit: "cover",
              borderRadius: "10%",
              width: "200px",
              height: "200px",
            }}
            component='img'
            height={200}
            width={200}
            src={`${
              props.image
                ? `http://localhost:4000/${props.image}`
                : "/images/pro.png"
            }`}
            alt={props.name}
          />
        </Box>
        <CardContent>
          <Rating
            name='half-rating-read'
            // defaultValue={props.score}
            value={props.score}
            precision={0.5}
            readOnly
          />
          <Box
            sx={{
              height: 10,
            }}
          >
            <Typography variant='body2'>{props.bio}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default UserCard;
