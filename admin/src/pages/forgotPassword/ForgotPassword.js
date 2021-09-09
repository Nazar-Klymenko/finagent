import { useHistory, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { Input } from "@components/input";
import { CTA } from "@components/buttons";

const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const formSubmit = () => {
    history.push("./passwordEmail");
  };

  return (
    <ContentWrap>
      <div className="forgot-page">
        <ForgotTitle>Restore password</ForgotTitle>
        <FormWrap>
          <Form id="form" onSubmit={handleSubmit(formSubmit)}>
            <Input
              ref={register}
              name="Email"
              labelName="E-mail:"
              type="email"
              autofocus={true}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Form>
          <p>We will send you an email with a link to restore password</p>
          <ButtonPosition>
            <CTA text="Restore" />
          </ButtonPosition>
        </FormWrap>
        <AuthOptions>
          <span>
            Don’t need to restore password?
            <NavLink className="login-link" to="/auth/login">
              Log in
            </NavLink>
          </span>
        </AuthOptions>
      </div>
    </ContentWrap>
  );
};

export default ForgotPassword;

const ForgotTitle = styled.h1`
  align-self: center;
  text-align: center;
  margin: 1rem 0;
`;
const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  p {
    color: ${({ theme }) => theme.lightGray};
    font-size: 0.8rem;
  }
`;

const ButtonPosition = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;
const AuthOptions = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  span {
    color: ${({ theme }) => theme.lightGray};
    font-size: 0.8rem;
  }
  .login-link {
    text-decoration: none;
    color: ${({ theme }) => theme.lightBlue};
    padding-left: 0.5rem;
    &:visited {
      color: ${({ theme }) => theme.lightBlue};
    }
  }
`;
