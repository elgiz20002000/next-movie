import style from "../styles/Saved.module.scss";
import back from "../public/icon/Line.svg";
import bookmark_gray from "../public/icon/Bookmark_gray.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getLoading, getError, getMovies } from "../Store/MovieSlice.js";
import { Spinner } from "reactstrap";
import CardsList from "../components/CardsList/CardsList";
import Error from "../components/Error/Error";
import { getSavedMovies } from "../Store/SaveSlice";

const Saved = () => {
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const movies = useSelector(getSavedMovies);
  
  return (
    <section className={style.saved}>
      <div className={style.top}>
        <h1 className="logo_name">Movieplex</h1>
        <h2 className="title">Saved movies</h2>
        <Link href="/">
          <Image src={back} alt="back" />
        </Link>
      </div>
      {error ? (
        <Error />
      ) : loading ? (
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%,-50%)",
            left: "50%",
            top: "50%",
          }}
        >
          <Spinner width={100} height={100} />
        </div>
      ) : movies.length ? (
        <CardsList />
      ) : (
        <div className={style.info}>
          No saved movies <br />
          (press <Image src={bookmark_gray} alt="bookmark"></Image> to save a
          movie)
        </div>
      )}
    </section>
  );
};

export default Saved;
