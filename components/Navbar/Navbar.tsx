import styles from "./Navbar.module.scss";
import menu from "../../public/icon/Menu.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { showMenu } from "../../Store/MenuSlice";
import React, { useState } from "react";
import { fetchMovies } from "../../Store/MovieSlice";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { data: session, status } = useSession();

  const dispatch = useDispatch();
  const show = () => {
    dispatch(showMenu());
  };
  const SearchHandle = (e) => {
    if (e.key == "Enter") {
      dispatch(fetchMovies(e.currentTarget.value));
    }
  };
  return (
    <div className={styles.navbar}>
      <h1 className={styles.navbar_title}>Movieplex</h1>
      <div className={styles.input_wrapper}>
        <input
          onKeyDown={SearchHandle}
          onInput={(e) => setSearch(e.currentTarget.value)}
          type="text"
          value={search}
        />
      </div>
      {status == "authenticated" ? (
        <div className={styles.current_user}>User: {session.user?.name}</div>
      ) : (
        <>
          <div className={styles.login_btn}>
            <Link href={"/Login"}>Login</Link>
          </div>
          <div className={styles.sign_up_btn}>
            <Link href={"/Sign_up"}>Sign Up</Link>
          </div>
        </>
      )}
      <div onClick={SearchHandle} className={styles.menu_btn}>
        <Image onClick={show} src={menu} alt="menu button" />
      </div>
    </div>
  );
};

export default Navbar;
