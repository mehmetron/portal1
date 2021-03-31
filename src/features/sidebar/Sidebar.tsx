import React from "react";
import {Drawer, List, Hidden, Tooltip, ListItem, Avatar, CardContent, Typography, Button} from "@material-ui/core";
import { css } from "@emotion/core";
import { sidebarWidth } from "../../const";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "../../static/svg/sticstack.svg";
import { ReactComponent as GitHubIcon } from "../../static/svg/github.svg";
import {Link, NavLink, useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  mobileDrawerOpen,
  setMobileDrawerOpen,
} from "../responsive/ResponsiveSlice";
import UserMenu from "../../components/UserMenu";
import { fetchCurrentUser } from "./SidebarSlice";
import { RootState } from "../../store";
import { DN90, T50, DN40 } from "../../utils/colors";

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';




const Container = styled.div`
  height: 100%;
  /* background-color: #666eee; */
  background-color: #3F50B5;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const linkStyles = css`
  display: block;
  /* color: #8e97d8; */
  color: ${T50};
  font-weight: bold;
  padding: 6px 20px;
  text-decoration: none;
  &:hover {
    background-color: ${DN90};
    color: #fff;
    cursor: pointer;
  }
  &.active {
    color: #fff;
  }
`;







const Sidebar = () => {
  const dispatch = useDispatch();
  const mobileOpen = useSelector(mobileDrawerOpen);


  React.useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);


  const handleCloseMobileDrawer = () => {
    dispatch(setMobileDrawerOpen(false));
  };

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleCloseMobileDrawer}
          ModalProps={{ keepMounted: true }}
        >

          <DrawerContent />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer anchor="left" variant="permanent">

          <DrawerContent />
        </Drawer>
      </Hidden>
    </>
  );
};

const BottomBlock = styled.div`
  position: relative;
  left: 0px;
  /* bottom: 2rem; */
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GithubLink = styled.a`
  color: #fff;
  font-size: 1.75rem;
`;

const DrawerContent = () => {
  const history = useHistory();
  const loading = useSelector((state: RootState) => state.sidebar.fetchLoading);
  const currentUser = useSelector((state: RootState) => state.sidebar.user);




  return (
    <Container>
      <TopArea>
        <div>

          <Tooltip title="Leave Portal">
            <a href="/" target="_self" rel="noopener noreferrer" >
              <Logo
                css={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
                // onClick={() => history.push("/")}
              />
            </a>
          </Tooltip>

          <div style={{color: "white"}}>_____________</div>
          <a href="/" target="_self" rel="noopener noreferrer" css={linkStyles}>
            Leave Portal
          </a>

        </div>
      </TopArea>

      <List
        css={css`
          width: ${sidebarWidth}px;
          margin-top: 40px;
        `}
      >
        <BottomBlock>
          {loading && <UserMenu currentUser={currentUser} />}
        </BottomBlock>
        <br></br>
        <NavLink to="/portal/home/" exact css={linkStyles}>
          Home
        </NavLink>
        <NavLink to="/portal/boards/" exact css={linkStyles}>
          Instructed
        </NavLink>
        <NavLink to="/portal/enrolled/" exact css={linkStyles}>
          Enrolled
        </NavLink>

      </List>

    </Container>
  );
};

export default Sidebar;
