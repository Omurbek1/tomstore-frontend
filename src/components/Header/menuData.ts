import { Menu } from "@/types/Menu";

export const getMenuData = (t: (key: string) => string): Menu[] => [
  {
    id: 1,
    title: t("menu.popular"),
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: t("menu.shop"),
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: t("menu.contact"),
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: t("menu.pages"),
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: t("menu.shopWithSidebar"),
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: t("menu.shopWithoutSidebar"),
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: t("menu.checkout"),
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: t("menu.cart"),
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: t("menu.wishlist"),
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: t("menu.signin"),
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: t("menu.signup"),
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: t("menu.myAccount"),
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: t("menu.contact"),
        newTab: false,
        path: "/contact",
      },
      {
        id: 71,
        title: t("menu.error"),
        newTab: false,
        path: "/error",
      },
      {
        id: 72,
        title: t("menu.mailSuccess"),
        newTab: false,
        path: "/mail-success",
      },
    ],
  },
  {
    id: 7,
    title: t("menu.blogs"),
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 73,
        title: t("menu.blogGridWithSidebar"),
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 74,
        title: t("menu.blogGrid"),
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 75,
        title: t("menu.blogDetailsWithSidebar"),
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      {
        id: 76,
        title: t("menu.blogDetails"),
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
];
