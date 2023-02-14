import style from "../styles/Movie.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanMovies,
  fetchMovie,
  fetchTrailer,
  getCurrentMovie,
  getCurrentVideo,
  getError,
  getLoading,
} from "../Store/MovieSlice";
import { useEffect, useState } from "react";
import { NextRouter, Router, RouterEvent, useRouter } from "next/router";
import Spinner from "../components/Spinner/Spinner";
import Error from "../components/Error/Error";
import VideoWraper from "../components/VideoWraper/VideoWraper";
import CustomModal from "../components/CustomModal/CustomModal";
import { showModal, useModalActive } from "../Store/ModalSlice";
import { useSession } from "next-auth/react";
import { useModalText, setModalText } from "../Store/ModalSlice";
import { Session } from "next-auth";
import { Modal } from "reactstrap";
import {
  addSavedMovie,
  getSavedMovies,
  removeSavedMovie,
  setSavedMovies,
} from "../Store/SaveSlice";

const Movie = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const movie = useSelector(getCurrentMovie);
  const error = useSelector(getError);
  const loading = useSelector(getLoading);
  const modalMessage = useSelector(useModalText);
  const videoUrl = useSelector(getCurrentVideo);
  const [video, setVideo] = useState(false);
  const modalActive = useSelector(useModalActive);
  const {
    Actors,
    Director,
    Writer,
    Genre,
    Poster,
    Plot,
    Title,
    Runtime,
    imdbID,
  } = movie;
  const [like, setLike] = useState<boolean | null>(false);
  const [dislike, setDislike] = useState<boolean | null>(false);
  const [saved, setSaved] = useState<boolean | null>(false);
  const [globalModal, setGlobalModal] = useState(false);
  const savedData = useSelector(getSavedMovies);
  const { query } = router;

  const saveHandler = (session: Session, data: object) => {
    return fetch("/api/save-movie", {
      method: "POST",
      body: JSON.stringify({
        username: session.user?.name,
        movie: data,
      }),
    });
  };

  const likeHandler = (
    session: Session,
    router: NextRouter,
    like: boolean | null
  ) => {
    return fetch("/api/like-movie", {
      method: "POST",
      body: JSON.stringify({
        username: session.user?.name,
        movieID: router.query.imdbID,
        like,
      }),
    });
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchMovie(query.imdbID));
      if (savedData?.find((el) => el.imdbID == query.imdbID)) {
        setSaved(true);
      }
    }
  }, [router.isReady]);

  const getVideo = () => {
    if (router.isReady) {
      dispatch(fetchTrailer(query.imdbID));
      setVideo(true);
    }
  };

  if (loading || !movie) {
    return <Spinner width={100} height={100} />;
  }

  if (video && videoUrl) {
    return (
      <VideoWraper exitClick={() => setVideo(false)} videoUrl={videoUrl} />
    );
  } else if (video && !videoUrl) {
    dispatch(showModal());
    dispatch(setModalText("Video doesn`t exist"));
    setVideo(false);
  }

  return (
    <>
      <Modal isOpen={globalModal} backdrop={true}>
        <Spinner width={120} height={120} />
      </Modal>
      <CustomModal modalActive={modalActive} modal_text={modalMessage} />

      {error ? (
        <Error />
      ) : (
        <section className={style.movie}>
          <div className={style.back}>
            <Image
              onClick={() => router.back()}
              width={40}
              height={40}
              src={"/icon/Arrow.svg"}
              alt="back"
            />
          </div>
          <div className={style.movie_wrapper}>
            <div className={style.poster}>
              <Image width={420} height={630} src={Poster} alt="movie" />
              <div
                style={{ backgroundImage: `url(${Poster})` }}
                className={style.img_wrapper}
              ></div>
            </div>
            <div className="container">
              <div className={style.info_wrapper}>
                <div className={style.title}>{Title}</div>
                <div className={style.info}>
                  <div className="genre">
                    Genre: <span>{Genre}</span>
                  </div>
                  <div className="director">
                    Director: <span>{Director}</span>
                  </div>
                  <div className="writers">
                    Writers: <span>{Writer}</span>
                  </div>
                  <div className="stars">
                    Stars: <span>{Actors}</span>
                  </div>
                </div>
                <div className={style.description}>{Plot}</div>
                <div className={style.control_btns}>
                  <div className={style.likes}>
                    <div
                      className={"like" + (like ? " " + style.active : " ")}
                      onClick={() => {
                        if (session?.user) {
                          if (like) {
                            setLike(false);
                            setGlobalModal(true);
                            likeHandler(session, router, false).then(() => {
                              setGlobalModal(false);
                            });
                          } else {
                            setLike(true);
                            setDislike(false);

                            setGlobalModal(true);
                            likeHandler(session, router, true).then(() => {
                              setGlobalModal(false);
                            });
                          }
                        } else {
                          dispatch(showModal());
                          dispatch(setModalText("You are not logged in"));
                        }
                      }}
                    >
                      <i className="fa fa-light fa-thumbs-up"></i>
                    </div>
                    <div
                      className={
                        "dislike" + (dislike ? " " + style.active : " ")
                      }
                      onClick={() => {
                        if (session?.user) {
                          if (dislike) {
                            setDislike(false);
                            setGlobalModal(true);
                            likeHandler(session, router, like).then(() => {
                              setGlobalModal(false);
                            });
                          } else {
                            setLike(false);
                            setDislike(true);
                            setGlobalModal(true);
                            likeHandler(session, router, false).then(() => {
                              setGlobalModal(false);
                            });
                          }
                        } else {
                          dispatch(showModal());
                          dispatch(setModalText("You are not logged in"));
                        }
                      }}
                    >
                      <i className="fa fa-light fa-thumbs-down"></i>
                    </div>
                  </div>
                  <div onClick={getVideo} className={style.play}>
                    <div className={style.play_icon}>
                      <Image
                        width={65}
                        height={65}
                        src={"/icon/Play.svg"}
                        alt="play"
                      />
                    </div>
                    <div className={style.total_time}>{Runtime}</div>
                  </div>
                  <div
                    className={style.save + (saved ? " " + style.saved : "")}
                    onClick={() => {
                      if (session?.user) {
                        if (saved) {
                          setGlobalModal(true);
                          saveHandler(session, { Title, Poster, imdbID }).then(
                            () => {
                              setSaved(false);
                              setGlobalModal(false);
                              dispatch(removeSavedMovie(query.imdbID));
                            }
                          );
                        } else {
                          setGlobalModal(true);
                          saveHandler(session, { Title, Poster, imdbID }).then(
                            () => {
                              setSaved(true);
                              setGlobalModal(false);
                              dispatch(
                                addSavedMovie({ Title, Poster, imdbID })
                              );
                            }
                          );
                        }
                      } else {
                        dispatch(showModal());
                        dispatch(setModalText("You are not logged in"));
                      }
                    }}
                  >
                    <i className="fa-regular fa-bookmark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Movie;
