import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./SignUpForm.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  setModalText,
  showModal,
  useModalActive,
  useModalText,
} from "../../Store/ModalSlice";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CustomModal from "../CustomModal/CustomModal";

const SignUpForm = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const modalActive = useSelector(useModalActive);
  const modal_text = useSelector(useModalText);

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      re_enter_password: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      username: yup.string().required(),
      remember: yup.boolean().oneOf([true]).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      re_enter_password: "",
      username: "",
      remember: false,
    },
  });

  const submitEvent = (data: any) => {
    if (isValid) {
      setLoading(true);
      fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
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
                  dispatch(showModal);
                  dispatch(setModalText(res.error));
                }
              }
            });
          } else {
            setLoading(false);
            dispatch(showModal());
            dispatch(setModalText(res.message));
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
          <div className={style.re_enter_password}>
            <label htmlFor="password">Re-enter the password</label>
            <input
              {...register("re_enter_password")}
              className={errors.re_enter_password ? "input_error" : ""}
              type="password"
              name="re_enter_password"
            />
            {errors.re_enter_password && (
              <div className="error">
                {errors.re_enter_password?.message == "Passwords must match"
                  ? errors.re_enter_password?.message
                  : "This field is required"}
              </div>
            )}
          </div>
          <div className={style.username}>
            <label htmlFor="username">Enter a username</label>
            <input
              {...register("username")}
              className={errors.username ? "input_error" : ""}
              type="text"
              name="username"
            />
            {errors.username && (
              <div className="error">This field is required</div>
            )}
          </div>
          <div className={style.form_btns}>
            <div>
              <div className={style.remember}>
                <label htmlFor="remember">Remember password</label>
                <input
                  {...register("remember")}
                  className={errors.remember ? "input_error" : ""}
                  type="checkbox"
                  name="remember"
                  id=""
                />
              </div>
              {errors.remember && (
                <div className="error">This field is required</div>
              )}
            </div>
            <button className={loading ? "loading" : ""} type="submit">
              {loading ? <Spinner width={50} height={50} /> : "Sign Up"}
            </button>
            <div className={style.cancel}>
              <Link href={"/"}>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
