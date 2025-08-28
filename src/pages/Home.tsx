import { Models } from "appwrite";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";

const Home = () => {
  

  const {data: posts,isPending: isPostLoading,isError: isErrorPosts} = useGetRecentPosts();
  const {data: creators,isPending: isUserLoading,isError: isErrorCreators} = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">اتفاق بدی افتاد</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">اتفاق بدی افتاد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen">
      <div className="home-container">
        <div className="home-posts ">
          <div className="w-full flex justify-start items-center gap-6">
            <img src="/assets/icons/home.svg" alt="home" />
            <h3 className="h3-bold  text-light-3">صفحه اصلی</h3>
          </div>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-creators  overflow-y-scroll">
        <h3 className="h3-bold  text-light-3">برترین کاربران</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
