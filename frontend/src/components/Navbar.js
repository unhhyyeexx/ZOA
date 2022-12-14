import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { debounce } from "lodash";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegSmile, FaRegUser } from "react-icons/fa";
import { RiChatVoiceFill } from "react-icons/ri";
import { BiCalendarAlt } from "react-icons/bi";

const Container = styled.div`
  height: 64px;
  width: 100vw;
  @media screen and (min-width: 720px) {
    width: 70vh;
  }
  position: fixed;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  border-radius: 20px 20px 0 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: ${(props) => (props.active === true ? "none" : "grid")};
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
`;

const StyledLink = styled(Link)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const SelectBox = styled.div`
  width: 80%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #ff787f, #fec786);
  color: white;
`;

const UnSelectBox = styled.div`
  width: 60%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: none;
  border-radius: 30px;
  background: none;
  color: white;
`;

function Navbar() {
  const location = useLocation();
  const [height, setHeight] = useState(window.innerHeight);
  const [active, setActive] = useState(false);
  const [defaultActive, setDefaultActive] = useState(false);
  const handleResize = debounce(() => {
    setHeight(window.innerHeight);
  }, 50);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (!defaultActive) {
      if (height <= 600) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [height, defaultActive]);
  useEffect(() => {
    if (
      location.pathname === "/intro" ||
      location.pathname === "/kakaoSignup" ||
      location.pathname === "/register" ||
      location.pathname === "/kakaoLoading" ||
      location.pathname === "/family/manage" ||
      location.pathname === "/family/create" ||
      location.pathname === "/family/select/" ||
      location.pathname === "/family/code" ||
      location.pathname === "/family/edit" ||
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname.includes("join")
    ) {
      setActive(true);
      setDefaultActive(true);
    } else {
      setActive(false);
      setDefaultActive(false);
    }
  }, [location]);

  return (
    <div>
      <Container active={active}>
        <StyledLink to="/">
          {location.pathname === "/" ||
          location.pathname.includes("/checklist") ? (
            <SelectBox>
              <AiOutlineHome size={28} color={"white"} />
            </SelectBox>
          ) : (
            <UnSelectBox>
              <AiOutlineHome size={28} color={"#BEBEBE"} />
            </UnSelectBox>
          )}
        </StyledLink>
        <StyledLink to="/calendar">
          {location.pathname.includes("/calendar") ? (
            <SelectBox>
              <BiCalendarAlt size={28} color={"white"} />
            </SelectBox>
          ) : (
            <UnSelectBox>
              <BiCalendarAlt size={28} color={"#BEBEBE"} />
            </UnSelectBox>
          )}
        </StyledLink>
        <StyledLink to="/hello">
          {location.pathname.includes("/hello") ? (
            <SelectBox>
              <FaRegSmile size={28} color={"white"} />
            </SelectBox>
          ) : (
            <UnSelectBox>
              <FaRegSmile size={28} color={"#BEBEBE"} />
            </UnSelectBox>
          )}
        </StyledLink>
        <StyledLink to="/voice">
          {location.pathname.includes("/voice") ? (
            <SelectBox>
              <RiChatVoiceFill size={28} color={"white"} />
            </SelectBox>
          ) : (
            <UnSelectBox>
              <RiChatVoiceFill size={28} color={"#BEBEBE"} />
            </UnSelectBox>
          )}
        </StyledLink>
        <StyledLink to="/settings">
          {location.pathname.includes("/settings") ? (
            <SelectBox>
              <FaRegUser size={24} color={"white"} />
            </SelectBox>
          ) : (
            <UnSelectBox>
              <FaRegUser size={24} color={"#BEBEBE"} />
            </UnSelectBox>
          )}
        </StyledLink>
      </Container>
    </div>
  );
}

export default Navbar;
