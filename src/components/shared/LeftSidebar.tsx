import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { INavLink } from "@/types";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/useUserContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { INITIAL_USER, sidebarLinks } from "@/constants";


const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
          <div className="flex gap-2 flex-center">
            <img src="/assets/images/logo.png" alt="logo" className="" />
            <h1 className="h2-bold md:h1-bold text-white">
              اسنپ گرام
            </h1>
          </div>

        { !user.email ?
           <div className="flex-center">
              <Link
                to="/sign-in"
                className="bg-primary-500  px-2 py-1 rounded-md text-white font-semibold text-lg mr-4 ">
                ورود
              </Link>
           </div> 
        :
        
        isLoading ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full border-2 border-white animate-pulse"
            />
            <div className="flex flex-col">
              <p className="body-bold text-white">{user.name}</p>
              <p className="small-regular text-light-2">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
          {
            user.email ? 
              <Button
                variant="ghost"
                className="shad-button_ghost "
                onClick={(e) => handleSignOut(e)}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className="small-medium lg:base-medium text-white ">خروج</p>
              </Button>
            :
            <div className=""></div>
          }

    </nav>
  );
};

export default LeftSidebar;
