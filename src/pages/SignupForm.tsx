import { SignupValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries"
import { useUserContext } from "@/hooks/useUserContext"
import toast from "react-hot-toast"
const SignupForm = () => {

  const { checkAuthUser} = useUserContext()
  const {mutateAsync : createUserAccount, isPending : isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync : signInAccount} = useSignInAccount();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
 
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
      try{
        const newUser = await createUserAccount(values)
        
        if(!newUser){
          return toast.error('ثبت نام ناموفق بود. لطفا دوباره امتحان کنید')
        }

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
          toast.success("ثبت نام و ورود با موفقیت انجام شد");
        } else {
            throw new Error("احراز هویت انجام نشد");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(
            error.message.includes('already exists') 
              ? 'این ایمیل قبلاً ثبت‌نام کرده است' 
              : error.message || 'خطا در ثبت‌نام'
          );
        } else {
          toast.error('خطای ناشناخته رخ داده است');
        }
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
              ایجاد حساب کاربری جدید
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">
  برای استفاده از اسنپ‌گرام، اطلاعات حساب خود را وارد کنید 
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem >
                <FormLabel>نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input type="text"  className="shad-input" placeholder="نام و نام خانوادگی"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input type="text"  className="shad-input" placeholder="نام کاربری" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              isCreatingAccount ?
              <div className="flex gap-2 items-center justify-center">
               <Loader />  درحال ثبت نام 
              </div>
              :
              "ثبت نام"
            }
          </Button>
          <p className="text-small-regular text-light-4 text-center mt-2">
            از قبل یک حساب کاربری دارید؟
            <Link
              to="/sign-in"
              className="text-primary-500 font-semibold text-lg mr-4 ">
              ورود
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm