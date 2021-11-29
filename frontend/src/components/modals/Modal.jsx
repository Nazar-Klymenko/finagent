import React, { useEffect, useRef } from "react";

import styled from "styled-components";

import { Cross } from "@components/svgs";

const Modal = ({ openModal, setOpenModal, header, children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [openModal]);

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, false);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, false);
  //   };
  // }, []);

  // const handleClickOutside = (e) => {
  //   if (openModal) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
  //       setOpenModal(false);
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <ModalStyled openModal={openModal}>
      <Dialog ref={wrapperRef}>
        <ModalHeader>
          <h2>{header}</h2>
          <div onClick={closeModal} className="icon-wrap">
            <Cross fill="#7d7d7d" height="24" width="24" stroke="8" />
          </div>
        </ModalHeader>
        {children}
      </Dialog>
      <IconWrap onClick={closeModal}>
        <Cross />
      </IconWrap>
    </ModalStyled>
  );
};

export default Modal;

const ModalStyled = styled.div`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: ${({ openModal }) => (openModal ? "flex" : "none")};
  align-items: ${({ openModal }) => (openModal ? "center" : "")};
  justify-content: ${({ openModal }) => (openModal ? "center" : "")};
  z-index: 100;
  padding: 50px 20px 70px;
`;
const IconWrap = styled.div`
  position: fixed;
  top: 3rem;
  right: 1rem;
  @media screen and(max-width: ${({ theme }) => theme.widthTablet}) {
    display: none;
  }
`;
const Dialog = styled.div`
  cursor: auto;
  max-height: calc(100vh - 120px);
  overflow-y: scroll;
  width: 60%;
  background: #ffffff;
  padding: 2rem;
  border-radius: 6px;
  h2 {
    text-align: center;
  }
  &::-webkit-scrollbar {
    width: 0.6em;
    padding: 0px 2px;
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.lightGray};
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    width: 100%;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  &.icon-wrap {
    cursor: pointer;
  }
`;
