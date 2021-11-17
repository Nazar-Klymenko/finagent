import React from "react";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { policyholderSchema } from "./applicationHelpers/specialistAccessSchema";

import { ButtonsWrap } from "../LocalStyles";
import { MuiRadio, DateInput, PhoneInput } from "@components/input";
import { Modal } from "@components/modals";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import validateAppData from "@helpers/validateAppData";

import { useData } from "@context/dataContext";

const AddPolicyHolder = ({ openModal, setOpenModal }) => {};

export default AddPolicyHolder;
