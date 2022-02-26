import React from "react";
import styled from "styled-components";
import comment from "../Images/ic-comment.png";
import commentWhite from "../Images/ic-comment-white.png";

import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationCard = (props) => {
  const [background, setBackground] = React.useState(null);
  const css = {
    backgroundImage: `url(${background})`,
  };

  React.useEffect(() => {
    if (props.postImg === "orange") {
      setBackground(BG1);
    } else if (props.postImg === "blue") {
      setBackground(BG2);
    } else if (props.postImg === "green") {
      setBackground(BG3);
    } else if (props.postImg === "purple") {
      setBackground(BG4);
    } else if (props.postImg.includes("https")) {
      setBackground(props.postImg);
    }
  }, [props]);

  return (
    <CertifiCont className={props.sortBg} style={css}>
      <div className="certifi_card_relative">
        <div className="certifi_card_top">
          {/* {userInfo === null ? <h2>00:00</h2> : <h2>{userInfo}</h2>} */}
          <h2>{props.studyTime}</h2>

          <p>{props.postContent}</p>
        </div>
        <div className="certifi_card_bottom">
          <p>
            <span className="">동그라미</span>
            {props.User.nick}
          </p>

          <div className="certifi_card_bottom_comment">
            {props.postImg.includes("https") ? (
              <img src={commentWhite} alt="댓글 아이콘" />
            ) : (
              <img src={comment} alt="댓글 아이콘" />
            )}
            <p>{props.commentNum}</p>
          </div>
        </div>
      </div>
    </CertifiCont>
  );
};

const CertifiCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 17.1vw;
  height: 22vw;
  border-radius: 0.76vw;
  background-size: cover;
  box-sizing: border-box;
`;
export default CertificationCard;
