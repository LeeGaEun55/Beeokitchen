import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "../../hook/AuthProvider";

const AdminHeader = () => {
  const { LoginOut } = useAuth();
  return (
    <div>
      <Nav height="50px">
        <LineWrap width="100%" height="50px">
          <Ul>
            <Li>
              <Link href="/admin/create/menu">
                <a>메뉴 추가</a>
              </Link>
            </Li>
            <Li>
              <Link href="/admin/create/store">
                <a>매장 추가</a>
              </Link>
            </Li>
            <Li>
              <Link href="/admin/create/faq">
                <a>FAQ 추가</a>
              </Link>
            </Li>
            <Li>
              <Link href="/admin/create/notice">
                <a>공지사항 추가</a>
              </Link>
            </Li>
            <Li>
              <Link href="/admin/startup-list">
                <a>창업문의</a>
              </Link>
            </Li>
            <Li>
              <button onClick={LoginOut}>로그아웃</button>
            </Li>
          </Ul>
        </LineWrap>
      </Nav>
    </div>
  );
};

const Ul = styled.div`
  display: flex;
  list-style: none;
`;
const Li = styled.li`
  font-weight: 500;
  color: #ffffffcc;
  text-decoration: none;
  @media only screen and (max-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 10px 0 10px;
  }
  @media only screen and (min-width: 600px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 15px 0 15px;
  }
  @media only screen and (min-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 30px 0 30px;
  }
  @media only screen and (min-width: 992px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 30px 0 30px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: ${(props) => props.theme.fontSizes.xl};
    padding: 0 30px 0 30px;
  }
`;

type WrapProps = {
  width: string;
  height: string;
};

type NavProps = {
  height: string;
};

const Wrap = styled.div`
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  height: ${(props: NavProps) => (props.height ? props.height : "")};
  width: ${(props: WrapProps) => (props.width ? props.width : "")};
`;
const LineWrap = styled.div`
  display: flex;
  float: left;
  justify-content: center;
  align-items: center;
  height: ${(props: NavProps) => (props.height ? props.height : "")};
  width: ${(props: WrapProps) => (props.width ? props.width : "")};
  box-shadow: 4px 4px 4px rgb(0 0 0 / 5%);
`;

const Nav = styled.div`
  width: 100%;
  height: ${(props: NavProps) => (props.height ? props.height : "")};
  box-sizing: border-box;
  background: #2c2c2c;
`;
const PcHeade = styled.div`
  box-sizing: border-box;
  background: #2c2c2c;
  box-shadow: 0 3px 3px rgb(0 0 0 / 20%) !important;
  @media only screen and (max-width: 991px) {
    display: none !important;
  }
`;
export default AdminHeader;
