import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "نام باید حداقل ۲ کاراکتر باشد." }),
  username: z.string().min(2, { message: "نام کاربری باید حداقل ۲ کاراکتر باشد." }),
  email: z.email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد." }),
});

export const SigninValidation = z.object({
  email: z.email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "نام باید حداقل ۲ کاراکتر باشد." }),
  username: z.string().min(2, { message: "نام کاربری باید حداقل ۲ کاراکتر باشد." }),
  email: z.email("لطفا یک ایمیل معتبر وارد کنید"),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "حداقل ۵ کاراکتر." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "این فیلد الزامی است" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});
