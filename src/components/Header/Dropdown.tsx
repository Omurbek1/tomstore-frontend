import type { Menu } from "@/types/Menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Dropdown = ({
  menuItem,
  stickyMenu,
  mobile = false,
  darkMode = false,
  onNavigate,
}: {
  menuItem: Menu;
  stickyMenu: boolean;
  mobile?: boolean;
  darkMode?: boolean;
  onNavigate?: () => void;
}) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();
  const isActive = Boolean(
    menuItem.submenu?.some((item) => item.path && pathUrl === item.path),
  );
  const submenuId = `submenu-${menuItem.id}`;
  const mobileParentPath =
    mobile && menuItem.path && menuItem.path !== "/" ? menuItem.path : undefined;

  useEffect(() => {
    if (!mobile) {
      return;
    }

    setDropdownToggler(isActive);
  }, [isActive, mobile]);

  return (
    <li
      className={`group relative z-0 before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:z-[10020] focus-within:z-[10020] hover:before:w-full ${
        isActive && "before:!w-full"
      } ${dropdownToggler ? "z-[10020]" : ""} ${mobile ? "before:hidden" : ""}`}
    >
      <button
        type="button"
        onClick={() => setDropdownToggler((prev) => !prev)}
        aria-expanded={dropdownToggler}
        aria-controls={submenuId}
        className={`text-custom-sm font-medium flex w-full items-center gap-1.5 capitalize ${
          mobile
            ? "justify-between rounded-xl bg-gray-1 px-4 py-3 text-left text-base"
            : stickyMenu
              ? "xl:py-4"
              : "xl:py-6"
        } ${
          mobile
            ? "text-dark hover:text-blue"
            : darkMode
              ? "text-white hover:text-white/75"
              : "text-dark hover:text-blue"
        } ${isActive && "!text-blue"}`}
      >
        {menuItem.title}
        <svg
          className={`fill-current cursor-pointer ease-out duration-200 ${
            dropdownToggler ? "rotate-180" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z"
            fill=""
          />
        </svg>
      </button>

      {/* <!-- Dropdown Start --> */}
      <ul
        id={submenuId}
        className={`dropdown ${dropdownToggler && "flex"} ${
          stickyMenu
            ? "xl:group-hover:translate-y-0"
            : "xl:group-hover:translate-y-0"
        } ${
          mobile
            ? "mt-2 rounded-xl border border-gray-3 bg-gray-1/70 p-2 shadow-none"
            : darkMode
              ? "z-[10020] border-white/10 bg-[#08111f]/92 backdrop-blur-xl"
            : ""
        }`}
      >
        {mobileParentPath ? (
          <li>
            <Link
              href={mobileParentPath}
              onClick={onNavigate}
              className={`flex text-custom-sm hover:text-blue hover:bg-white py-[7px] px-4.5 ${
                pathUrl === mobileParentPath && "text-blue bg-white"
              } rounded-lg text-sm font-medium`}
            >
              {menuItem.title}
            </Link>
          </li>
        ) : null}
        {menuItem.submenu?.map((item, i) => (
          <li key={i}>
            <Link
              href={item.path || "#"}
              onClick={onNavigate}
              className={`flex text-custom-sm hover:text-blue hover:bg-gray-1 py-[7px] px-4.5 ${
                pathUrl === item.path && "text-blue bg-gray-1"
              } ${mobile ? "rounded-lg text-sm" : ""}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
