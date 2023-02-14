import SignInForm from '../components/SignInForm/SignInForm';
import style from '../styles/Sign_in.module.scss';

const LoginPage = () => {
  let a = {name:'wwd'}
  return (  
    <section className={style.sign_in}>
        <h1>Movieplex</h1>
        <div className={style.sign_in_wrapper}>
            <div className={style.img_wrapper}></div>
            <SignInForm/>
        </div>
    </section>
  )
}


export function getStaticProps() {
  return {
    props:{}
  }
}

export default LoginPage