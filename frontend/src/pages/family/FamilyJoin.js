import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import {
  setFamilyId,
  setFamilyName,
  setFamilyUsers,
  setFamilyCreatedAt,
} from "../../features/family/familySlice";

const logo = 'https://user-images.githubusercontent.com/97648026/203668440-eb211853-8abe-4dc5-b0ee-8912e5cfefa3.png';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #ffcdbe;
  height: 56px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px 4px;
  img {
    height: 28px;
  }
`;

const Container = styled.div`
  margin: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const Info = styled.div`
  margin: auto;
  font-size: 1.25em;
  text-align: center;
  width: 100%;
`;
const ImgBox = styled.div`
  width: 60vw;
  @media screen and (min-width: 720px) {
    width: 432px;
  }
  display: flex;
  /* align-items: center;
     */
  overflow-x: scroll;
  overflow-y: hidden;
  margin: 32px 0;
`;
const Image = styled.div`
  width: 54px;
  height: 54px;
  object-fit: fill;
  border: none;
  border-radius: 100px;
  img {
    width: 54px;
    height: 54px;
    border-radius: 100px;
  }
`;
const BtnBox = styled.div``;
const Btn = styled.div`
  margin: 16px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 72px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #fec786, #ff787f);
  color: white;
  font-size: 1.25em;
  opacity: ${(props) => (props.active === true ? 1 : 0.5)};
`;

function FamilyJoin() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const familyId = params.familyId;
  const accessToken = useAppSelector((state) => state.token.access);
  const [family, setFamily] = useState("");
  const haveFam = useAppSelector((state)=>state.family.id);


  const clickYes = () => {
    if (haveFam > 0 ) {
      if (haveFam > 0 && Number(haveFam) === Number(familyId)) {
          alert("?????? ????????? ???????????????. ?????????????????? ???????????????!");
          dispatch(setFamilyId(familyId));
          localStorage.removeItem("familyId");
          navigate("/");
      } else{
        if (window.confirm("?????? ????????? ???????????? ????????????. ?????? ????????? ???????????? ????????? ????????? ????????????????")){
          axios({
            method: "PUT",
            url: `${process.env.REACT_APP_BACK_HOST}/family/secession/`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
            .then((result)=>
              { if(result.status === 200) {
                  axios({
                  method: "POST",
                  url: `${process.env.REACT_APP_BACK_HOST}/family/sign/${familyId}/`,
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    axios({
                      method: "GET",
                      url: `${process.env.REACT_APP_BACK_HOST}/family/${res.data.id}`,
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                      },
                    }).then((res)=>{
                      if (res.data.id >= 0) {
                        dispatch(setFamilyId(res.data.id));
                        dispatch(setFamilyName(res.data.name));
                        dispatch(setFamilyCreatedAt(res.data.created_at));
                        dispatch(setFamilyUsers(res.data.users));
                      } 
                      localStorage.removeItem("familyId");
                      alert(
                        "????????? ????????? ??????????????? ?????????????????????. ?????????????????? ???????????????!"
                        );
                        navigate("/");
                    }
                    )
                  }
                })}
                }
            )
        } else {
         alert('?????? ????????? ????????????, ?????????????????? ???????????????!')
         localStorage.removeItem("familyId");
         navigate("/")  
        }
      }
    }
    else{
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACK_HOST}/family/sign/${familyId}/`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axios({
              method: "GET",
              url: `${process.env.REACT_APP_BACK_HOST}/family/${res.data.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }).then((res) => {
              if (res.data.id >= 0) {
                dispatch(setFamilyId(res.data.id));
                dispatch(setFamilyName(res.data.name));
                dispatch(setFamilyCreatedAt(res.data.created_at));
                dispatch(setFamilyUsers(res.data.users));
              }
              localStorage.removeItem("familyId");
              alert(
                `${family.name}??? ??????????????? ?????????????????????! ?????????????????? ???????????????.`
              );
              navigate("/");
            });
          }
        })
    }
  };


  useEffect(() => {
    localStorage.setItem("familyId", familyId);
    if (!localStorage.getItem("access_token")) {
      navigate("/intro");
    } else {
      if (haveFam > 0 && Number(haveFam) === Number(familyId)) {
          alert('?????? ????????? ???????????????. ?????????????????? ???????????????!');
          localStorage.removeItem('familyId')
          navigate('/');
      } else {
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_BACK_HOST}/family/get/${familyId}/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }).then((res) => {
          setFamily(res.data);
        });
      }
        
    }
  }, [familyId]);





  return (
    <div>
      <Header>
        <img src={logo} alt="" />
      </Header>
      <Container>
        {family.length === 0 ? (
          <div></div>
        ) : (
          <div>
            <Info>
              <span style={{ fontWeight: "bold", color: "#ff787f" }}>
                {family.name}
              </span>{" "}
              ??? <br />
              ?????????????????????????
            </Info>
            <ImgBox>
              {family.users.map((item, index) => (
                <Image key={index}>
                  <img src={item.image} />
                </Image>
              ))}
            </ImgBox>
            <BtnBox>
              <Btn active={true} onClick={clickYes}>
                ???
              </Btn>
              <Btn active={false} onClick={() => {
                alert(`${family.name}????????? ?????????????????????. ?????? ?????? ???????????? ???????????????.`)
                localStorage.removeItem("familyId");
                navigate("/family/create");
              }}>
                ?????????
              </Btn>
            </BtnBox>
          </div>
        )}
      </Container>
    </div>
  );
}

export default FamilyJoin;
