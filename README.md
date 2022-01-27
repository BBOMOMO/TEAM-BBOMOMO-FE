![Group 3521](https://user-images.githubusercontent.com/63698668/151089660-ee990ae6-6c70-40f8-a872-68687c05a6b9.png)

<!-- 서비스 간략설명  -->

<img width="80" alt="modal1" src="https://user-images.githubusercontent.com/87928719/151091148-ea42c383-d8b0-453f-a2da-e852340e3cdc.png" align="left">
<h1 align="left"> webRTC와 socketIO를 활용한 뽀모도로 타이머 기반<br/>화상스터디 플랫폼</h1>

<br>

<center>

[![바로가기 버튼](https://user-images.githubusercontent.com/63698668/151119816-1f14496c-84a5-4401-a840-6a376e51731f.png)](https://bbomomo.com/)

</center>

<br>


## 프로젝트 기간
>12월18일 부터 1월28일 까지 ( 40일 )

<br>

# 팀 구성
| 이름     | 깃허브 주소                                                | 포지션     |
|:--------:|:----------------------------------------------------------:|:-----------:|
| 김희경🔰 | [https://github.com/gimgit](https://github.com/gimgit)                     | 백엔드     |
| 이상협   | [https://github.com/23hh](https://github.com/23hh)                     | 백엔드     |
| 길재원   | [https://github.com/kiljw316](https://github.com/kiljw316) | 백엔드     |
| 정종찬   | [https://github.com/youHaveToDo](https://github.com/youHaveToDo)                     | 프론트엔드 |
| 서민지   | [https://github.com/ireneeming](https://github.com/ireneeming)                     | 프론트엔드 |
| 이서현   | [https://github.com/hamkke](https://github.com/hamkke)                     | 프론트엔드 |
| 이가인   | [bit.ly/leegain](https://elated-glue-b4c.notion.site/LEEGAIN-PORTFOLIO-e0e1ba571f244c7d9c0a5325ed98295f)                     | 디자인 |
| 이경미   | [https://github.com/leekyungmimiii](https://github.com/leekyungmimiii)                     | 디자인 |

<br>

# 핵심 기능 Key Feature

<details>
<summary>📚 화상 스터디</summary>
<div markdown="1">
 <br>
   스터디룸에 접속한 유저는 webRTC를 활용하여 본인의 화면을 송출하는 동시에 다른 유저의 집중하는 모습을 실시간으로 확인
</div>
</details>

<details>
<summary>⏰ 공부 타이머 및 그룹 채팅</summary>
<div markdown="1">
<br>
   소켓 통신을 바탕으로 공부 시간과 쉬는 시간을 구분하는 모달을 띄우고, 쉬는 시간에는 스터디룸 채팅 기능 제공
</div>
</details>
<details>
<summary>🏆 공부 인증 및 랭킹 기능</summary>
<div markdown="1">
 <br>
   매일 09:00 기준으로 DB에 저장된 공부 시간을 참조하여 일일 공부시간 제공, 공부인증 게시물 작성, 주간 공부시간 랭킹 표시
</div>

</details>

<br>

# 기술 스택

> ## 프론트엔드

<p align="center">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<br>
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<br>
<img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=WebRTC&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=CloudFront&logoColor=white">
<img src="https://img.shields.io/badge/Route53-E68B49?style=for-the-badge&logo=Route53s&logoColor=white">
<img src="https://img.shields.io/badge/S3-569A31?style=for-the-badge&logo=S3&logoColor=white">
<br>
<br>
<br>

> ## 백엔드

<p align="center">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Node-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/express-339933?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/Express Validator-6702AB?style=for-the-badge&logo=expresss-validator&logoColor=white">
<br>
<img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=WebRTC&logoColor=white">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/bcrypt-555555?style=for-the-badge&logo=bcrypt&logoColor=white">
<br>
 <img src="https://img.shields.io/badge/cors-FF253F?style=for-the-badge&logo=cors&logoColor=white">
 <img src="https://img.shields.io/badge/jwt-FB015B?style=for-the-badge&logo=jwt&logoColor=white">
 <img src="https://img.shields.io/badge/multer-BEF5A4?style=for-the-badge&logo=multer&logoColor=black">
<img src="https://img.shields.io/badge/passport-33D875?style=for-the-badge&logo=passport&logoColor=white">
<img src="https://img.shields.io/badge/AWS SDK-E68B49?style=for-the-badge&logo=AWS SDK&logoColor=white">

<br>

# Links

- Project homepage: https://bbomomo.com/
- Repository: https://github.com/BBOMOMO

- 프론트엔드 깃허브 주소 : https://github.com/BBOMOMO/TEAM-BBOMOMO-FE
- 백엔드 깃허브 주소 : https://github.com/BBOMOMO/TEAM-BBOMOMO-BE

<br>

# more info

![Group 3475](https://user-images.githubusercontent.com/63698668/151095485-db07f9d7-a895-4a60-85f1-d214a0ee8b15.png)
[시연 연상](https://youtu.be/LQ_u9ZKzZIE)

![Group 3474](https://user-images.githubusercontent.com/63698668/151095484-0d54cb7c-b35a-4f4f-947a-ce50e45489fa.png)
[화면 설계서](https://docs.google.com/presentation/d/1I7jFArgiHkIvfjGNZ5nO3M5Se-W5Q7ABn13FF47iLrw/edit?usp=sharing)


<details>
<summary>API 명세서</summary>
<div markdown="1">

![auth](https://user-images.githubusercontent.com/87928719/151182062-10082d50-771c-4835-992a-be3f1c5d034e.PNG)
![users](https://user-images.githubusercontent.com/87928719/151182046-13c8f50a-da55-4e85-b68f-e0ee2ed242d6.png)
![studyRoom](https://user-images.githubusercontent.com/87928719/151182076-8896433d-2e7e-45e1-9c45-24e4ca46761d.png)
![post](https://user-images.githubusercontent.com/87928719/151182093-e3c120e9-cc38-4eb6-a706-4068b04534fb.png)

</div>
</details>

<details>
<summary>ERD</summary>
<div markdown="1">

![ERD](https://user-images.githubusercontent.com/87928719/151114225-8c6cf0fd-a790-487e-ae87-3c0eed3d0791.PNG)

</div>
</details>

<!-- 플로우 차트  -->
<details>
<summary>플로우 차트</summary>
<div markdown="1">

![flow_chart_bbomomo](https://user-images.githubusercontent.com/63698668/151087747-eca18099-6022-4141-9426-1c4e3967d7b8.jpg)

</div>
</details>

<!-- 메뉴 스트럭쳐  -->
<details>
<summary>메뉴 스트럭쳐</summary>
<div markdown="1">

![Menu Structure](https://user-images.githubusercontent.com/87928719/151090653-8b9ee168-802b-4901-bba9-89dc381f2279.png)

</div>
</details>

<!-- 아키텍쳐  -->
<details>
<summary>서비스 아키텍쳐</summary>
<div markdown="1">

![아키텍쳐](https://user-images.githubusercontent.com/85975904/151278794-c81d778e-31d5-4b89-af24-7a44b4b322d2.png)

</div>
</details>


![Group 3476](https://user-images.githubusercontent.com/63698668/151095487-5436eb0a-2cef-4d57-802c-0095eb171d97.png)
![Group 3477](https://user-images.githubusercontent.com/63698668/151095490-9e2b3688-9f9f-4e93-9165-97b8423fef78.png)
![Group 3478](https://user-images.githubusercontent.com/63698668/151095492-35f5e6d7-1854-4175-8b94-d5e19ac19c65.png)
