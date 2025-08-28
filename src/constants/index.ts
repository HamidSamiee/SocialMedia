export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/home",
    label: "صفحه اصلی",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "جستجو ",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "کاربران",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "پست‌های ذخیره شده",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "ایجاد پست",
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/home",
    label: "صفحه اصلی",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "جستجو ",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "ذخیره شده ها",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "ایجاد پست",
  },
];

