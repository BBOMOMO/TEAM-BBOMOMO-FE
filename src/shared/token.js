const getToken = (name) => {
  let value = "; " + document.cookie;

  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
// JSON.parse()란 : parse 메소드는 string 객체를 json 객체로 변환시켜줍니다.
// JSON.stringify란 : stringify 메소드는 json 객체를 String 객체로 변환시켜 줍니다.

//Refresh Token은 Access Token과 똑같은 형태의 JWT입니다. 처음에 로그인을 완료했을 때 Access Token과 동시에 발급되는 Refresh Token은 긴 유효기간을 가지면서, Access Token이 만료됐을 때 새로 발급해주는 열쇠가 됩니다(여기서 만료라는 개념은 그냥 유효기간을 지났다는 의미입니다.)
//,${parseToken.refreshToken}

const setToken = (name, token, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${token}; expires=${date.toUTCString()}`;
};

const delToken = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);

  document.cookie = name + "=; expires=" + date;
};

export { getToken, setToken, delToken };
