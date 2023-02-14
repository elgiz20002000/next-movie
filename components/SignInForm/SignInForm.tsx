import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import style from "./SignInForm.module.scss";
import * as yup from "yup";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "../Spinner/Spinner";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  setModalText,
  showModal,
  useModalActive,
  useModalText,
} from "../../Store/ModalSlice";
import CustomModal from "../CustomModal/CustomModal";

interface loginValue {
  password: string;
  email: string;
  remember: boolean;
}

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modalActive = useSelector(useModalActive);
  const modal_text = useSelector(useModalText);

  const Router = useRouter();
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      remember: yup.bool().oneOf([true]).required(),
    })
    .required();

  const [check, setCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const submitEvent = (data: loginValue) => {
    if (data.email && data.password && data.remember) {
      setLoading(true);
      signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      }).then((res) => {
        if (res) {
          if (res.ok) {
            setLoading(false);
            Router.replace("/");
          } else {
            setLoading(false);
            dispatch(showModal());
            dispatch(setModalText(res.error));
          }
        }
      });
    }
  };
  return (
    <>
      <CustomModal modalActive={modalActive} modal_text={modal_text} />
      <div className={style.form_wrapper}>
        <h2>Welcome!</h2>
        <form noValidate onSubmit={handleSubmit(submitEvent)} action="POST">
          <div className={style.email}>
            <label htmlFor="email">Enter an email adress</label>
            <input
              {...register("email")}
              className={errors.email ? "input_error" : ""}
              type="email"
              name="email"
              required
            />
            {errors.email && (
              <div className="error">This field is required</div>
            )}
          </div>
          <div className={style.password}>
            <label htmlFor="password">Enter a password</label>
            <input
              {...register("password")}
              className={errors.password ? "input_error" : ""}
              type="password"
              name="password"
            />
            {errors.password && (
              <div className="error">This field is required</div>
            )}
          </div>
          <div className={style.form_btns}>
            <div>
              <div className={style.remember}>
                <label htmlFor="remember">Remember password</label>
                <label
                  onClick={() => {
                    setCheck(!check);
                  }}
                  htmlFor="remember"
                  className={
                    style.checkbox + " " + (check ? style.checked : "")
                  }
                >
                  <input
                    {...register("remember")}
                    type="checkbox"
                    name="remember"
                  />
                </label>
              </div>
              {errors.remember && (
                <div className="error">This field is required</div>
              )}
            </div>
            <button className={loading ? "loading" : ""} type="submit">
              {loading ? <Spinner width={50} height={50} /> : "Enter"}
            </button>
            <div className={style.cancel}>
              <Link href={"/"}>Cancel</Link>
            </div>
          </div>
        </form>
        <div className={style.forget_password}>Forgot password?</div>
      </div>
    </>
  );
};

export default SignInForm;
