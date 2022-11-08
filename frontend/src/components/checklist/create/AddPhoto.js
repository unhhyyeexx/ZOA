import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import plus from "../../../assets/plus.png";
import { BsTrashFill } from "react-icons/bs";

const Container = styled.div`
  margin: 5% 5% 2%;
`;
const MainText = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  text-align: start;
  margin-bottom:4px;
`;

const Photo = styled.div`
  display: flex;
  justify-content: center;
  margin: 4px auto 4px;
  /* width: 33%; */
  height: 20vh;
  img {
    height: 20vh;
  }
`;
const DelBtn = styled.div`
  margin: 0 8px;
`;

function AddPhoto({ getPhoto }) {
  //미리보기용
  const [file, setFile] = useState(plus);
  //업로드 용
  const [photo, setPhoto] = useState("");
  const saveFile = (e) => {
    console.log(e);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPhoto(e.target.files[0]);
  };
  const deleteFile = () => {
    URL.revokeObjectURL(file);
    setFile(plus);
    setPhoto("");
  };
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  };

  useEffect(() => {
    getPhoto({ photo: photo });
  }, [file]);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <MainText>사진등록</MainText>
        {file !== plus ? (
          <DelBtn onClick={deleteFile}>
            <BsTrashFill size={24} style={{ color: "#707070", margin: "0" }} />
          </DelBtn>
        ) : (
          <div />
        )}
      </div>
      <Photo>
        <img src={file} alt="" onClick={handleClick} />
        <input
          type="file"
          name="imgUpload"
          accept="image/*"
          onChange={saveFile}
          style={{ display: "none" }}
          ref={photoInput}
        />
      </Photo>
    </Container>
  );
}

export default AddPhoto;
