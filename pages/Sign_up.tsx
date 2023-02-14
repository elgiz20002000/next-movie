import SignUpForm from "../components/SignUpForm/SignUpForm";
import style from "../styles/Sign_up.module.scss";

const SignUpPage = () => {

  return (
    <section className={style.sign_up}>
      <h1>Movieplex</h1>
      <div className={style.sign_up_wrapper}>
        <div className={style.img_wrapper}></div>
        <SignUpForm />
      </div>
    </section>
  );
};

export function getStaticProps() {
  return {
    props:{}
  }
}
export default SignUpPage;
