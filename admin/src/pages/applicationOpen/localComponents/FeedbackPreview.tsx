import React from "react";

import Subheader from "@components/Subheader";

// import { UserFeedback } from "./Feedback";

interface Props {
  feedbackArray: string;
  defaultTime: number;
}

const FeedbackPreview: React.FC<Props> = ({ feedbackArray, defaultTime }) => {
  return (
    <>
      <Subheader
        subheader="Feedback to the user"
        description="Give user some feedback"
      />
      Preview
      {/* <UserFeedback defaultTime={defaultTime} feedbackArray={feedbackArray} /> */}
    </>
  );
};

export default FeedbackPreview;
