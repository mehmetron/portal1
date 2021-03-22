import React from "react";
import styled from "@emotion/styled";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { barHeight } from "../../const";
import { AvatarGroup } from "@material-ui/lab";
import { css } from "@emotion/core";
import { avatarStyles } from "../../styles";
// import MemberInvite from "../member/MemberInvite";
// import MemberDetail from "../member/MemberDetail";
// import MemberDialog from "../member/MemberDialog";
import { currentBoardOwner } from "./BoardSlice";
import CreateTaskDialog from "../task/CreateTaskDialog";
import EditTaskDialog from "../task/EditTaskDialog";
import { PRIMARY } from "../../utils/colors";
import { addColumn } from "../column/ColumnSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faCog } from "@fortawesome/free-solid-svg-icons";
// import { setDialogOpen } from "../label/LabelSlice";
// import LabelDialog from "../label/LabelDialog";
import { useParams, useHistory } from "react-router-dom";
import { Grid, Typography, Button } from '@material-ui/core';

import PlaylistAddRoundedIcon from '@material-ui/icons/PlaylistAddRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

// import { selectAllMembers, setMemberListOpen } from "../member/MemberSlice";
// import MemberListDialog from "../member/MemberList";

const Container = styled.div`
  height: ${barHeight}px;
  display: flex;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;
`;

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  //overflow-x: scroll;
`;

const Left = styled.div`
  white-space: nowrap;
  display: flex;
  margin-right: 1rem;
`;

const Right = styled.div`
  white-space: nowrap;
`;

const Name = styled.div`
  color: #6869f6;
`;

const buttonStyles = css`
  color: ${PRIMARY};
  .MuiButton-iconSizeSmall > *:first-of-type {
    font-size: 12px;
  }
`;

const BoardBar = () => {
  const dispatch = useDispatch();
  // const members = useSelector(selectAllMembers);
  const error = useSelector((state: RootState) => state.board.detailError);
  const detail = useSelector((state: RootState) => state.board.detail);
  const boardOwner = useSelector(currentBoardOwner);
  const { id } = useParams();
  const history = useHistory();

  const detailDataExists = detail?.id.toString() === id;

  if (!detailDataExists || error || !detail) {
    return null;
  }

  const handleAddColumn = () => {
    dispatch(addColumn(detail.id));
  };

  // const handleEditLabels = () => {
  //   dispatch(setDialogOpen(true));
  // };

  return (
    <Container>

      <Items>
        {/* <Left>
          <Name>{detail.name}</Name>
          <AvatarGroup
            max={3}
            data-testid="member-group"
            css={css`
              margin-left: 1.5rem;
              & .MuiAvatarGroup-avatar {
                ${avatarStyles}
                border: none;
              }
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={(e: any) => {
              if (e.target.classList.contains("MuiAvatarGroup-avatar")) {
                dispatch(setMemberListOpen(true));
              }
            }}
          >
            {members.map((member) => (
              <MemberDetail
                key={member.id}
                member={member}
                isOwner={detail.owner === member.id}
              />
            ))}
          </AvatarGroup>
          {boardOwner && <MemberInvite boardId={detail.id} />}
        </Left> */}

        {/*<Right>*/}
        {/*  /!* <Button*/}
        {/*    size="small"*/}
        {/*    css={css`*/}
        {/*      ${buttonStyles}*/}
        {/*      margin-right: 0.5rem;*/}
        {/*    `}*/}
        {/*    onClick={handleEditLabels}*/}
        {/*    startIcon={<FontAwesomeIcon icon={faCog} />}*/}
        {/*    data-testid="open-labels-dialog"*/}
        {/*  >*/}
        {/*    Edit labels*/}
        {/*  </Button> *!/*/}
        {/*  <Button*/}
        {/*    size="small"*/}
        {/*    css={css`*/}
        {/*      ${buttonStyles}*/}
        {/*    `}*/}
        {/*    onClick={handleAddColumn}*/}
        {/*    startIcon={<FontAwesomeIcon icon={faColumns} />}*/}
        {/*    data-testid="add-col"*/}
        {/*  >*/}
        {/*    Add List*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    size="small"*/}
        {/*    css={css`*/}
        {/*      ${buttonStyles}*/}
        {/*    `}*/}
        {/*    onClick={() => history.push(`/portal/b/${id}/edit`)}*/}
        {/*    startIcon={<FontAwesomeIcon icon={faColumns} />}*/}
        {/*    data-testid="add-col"*/}
        {/*  >*/}
        {/*    Edit Course*/}
        {/*  </Button>*/}
        {/*</Right>*/}


        <Right>
          <div>
            {/*<Typography*/}
            {/*    component="h2"*/}
            {/*    variant="overline"*/}
            {/*>*/}
            {/*  Organization*/}
            {/*</Typography>*/}
            <Typography
                component="h3"
                variant="h5"
            >
              Course Dashboard
            </Typography>
          </div>
        </Right>
        <Left>
          <div>
            <Button
                color="primary"
                onClick={handleAddColumn}
                variant="contained"
                size="small"
                startIcon={<PlaylistAddRoundedIcon />}
            >
              Add list
            </Button>
            {" "}
            <Button
                color="primary"
                onClick={() => history.push(`/portal/b/${id}/edit`)}
                variant="contained"
                size="small"
                startIcon={<EditRoundedIcon />}
            >
              Edit Course
            </Button>
          </div>
        </Left>
      </Items>
      {/* <MemberDialog board={detail} />
      <MemberListDialog /> */}
      <EditTaskDialog />
      <CreateTaskDialog />
      {/* <LabelDialog /> */}
    </Container>
  );
};

export default BoardBar;
