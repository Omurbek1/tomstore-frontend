import { Menu } from "@/types/Menu";

export const getMenuData = (
  t: (key: string) => string,
  options?: {
    showBlogMenu?: boolean;
  },
): Menu[] =>
  [
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
    options?.showBlogMenu
      ? {
          id: 7,
          title: t("menu.blogs"),
          newTab: false,
          path: "/blogs/blog-grid",
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
          ],
        }
      : null,
  ].filter(Boolean) as Menu[];
