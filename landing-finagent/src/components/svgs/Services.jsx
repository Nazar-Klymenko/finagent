import React from "react";
// let win;
// if (typeof window !== "undefined") {
//   win = window;
// }

export const Heart = () => (
  <svg
    width="33"
    height="27"
    viewBox="0 0 329 277"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_heart)">
      <path
        d="M69.922 147.766C46.7691 124.613 46.7691 87.0749 69.922 63.922V63.922C93.0749 40.7691 130.613 40.7691 153.766 63.922L248.182 158.338L164.338 242.182L69.922 147.766Z"
        fill="#FF5757"
      />
      <path
        d="M175.234 63.9733C198.387 40.8204 235.925 40.8204 259.078 63.9733V63.9733C282.231 87.1261 282.231 124.664 259.078 147.817L164.663 242.233L80.8186 158.389L175.234 63.9733Z"
        fill="url(#paint0_linear_heart)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_heart"
        x="0"
        y="0"
        width="329"
        height="276.233"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="6" />
        <feGaussianBlur stdDeviation="14" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.341176 0 0 0 0 0.341176 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_heart"
        x1="259.078"
        y1="63.9733"
        x2="122.741"
        y2="200.311"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF5757" />
        <stop offset="1" stopColor="#FF5757" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const Travel = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 847 847"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d)">
      <circle
        cx="423.5"
        cy="417.5"
        r="389.5"
        fill="url(#paint0_linear)"
        fillOpacity="0.8"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M748.624 202.937C543.58 307.884 319.265 383.761 80.1219 424.313C64.8214 426.907 49.5306 429.345 34.251 431.628C36.1081 483.719 48.1943 533.204 68.5618 578.137C80.7681 576.252 92.9809 574.273 105.199 572.202C355.457 529.765 590.464 450.998 805.731 342.223C795.817 291.594 776.095 244.479 748.624 202.937Z"
      fill="#FFB700"
    />
    <defs>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="847"
        height="847"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          radius="4"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="6" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.333333 0 0 0 0 0 0 0 0 0 0.882353 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="669"
        y1="-39.5"
        x2="1.99999"
        y2="1175"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.333333" stopColor="#630EF0" />
        <stop offset="1" stopColor="#630EF0" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
