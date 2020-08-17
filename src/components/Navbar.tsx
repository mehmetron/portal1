import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { barHeight } from "../const";
// import UserMenu from "./UserMenu";
import { faRocket, faBars, faHeart } from "@fortawesome/free-solid-svg-icons";
import { setMobileDrawerOpen } from "../features/responsive/ResponsiveSlice";
import { useDispatch } from "react-redux";
import { Hidden } from "@material-ui/core";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { css } from "@emotion/core";
import { Tooltip } from "@material-ui/core";

const linkStyles = css`
  display: block;
  color: #8e97d8;
  font-weight: bold;
  padding: 18px 56px;
  text-decoration: none;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
  &.active {
    color: #fff;
  }
`;

const Container = styled.div`
  min-height: ${barHeight}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-bottom: 1px solid #999;
`;

const Item = styled.div`
  font-size: 1rem;
  color: #333;
`;

const Icons = styled.div`
  font-size: 1.25rem;
  a {
    color: #888;
    &:hover {
      color: #333;
    }
  }
  .active {
    color: #333;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const title = location.pathname.split("/")[2]; // Get title in path
  const upTitle = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize title

  return (
    <Container>
      <Item>
        <Icons>
          <Hidden smUp implementation="css">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => dispatch(setMobileDrawerOpen(true))}
            />
          </Hidden>
          <Tooltip
            title="Thank you!! We feel so loved♥"
            placement="left-end"
            arrow
          >
            <div>
              <Hidden xsDown implementation="css">
                <FontAwesomeIcon icon={faHeart} />
              </Hidden>
            </div>
          </Tooltip>
        </Icons>
      </Item>
      {/* <Item>Knboard</Item> */}
      <Item>{upTitle}</Item>
      <Item>
        {/* <UserMenu /> */}
        <div></div>
      </Item>
    </Container>
  );
};

export default Navbar;
