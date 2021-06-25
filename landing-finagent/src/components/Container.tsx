import React, { FC } from "react";

const Container: FC = ({ children }) => {
  return <div className="container mx-auto px-4 py-2 flex-1 ">{children}</div>;
};

export default Container;
