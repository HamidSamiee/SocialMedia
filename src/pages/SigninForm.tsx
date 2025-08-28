import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/hooks/useUserContext";
import { useSignInAccount } from "@/lib/react-query/queries";
import { SigninValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";


const SigninForm = () => {

    const { checkAuthUser} = useUserContext()
    const {mutateAsync : signInAccount ,isPending} = useSignInAccount();
    const navigate = useNavigate();
  
    const form = useForm<z.infer<typeof SigninValidation>>({
      resolver: zodResolver(SigninValidation),
      defaultValues: {
        email: "",
        password: "",
      },
    })
   
   
    async function onSubmit(values: z.infer<typeof SigninValidation>) {
     
      const session = await signInAccount({
          email: values.email,
          password : values.password
        })

        if (!session) {
          return toast.error(' ورود ناموفق بود. لطفا دوباره امتحان کنید')
        }

        const isLogedIn = await checkAuthUser();

        if (isLogedIn) {
          form.reset();
          navigate('/home');
          toast.success(" ورود با موفقیت انجام شد");
        } else {
            throw new Error("احراز هویت انجام نشد");
        }

    }
  
  return (
<div className="mx-2">
      <Form {...form} >
        <div className="sm:w-420 flex-center flex-col mx-2 ">
          <div className="flex gap-2 flex-center">
            <img src="/assets/images/logo.png" alt="logo" className="" />
            <h1 className="h2-bold md:h1-bold">
              اسنپ گرام
            </h1>
          </div>
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
              ورود به  حساب کاربری 
          </h2>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>پست الکترونیکی</FormLabel>
                <FormControl>
                  <Input type="email"  className="shad-input" placeholder="پست الکترونیکی" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>پسورد</FormLabel>
                <FormControl>
                  <Input type="password"  className="shad-input" placeholder="پسورد" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />   
          <Button type="submit" className="shad-button_primary mt-2 w-full font-extrabold text-lg">
            {
              isPending ?
              <div className="flex gap-2 items-center justify-center">
               <Loader />  درحال ورود 
              </div>
              :
              "ورود"
            }
          </Button>
          <p className="text-small-regular text-light-4 text-center mt-2">
            حساب کاربری ندارید؟
            <Link
              to="/sign-up"
              className="text-primary-500 font-semibold text-lg mr-4 ">
            ثبت نام  
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default SigninForm