import React from "react";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../../redux/modules/user";
import Spinner from "../Spinner";

const Kakao = (props) => {
  const dispatch = useDispatch();
  let authorization_code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(()=>{
    console.log("잘 찍히나",authorization_code);
    dispatch(userActions.kakaoLogin(authorization_code));
   
  },[]);

  return <Spinner/>;
}
export default Kakao;
