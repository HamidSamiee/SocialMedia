
import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queries";
import toast from "react-hot-toast";

const AllUsers = () => {


  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast.error("Something went wrong.");
    
    return;
  }

  return (
    <div className="common-container ">
      <h2 className="h3-bold md:h2-bold text-right w-full max-w-5xl">کاربران</h2>
      <div className="user-container overflow-y-scroll">
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid ">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
