import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components/macro";

export const Page = styled.div`
  min-width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    min-width: 540px;
  }
  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
    min-width: 280px;
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

export const ButtonsWrap = styled.div<{ multiple?: boolean }>`
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
  min-height: 32px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 5px;
`;
export const ApplicantAdd = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.blue};
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding-left: 8px;
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

export const AvatarStyled = styled(Avatar)`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme }) => theme.blue};
`;

export const Applicant = styled.div<{ error: boolean }>`
  display: flex;
  border: 1px solid ${({ theme, error }) => (error ? theme.red : theme.gray)};
  padding: 8px 14px;
  border-radius: 4px;
  margin: 6px 0px;
  align-items: center;
`;

export const ApplicantName = styled.span`
  flex: 1;
  margin-left: 8px;
`;
