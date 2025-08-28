import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queries";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import toast from "react-hot-toast";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

   if (currentUser) {
       let likesArray = [...likes];

        if (likesArray.includes(userId)) {
          likesArray = likesArray.filter((Id) => Id !== userId);
          toast(" پست از لیست علاقه مندی ها حذف شد",
                {duration: 6000,}
              );
        } else {
          likesArray.push(userId);
          toast.success(" پست به لیست علاقه مندی ها اضافه شد")
        }

        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray });
    }else{
        toast("لطفا لاگین کنید",
        {duration: 6000,}
        );
    }
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (currentUser) {
      if (savedPostRecord) {
        setIsSaved(false);
        toast("ذخیره پست حذف شد",
        {duration: 6000,}
        );
        return deleteSavePost(savedPostRecord.$id);
      }
      savePost({ userId: userId, postId: post.$id });
      setIsSaved(true);
      toast.success("پست ذخیره شد")
    }else{
        toast("لطفا لاگین کنید",
        {duration: 6000,}
        );
    }
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium ">{toPersianNumbers(likes.length)}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />
      </div>
    </div>
  );
};

export default PostStats;
