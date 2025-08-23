import { Outlet,Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false ;
  return (
    <>
      {
        isAuthenticated ?(
          <Navigate to="/" />
        ):(
          <div className="flex ">
            <section className="flex flex-1 py-10 flex-col items-center justify-center">
              <Outlet/>
            </section>
            <img 
              src="/assets/images/side-img.jfif"
              alt="logo"
              className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
          </div>
        )
      }
    </>
  )
}

export default AuthLayout