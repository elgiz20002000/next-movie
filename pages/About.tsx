import Image from "next/image";
import Link from "next/link";
import style from "../styles/About_page.module.scss";

const About = () => {
  return (
    <main className={style.about}>
      <div className={style.top}>
        <div className="container">
          <div className={style.top_items}>
            <div className={style.item}>
              <h1>Movieplex</h1>
            </div>
            <div className={style.item}>
              <h2>About Us</h2>
            </div>
            <div className={style.item}>
              <Link href={'/'}>
                <Image
                  src={"/icon/Line_b.svg"}
                  alt={"back"}
                  width={30}
                  height={50}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <section>
          <div className="container">
            <div className={style.contents}>
              <div className={style.item}>
                <div className={style.description}>
                  Movieplex is a streaming service that offers a wide variety of
                  award-winning TV shows, movies, anime, documentaries, and more
                  on thousands of internet-connected devices.
                </div>
              </div>
              <div className={style.item}>
                <div className={style.imgs}>
                  <Image
                    src={"/img/memoji_1.svg"}
                    alt="memoji"
                    width={310}
                    height={340}
                  />
                </div>
                <div className={style.description}>
                  You can watch as much as you want, whenever you want without a
                  single commercial – all for one low monthly price. There`s
                  always something new to discover and new TV shows and movies
                  are added every week!
                </div>
              </div>
              <div className={style.item}>
                <div className={style.description}>
                  You can watch as much as you want, whenever you want without a
                  single commercial – all for one low monthly price. There`s
                  always something new to discover and new TV shows and movies
                  are added every week!
                </div>
                <div className={style.imgs}>
                  <Image
                    src={"/img/memoji_2.svg"}
                    alt="memoji"
                    width={310}
                    height={340}
                  />
                  <Image
                    src={"/img/memoji_3.svg"}
                    alt="memoji"
                    width={310}
                    height={340}
                  />
                </div>
              </div>
              <div className={style.item}>
                <div className={style.imgs}>
                  <Image
                    src={"/img/memoji_4.svg"}
                    alt="memoji"
                    width={310}
                    height={340}
                  />
                </div>
                <div className={style.description}>
                  Watch anywhere, anytime. Sign in with your Movieplex account
                  to watch instantly on the web at movieplex.com from your
                  personal computer or on any internet-connected device that
                  offers the Movieplex app, including smart TVs, smartphones,
                  tablets, streaming media players and game consoles.
                </div>
              </div>
              <div className={style.item}>
                <div className={style.description}>
                Movieplex has an extensive library of feature films, documentaries, TV shows, anime, award-winning Movieplex originals, and more. Watch as much as you want, anytime you want.
                </div>
                <div className={style.imgs}>
                  <Image
                    src={"/img/memoji_5.svg"}
                    alt="memoji"
                    width={310}
                    height={340}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={style.bottom}></div>
    </main>
  );
};


export function getStaticProps() {
  return {
    props:{}
  }
}

export default About;
