
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import AuthLayout from "@/layout/AuthLayout";

const Home = lazy(() => import('@/pages/Home'));
const SignIn = lazy(() => import('@/pages/SigninForm'));
const SignUp = lazy(() => import('@/pages/SignupForm'));
const Explore = lazy(() => import('@/pages/Explore'));
const AllUsers = lazy(() => import('@/pages/AllUsers'));
const Saved = lazy(() => import('@/pages/Saved'));
const CreatePost = lazy(() => import('@/pages/CreatePost'));
const EditPost = lazy(() => import('@/pages/EditPost'));
const PostDetails = lazy(() => import('@/pages/PostDetails'));
const Profile = lazy(() => import('@/pages/Profile'));
const UpdateProfile = lazy(() => import('@/pages/UpdateProfile'));

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      // مسیرهای عمومی
      { index: true, path: "/home", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/saved", element: <Saved /> },
      { path: "/all-users", element: <AllUsers /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/update-post/:id", element: <EditPost /> },
      { path: "/posts/:id", element: <PostDetails /> },
      { path: "/profile/:id/*", element: <Profile /> },
      { path: "/update-profile/:id", element: <UpdateProfile /> },
      // مسیرهای نیازمند احراز هویت (کاربران عادی و ادمین)
      // {
      //   element: <PrivateRoute allowedRoles={['user', 'admin']} />,
      //   children: [
      //     { path: "/checkout", element: <Checkout /> },
      //     {
      //       path: "/user",
      //         element: <ProfileLayout />,
      //         children: [
      //           { path: "/user/profile", element: <Profile /> },
      //           { path: "/user/orders", element: <OrderHistory /> },
      //           { index: true, element: <Profile  /> },
      //         ]
      //     }
      //   ]
      // },
      
   
    //   { path: "*", element: <NotFound /> },
    ]
  },
  { 
    element: <AuthLayout /> , 
    children: [
          { path: "/", element: <SignIn /> },
          { path: "sign-up", element: <SignUp /> },
    ]
  }
];