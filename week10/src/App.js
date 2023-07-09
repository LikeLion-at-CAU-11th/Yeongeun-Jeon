import { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import styled from "styled-components";
import LionInfoModal from "./components/lioninfo/LionInfoModal";
import LionTestModal from "./components/liontest/LionTestModal";



function App() {
  const [modal, setModal] = useState(0);


  return (
    <Router>
      <AppDom>
        <MenuDom>
          <MenuButtonLink clicked={modal === 0} onClick={() => setModal(0)} to="/lioninfo">
            아기사자 정보
          </MenuButtonLink>
          <MenuButtonLink clicked={modal === 1} onClick={() => setModal(1)} to="/liontest">
              멋사인 테스트
          </MenuButtonLink>
        </MenuDom>

      <Routes>
        <Route path="/lioninfo" element={<LionInfoModal />} />
        <Route path="/liontest" element={<LionTestModal />} />
      </Routes>
      </AppDom>
    </Router>
  );
}

export default App;

const AppDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const MenuButtonLink = styled(Link)`
  display: flex;
  width: 200px;
  height: 100px;
  border-radius: 20px;
  background-color: ${(props) => (props.clicked ? "orange" : "gray")};
  color: white;
  font-size: 25px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

const MenuDom = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
`;