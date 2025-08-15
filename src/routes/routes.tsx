
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import RootLayout from "@layout/RootLayout";
import AuthLayout from "@/layout/AuthLayout";

const Home = lazy(() => import('@pages/Home'));
const SignIn = lazy(() => import('@pages/SigninForm'));
const SignUp = lazy(() => import('@pages/SignupForm'));

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      // مسیرهای عمومی
      { index: true, element: <Home /> },

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
      
      // مسیرهای ادمین
    //   {
    //     element: <PrivateRoute allowedRoles={['admin']} />,
    //     children: [
    //       { 
    //         path: "/admin",
    //         element: <AdminDashboard />,
    //         children: [
    //           { path: "products", element: <ProductsManagement /> },
    //           { path: "orders", element: <OrdersManagement /> },
    //           { path: "users", element: <UsersManagement /> },
    //           { path: "stats", element: <StatsDashboard /> }
    //         ]
    //       }
    //     ]
    //   },
   
    //   { path: "*", element: <NotFound /> },
    ]
  },
  { 
    element: <AuthLayout /> , 
    children: [
          { path: "/sign-in", element: <SignIn /> },
          { path: "sign-up", element: <SignUp /> },
    ]
  }
];