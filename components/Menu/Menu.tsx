import menu_btn from "../../public/icon/Menu.svg";
import user from "../../public/icon/User.svg";
import settings from "../../public/icon/Settings.svg";
import bookmark from "../../public/icon/Bookmark.svg";
import info from "../../public/icon/Info.svg";
import mail from "../../public/icon/Mail.svg";
import line from "../../public/icon/Line.svg";
import Image from "next/image";
import style from "./Menu.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { hideMenu, useMenuActive } from "../../Store/MenuSlice";
import { signOut, useSession } from "next-auth/react";

const Menu = () => {
  const menuActive = useSelector(useMenuActive);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const hide = () => {
    dispatch(hideMenu());
  };

  const classActive = menuActive ? style.active : "";
  return (
    <div className={style.menu + " " + classActive}>
      <ul>
        <li className={style.menu_btn} onClick={hide}>
          <Image src={menu_btn} alt="icon" />
        </li>
        <li>
          <Link href={""}>
            <Image src={user} alt="icon" />
            Personal account
          </Link>
        </li>
        <li>
          <Link href={""}>
            <Image src={settings} alt="icon" />
            Settings & prefferences
          </Link>
        </li>
        <li>
          <Link href={"/Saved"}>
            <Image src={bookmark} alt="icon" />
            Saved
          </Link>
        </li>
        <li>
          <Link href={"/About"}>
            <Image src={info} alt="icon" />
            About us
          </Link>
        </li>
        <li>
          <Link href={""}>
            <Image src={mail} alt="icon" />
            Contact us
          </Link>
        </li>
        {session ? (
          <li
            onClick={() => {
              signOut({ redirect: false });
              dispatch(hideMenu());
            }}
          >
            <Image src={line} alt="icon" />
            Disconnect
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Menu;
