import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import UserCard from "../components/user/UserCard";
import { getUsersData } from "../lib/API's";
import ImageLoader from "../components/loader/ImageLoader";
import { Box, Typography } from "@mui/material";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["data"], getUsersData);
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

const Writers = (props) => {
  // console.log(props.data);
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getUsersData,
  });

  if (isLoading) {
    return <ImageLoader />;
  }
  return (
    <Box
      sx={{
        height: "100%",
        padding: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "2em",
          margin: 4,
          textTransform: "uppercase",
        }}
      >
        Writers
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "wrap",
          justifyContent: "center",
          gap: 10,
          margin: 10,
          flexFlow: "wrap",
        }}
        //  className='flex flex-wrap justify-center gap-10 m-10 h-[100%]'
      >
        {data.map((user, i) => {
          return (
            <UserCard
              key={i}
              image={user.avatar}
              name={user.name}
              bio={user.bio}
              id={user._id}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Writers;
Writers;
