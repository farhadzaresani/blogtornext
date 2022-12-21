import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import UserCard from "../components/user/UserCard";
import { getUsersData } from "../lib/API's";
import ImageLoader from "../components/loader/ImageLoader";

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
    <>
      <h1 className="uppercase font-bold text-2xl m-10">Writers</h1>
      <div className="flex flex-wrap justify-center gap-10 m-10">
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
      </div>
    </>
  );
};

export default Writers;
Writers;
