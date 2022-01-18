
//kakao social login 인가코드 받기

const KAKAO_ID="72d037f2f36cab4f37e086f82615729e";
//const KAKAO_REDIRECT_URI="http://localhost:3000/api/v1/auth/kakao/callback";
const KAKAO_REDIRECT_URI="https://bbomomo.com/api/v1/auth/kakao/callback";


export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;




const GOOGLE_ID="293542041167-u586ejh1s35tfep319424rotl0nf811b.apps.googleusercontent.com";
//const GOOGLE_REDIRECT_URI="http://localhost:3000/api/v1/auth/google/callback";
const GOOGLE_REDIRECT_URI="https://bbomomo.com/api/v1/auth/google/callback";

export const GOOGLE_API_URL =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;