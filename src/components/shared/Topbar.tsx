import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";

import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/hooks/useUserContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess , navigate]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
            <div className="flex gap-2 flex-center">
              <img src="/assets/images/logo.png" alt="logo" className="" />
              <h1 className="h3-bold md:h1-bold text-white">
                اسنپ گرام
              </h1>
            </div>
        </Link>

        {
          user.email ? 
                  <div className="flex gap-2">
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                      <img
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className="h-8 w-8 rounded-full"
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      className="shad-button_ghost"
                      onClick={() => signOut()}>
                      <img src="/assets/icons/logout.svg" alt="logout" />
                    </Button>
                  </div>
          :
            <div className="flex-center">
              <Link
                to="/sign-in"
                className="bg-primary-500  px-2 py-1 rounded-md text-white font-semibold text-lg mr-4 ">
                ورود
              </Link>
           </div> 
        }

      </div>
    </section>
  );
};

export default Topbar;
