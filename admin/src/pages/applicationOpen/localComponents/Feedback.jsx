// import React from "react";
// import styled from "styled-components/macro";
// import { useForm } from "react-hook-form";
// import moment from "moment";
// import Form from "@components/Form";
// import { CTA } from "@components/buttons";
// import Subheader from "@components/Subheader";
// import { Textarea } from "@components/input";
// import Section from "./Section";
// import { sendFeedbackAPI } from "@api/mainAPI";
// interface Props {
//   setApplication: (arg0: object) => void;
//   id: string;
//   feedbackArray: [];
//   defaultTime: string;
// }
// const Feedback: React.FC<Props> = ({
//   setApplication,
//   id,
//   feedbackArray,
//   defaultTime,
// }) => {
//   return (
//     <div>
//       <Subheader
//         subheader="Feedback to the user"
//         description="Give user some feedback"
//       />
//     </div>
//   );
// };
// export default Feedback;
import moment from "moment";
import { useForm } from "react-hook-form";
import styled from "styled-components/macro";

import { sendFeedbackAPI } from "@api/mainAPI";

import Form from "@components/Form";
import Subheader from "@components/Subheader";
import { CTA } from "@components/buttons";
import { Textarea } from "@components/input";
import { Message } from "@components/svgs";

import Section from "./Section";

const TextareaWrap = styled.div`
  width: 560px;
`;
const FeedbackStyled = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const FeedbackWrap = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  min-height: 90px;
  overflow-y: scroll;
  width: 560px;
  border: 1px solid ${({ theme }) => theme.lightestGray};
  border-radius: 4px;
  margin-bottom: 8px;
  &::-webkit-scrollbar {
    width: 0.6em;
    padding: 0px 2px;
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.lightGray};
  }
`;
const FeedbackMessage = styled.div`
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
  height: auto;
`;
const MessageDate = styled.div`
  font-size: 0.8rem;
  color: $Gray;
  min-width: 8rem;
  padding-top: 6px;
`;
const MessageText = styled.div`
  padding-left: 12px;
  font-size: 0.95rem;
  padding-top: 4px;
`;

const Feedback = ({ id, feedbackArray, defaultTime }) => {
  const { reset, register, handleSubmit, formState } = useForm({
    defaultValues: {
      feedback: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });
  const { isDirty } = formState;

  const formSubmit = async (data) => {
    try {
      const feedbackResponse = await sendFeedbackAPI(data, id);
      reset();
      alert("feedback sent successfully");
    } catch (error) {
      alert("couldn't send feedback");
    }
  };

  return (
    <Section isDirty={isDirty}>
      <Subheader
        subheader="Feedback to the user"
        description="Give user some feedback"
      />
      <UserFeedback defaultTime={defaultTime} feedbackArray={feedbackArray} />
      <Form id="form-feedback" onSubmit={handleSubmit(formSubmit)}>
        <TextareaWrap>
          <Textarea
            ref={register}
            name="feedback"
            type="text"
            placeholder="type the message to the user:"
            id="feedback"
          />
        </TextareaWrap>
        <CTA isBlocked={!isDirty} text="Send" form="form-feedback" />
      </Form>
    </Section>
  );
};

export default Feedback;

export const UserFeedback = ({ defaultTime, feedbackArray }) => {
  let messagesLength = feedbackArray.length || 0;

  const messages =
    feedbackArray &&
    feedbackArray.map((msg, idx) => {
      let createdAt = moment(msg.date).fromNow();
      return (
        <FeedbackMessage>
          <MessageDate>{createdAt}</MessageDate>
          <MessageIcon idx={idx} length={messagesLength} />
          <MessageText>{msg.message}</MessageText>
        </FeedbackMessage>
      );
    });

  return (
    <FeedbackStyled>
      <FeedbackWrap>
        {messagesLength === 0 ? (
          <EmptyMessageRow defaultTime={defaultTime} />
        ) : (
          messages
        )}
      </FeedbackWrap>
    </FeedbackStyled>
  );
};

const EmptyMessageRow = ({ defaultTime }) => {
  let createdAt = moment(defaultTime).fromNow();

  return (
    <FeedbackMessage>
      <MessageDate>{createdAt}</MessageDate>
      <MessageIcon idx={0} length={1} />
      <MessageText>You don't have any feedback yet</MessageText>
    </FeedbackMessage>
  );
};

const MessageIcon = ({ idx, length }) => {
  const checkDash = () => {
    if (idx + 1 === length) {
      return "feedback-message-icon-wrap--hidden";
    }
  };
  return (
    <div className={`feedback-message-icon-wrap ${checkDash()} `}>
      <div className={`feedback-message-icon `}>
        <Message />
      </div>
    </div>
  );
};
