import React from "react";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../../redux/modules/user";
import Spinner from "../Spinner";
import SocialInfoSet from "./SocialInfoSet";
import api from "../../api/api";
import { setCookie } from "../../shared/token";

const Kakao = (props) => {
  const dispatch = useDispatch();
  const [first, setFirst]= React.useState(false);
  let authorization_code = new URL(window.location.href).searchParams.get("code");

  //kakao social 로그인
 const kakaoLogin = (authorization_code) => {
  return async function (dispatch, getState, { history }) {
    await api
      .get(`/api/v1/auth/kakao/callback?code=${authorization_code}`)
      .then((response) => {
        const token = response.data.user.token;
        const userNick = response.data.user.nick;
        setCookie("login", token);
        localStorage.setItem("nick", `${userNick}`);
        //window.alert("로그인 성공 🔥");
        //history.push("/");
      }).then(()=>{
        const defaultNick = localStorage.getItem("nick");
        console.log(defaultNick);
        const distriNick = defaultNick.indexOf('164',0);
        console.log(defaultNick.indexOf('164',0)); 
        if(distriNick == -1 ){
          setFirst(false);
          history.push("/");
        }
        else{
          setFirst(true);
        }     
      })
      .catch((err) => {
        console.log("카카오 로그인실패", err);
      });
  };
};


  React.useEffect(()=>{
    //kakao 인가코드 백으로 넘기기
    dispatch(kakaoLogin(authorization_code));
  },[]);

  

  return (
    <>{first?<SocialInfoSet/>:<Spinner/>}</>
  );



   


}
export default Kakao;
