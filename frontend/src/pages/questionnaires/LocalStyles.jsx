import styled from "styled-components/macro";

export const Page = styled.div`
  min-width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    min-width: unset;
  }
`;

export const Title = styled.h1`
  text-align: left;
`;

export const Subtitle = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

export const ButtonsWrap = styled.div`
  padding: 16px 0px;
  display: flex;
  justify-content: ${({ multiple }) =>
    multiple ? "space-between" : "flex-end"};
`;

export const Legend = styled.legend`
  /* font-size: 0.9rem; */
`;

export const RadioWrap = styled.div`
  display: flex;
`;

export const ErrorBottom = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.red};
`;

export const ApplicantBox = styled.div`
  min-height: 60px;
  background-color: ${({ theme }) => theme.lightestGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  .person {
    width: 100%;
    background-color: white;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    /* -webkit-box-shadow: 0px 0px 37px -7px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 37px -7px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 37px -7px rgba(0, 0, 0, 0.15); */
    border: 1px solid ${({ theme }) => theme.border};
    .minor-data-place {
      span {
        margin-left: 1rem;
        font-weight: 600;
        opacity: 0.8;
      }
    }
    .action-place {
      span {
        margin-right: 1rem;
      }
      .edit {
        color: ${({ theme }) => theme.blue};
        cursor: pointer;
      }
      .delete {
        color: ${({ theme }) => theme.red};
        cursor: pointer;
      }
    }
  }
  .add {
    color: ${({ theme }) => theme.blue};
    cursor: pointer;
    padding: 1rem 0;
  }
`;

export const InputErrorMessage = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 0.75rem;
  letter-spacing: 0.03333em;
  margin: 6px 0px 0px;
  .invis-star {
    opacity: 0;
    pointer-events: none;
  }
`;
