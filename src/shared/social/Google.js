import React from "react";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../../redux/modules/user";
import Spinner from "../Spinner";
import SocialInfoSet from "./SocialInfoSet";
import {api} from "./OAuth";
import { setCookie } from "../../shared/token";

const Google = (props) => {
  const dispatch = useDispatch();
  const [first, setFirst]= React.useState(false);
  let authorization_code = new URL(window.location.href).searchParams.get("code");

 //Google social 로그인
const GoogleLogin = (authorization_code) => {
  return async function (dispatch, getState, { history }) {
    await api
      .get(`/api/v1/auth/google/callback?code=${authorization_code}`)
      .then((response) => {
        const token = response.data.user.token;
        const userNick = response.data.user.nick;
        setCookie("login", token);
        localStorage.setItem("nick", `${userNick}`);
      }).then(()=>{
        const defaultNick = localStorage.getItem("nick");
        const distriNick = defaultNick.indexOf('164',0);
        if(distriNick == -1 ){
          setFirst(false);
          history.push("/");
        }
        else{
          setFirst(true);
        }     
      })
      .catch((err) => {
        console.log("구글 로그인실패", err);
      });
  };
};

  React.useEffect(()=>{
    //Google 인가코드 백으로 넘기기
    dispatch(GoogleLogin(authorization_code));
   
  },[]);

  return (
    <>{first?<SocialInfoSet/>:<Spinner/>}</>
  );
}
export default Google;
