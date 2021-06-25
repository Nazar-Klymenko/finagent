import React from "react";

export const FlagUA = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
    <path fill="#0057B7" d="M0 0h3v2H0z" />
    <path fill="gold" d="M0 1h3v1H0z" />
  </svg>
);

export const FlagPL = () => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Flag of Poland"
    viewBox="0 0 16 10"
  >
    <rect width="16" height="10" fill="#fff" />
    <rect width="16" height="5" fill="#dc143c" y="5" />
  </svg>;
};

export const FlagGB = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <clipPath id="a">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <clipPath id="b">
      <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
    </clipPath>
    <g clip-path="url(#a)">
      <path d="M0 0v30h60V0z" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6" />
      <path
        d="M0 0l60 30m0-30L0 30"
        clip-path="url(#b)"
        stroke="#C8102E"
        stroke-width="4"
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6" />
    </g>
  </svg>
);

export const FlagRU = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6">
    <rect fill="#fff" width="9" height="3" />
    <rect fill="#d52b1e" y="3" width="9" height="3" />
    <rect fill="#0039a6" y="2" width="9" height="2" />
  </svg>
);
