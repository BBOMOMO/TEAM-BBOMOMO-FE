
//kakao social login 인가코드 받기

const KAKAO_ID="72d037f2f36cab4f37e086f82615729e";
const REDIRECT_URI="http://localhost:3000/api/v1/auth/kakao/callback";
// const REDIRECT_URI="https://bbomomo.com/api/v1/auth/kakao/callback";


export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

