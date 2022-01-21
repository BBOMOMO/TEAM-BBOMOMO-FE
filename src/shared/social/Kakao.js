import React from "react";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../../redux/modules/user";
import Spinner from "../Spinner";
import api from "../../api/api";
import { setCookie } from "../../shared/token";

const Kakao = (props) => {
  const dispatch = useDispatch();
  let authorization_code = new URL(window.location.href).searchParams.get("code");

  //kakao social 로그인
 const kakaoLogin = (authorization_code) => {
  return async function (dispatch, getState, { history }) {
    await api
      .get(`/api/v1/auth/kakao/callback?code=${authorization_code}`)
      .then((response) => {
        const token = response.data.user.token;
        setCookie("login", token);
        //window.alert("로그인 성공 🔥");
        history.push("/");
      })
      .catch((err) => {
        console.log("카카오 로그인실패", err);
      });
  };
};


  React.useEffect(()=>{
  //  console.log("잘 찍히나",authorization_code);
    dispatch(kakaoLogin(authorization_code));
    //console.log(authorization_code)
   
  },[]);

  

  return <Spinner/>;
}
export default Kakao;
