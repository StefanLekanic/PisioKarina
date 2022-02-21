import styled from "styled-components";
import React from "react";
import { Tooltip } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

const Header = styled.div`
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  justify-content: space-between;
  display: flex;
  height: auto;
  line-height: 48px;
  padding: 0 25px;
  flex-wrap: wrap;
  align-items: center;
`;

const Title = styled.span`
  font-weight: bold;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutIcon = styled(LogoutOutlined)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 2px 4px;
  transition: all 0.3s;
  font-size: large;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.025);
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  transition: all 0.3s;
  font-size: large;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.025);
  }
`;

const ApplicationHeader = () => {
  const { logout, user } = useAuth0();

  return (
    <Header>
      <LeftSide>
        <Title>{"PISIO AM"}</Title>
      </LeftSide>
      <RightSide>
        <Tooltip title={"userInfo"}>
          <UserInfo>
            <UserOutlined />
            {user.email}
          </UserInfo>
        </Tooltip>
        <Tooltip title={"logout"}>
          <LogoutIcon onClick={logout} />
        </Tooltip>
      </RightSide>
    </Header>
  );
};

export default ApplicationHeader;
