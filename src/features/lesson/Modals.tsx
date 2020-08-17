import React from "react";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { setCreateDialogOpen } from "./LessonSlice";
import { RootState } from "../../store";

const customStyles = {
  content: {
    position: "absolute",
    top: "auto",
    right: "50%",
    left: "auto",
    bottom: "auto",
    marginRight: "-50%",
    maxHeight: "100vh",
    overflowY: "auto",
  },
};
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)"
//   }
// };

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function Modals(props: { children: React.ReactNode }) {
  // // var subtitle;
  // const [modalIsOpen, setIsOpen] = React.useState(false);
  // function openModal() {
  //   setIsOpen(true);
  // }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = "green";
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }

  const dispatch = useDispatch();
  // const error = useSelector((state: RootState) => state.lesson.createError);
  const open = useSelector((state: RootState) => state.lesson.createDialogOpen);

  const handleOpen = () => {
    dispatch(setCreateDialogOpen(true));
  };

  const handleClose = () => {
    dispatch(setCreateDialogOpen(false));
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal
        isOpen={open}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleClose}
        // @ts-ignore
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={handleClose}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
        {props.children}
      </Modal>
    </div>
  );
}
