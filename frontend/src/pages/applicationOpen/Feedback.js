import React from "react";

import { Message } from "@components/svgs/Svgs";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Feedback = ({ defaultTime, messageArray }) => {
  let messagesLength = messageArray.length || 0;

  const messages =
    messageArray.length &&
    messageArray.map((msg, idx) => {
      return (
        <MessageRow key={idx} msg={msg} length={messagesLength} idx={idx} />
      );
    });

  return (
    <FeedbackStyled>
      <FeedbackContainerStyled>
        {messagesLength === 0 ? (
          <EmptyMessageRow defaultTime={defaultTime} />
        ) : (
          messages
        )}
      </FeedbackContainerStyled>
    </FeedbackStyled>
  );
};

export default Feedback;

const MessageRow = ({ msg, length, idx }) => {
  let createdAt = moment(msg.date).fromNow();
  return (
    <MessageStyled>
      <MessageDateStyled>{createdAt}</MessageDateStyled>
      <MessageIcon idx={idx} length={length} />
      <MessageTextStyled>{msg.message}</MessageTextStyled>
    </MessageStyled>
  );
};
const EmptyMessageRow = ({ defaultTime }) => {
  const { t } = useTranslation();
  let createdAt = moment(defaultTime).fromNow();

  return (
    <MessageStyled>
      <MessageDateStyled>{createdAt}</MessageDateStyled>
      <MessageIcon idx={0} length={1} />
      <MessageTextStyled>
        {t("ApplicationOpen.Feedback.noFeedback")}
      </MessageTextStyled>
    </MessageStyled>
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

const FeedbackStyled = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const FeedbackContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  min-height: 90px;
  overflow-y: scroll;
  width: 560px;
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 4px;
  padding: 12px;
  &::-webkit-scrollbar {
    width: 0.6em;
    padding: 0px 2px;
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.gray};
  }
`;
const MessageStyled = styled.div`
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
  height: auto;
`;

const MessageDateStyled = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray};
  min-width: 8rem;
  padding-top: 6px;
`;

const MessageTextStyled = styled.div`
  padding-left: 12px;
  font-size: 0.95rem;
  padding-top: 4px;
`;
