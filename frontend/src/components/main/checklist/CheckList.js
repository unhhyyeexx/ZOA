import styled from "styled-components";
import { FaPlusCircle } from "react-icons/fa";
import CheckListList from "./CheckListList";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 8px auto;
  z-index: 5;
`
const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 4px auto;

`

const CheckListNameWrapper = styled.div`
  color: #ff787f;
  font-weight: bold;
  margin: auto 8px;
  font-size: 18px;
`;

const CheckListPlusButton = styled.div`
  border-radius: 50%;
  color: #ff787f;
  margin: auto 8px;
  font-size: 20px;
`;


const CheckList = () => {
  const navigate = useNavigate();
  const plusClick = () => {
    console.log('here');
    navigate("/checklist/create/")
  }
  return(
    <Container>
        <TitleBox>
          <CheckListNameWrapper>체크리스트</CheckListNameWrapper>
          <CheckListPlusButton onClick={plusClick}>
            <FaPlusCircle size="20"/>
          </CheckListPlusButton>
      </TitleBox>
      <div>
        <CheckListList/>
      </div>

    </Container>
  )
};

export default CheckList;