import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { PostValidation } from "@/lib/validation";
import  Loader  from "@/components/shared/Loader";
import  FileUploader  from "@/components/shared/FileUploader";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import toast from "react-hot-toast";
import { useUserContext } from "@/hooks/useUserContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PostFormProps } from "@/types";


const PostForm = ({ post, action }: PostFormProps) => {

  const navigate = useNavigate();
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  // Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    // ACTION = آپدیت
    if (post && action === "آپدیت") {
      const updatedPost = await updatePost({
        ...value,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        toast.error(`${action}پست ناموفق بود لطفا دوباره تلاش کنید .`);
      }
      return navigate(`/posts/${post.$id}`);
    }

    // ACTION = ایجاد
    const newPost = await createPost({
      ...value,
      userId: user.id,
    });

    if (!newPost) {
      toast.error( `${action}پست ناموفق بود لطفا دوباره تلاش کنید .`);
    }
    navigate("/home");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl overflow-y-scroll">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">کپشن</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">افزودن تصویر</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">افزودن مکان</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                افزودن تگ ها (با کاماجدا شود " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="هنری , آموزشی"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            لغو
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}>
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} پست
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
