import React from "react";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../../redux/modules/user";
import Spinner from "../Spinner";
import api from "../../api/api";
import { setCookie } from "../../shared/token";

const Google = (props) => {
  const dispatch = useDispatch();
  let authorization_code = new URL(window.location.href).searchParams.get("code");

 // console.log("구글로그인 ",authorization_code)

 //Google social 로그인
const GoogleLogin = (authorization_code) => {
  return async function (dispatch, getState, { history }) {
    await api
      .get(`/api/v1/auth/google/callback?code=${authorization_code}`)
      .then((response) => {
        //console.log("googlelogin",response)
        const token = response.data.user.token;
        setCookie("login", token);
        window.alert("구글 성공 🔥");
        history.push("/");
      })
      .catch((err) => {
        console.log("구글 로그인실패", err);
      });
  };
};

  React.useEffect(()=>{
  //  console.log("잘 찍히나",authorization_code);
    dispatch(GoogleLogin(authorization_code));
   
  },[]);

  return <Spinner/>;
}
export default Google;
