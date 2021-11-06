import React, { useState } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";

import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const SliderStyled = withStyles({
  root: {
    color: "#1672ec",
    height: 8,
    width: 300,
    margin: 2,
    padding: 12,
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
// const SliderStyled = withStyles({
//   root: {
//     width: 300,
//     color: "#1672ec",
//   },
//   thumb: { backgroundColor: "#1672ec", height: 24, width: 24 },
//   track: { backgroundColor: "#1672ec", height: 28, width: 28 },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

function MuiSlider() {
  return (
    <SliderStyled
      defaultValue={0}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-always"
      step={null}
      marks={marks}
      valueLabelDisplay="on"
    />
  );
}

export default MuiSlider;
