import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container h-screen">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className=""
        />
        <h2 className="h3-bold md:h2-bold w-full text-right ">پست های ذخیره شده</h2>
      </div>

      {!currentUser ? (
        <div className="flex-center w-full h-full">
          <div className="text-center">
            <p className="text-light-4 text-lg">لطفا لاگین کنید</p>
          </div>
        </div>
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4"> پستی ذخیره نشده</p>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
