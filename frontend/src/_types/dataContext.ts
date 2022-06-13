export interface DataContextTypes {
  insuranceBorder: InsuranceBorder;
  insuranceEstate: InsuranceEstate;
  insuranceHealth: InsuranceHealth;
  insuranceSpecialist: InsuranceSpecialist;
  insuranceTransport: InsuranceTransport;
  insuranceTravel: InsuranceTravel;
  loanCash: LoanCash;
  loanMortgage: LoanMortgage;
}

export type AllDataTypes =
  | "insuranceBorder"
  | "insuranceEstate"
  | "insuranceHealth"
  | "insuranceSpecialist"
  | "insuranceTransport"
  | "insuranceTravel"
  | "loanCash"
  | "loanMortgage";

export type DefaultPersonalData = {
  name: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
  citizenship: string;
};

export interface InsuranceBorder {
  insuranceData: InsuranceBorderInsuranceData;
  vehicleData: InsuranceBorderVehicleData;
  personalData: InsuranceBorderPersonalData;
}
export interface InsuranceBorderInsuranceData {
  documentType: string;
  pesel: string;
  passportNumber: string;
  registeredNotInEU: string;
  insurancePeriod: string;
}
export interface InsuranceBorderVehicleData {
  vehicleType: string;
  vehicleTypeOther: string;
  brand: string;
  model: string;
  regNumber: string;
  vinNumber: string;
  engineNumber: string;
  engineVolume: string;
  seatNumber: string;
}
export interface InsuranceBorderPersonalData extends DefaultPersonalData {}

export interface InsuranceEstate {
  insuranceData: InsuranceEstateInsuranceData;
  personalData: InsuranceEstatePersonalData;
}

export interface InsuranceEstateInsuranceData {
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
  estateType: string;
  floor: string;
  structure: string;
  areaM2: string;
  constructionYear: string;
  underConstruction: string;
  ownershipForm: string;
  creditOwnership: string;
  bankName: string;
  regon: string;
  nip: string;
  security: string;
  damagesNumber: string;
  insurancePeriod: string;
  insuranceStart: null;
  subjectAndSum: string;
  flatAndFixed: string;
  householdGoods: string;
}
export interface InsuranceEstatePersonalData extends DefaultPersonalData {
  policyholderIs: string;
  name: string;
  pesel: string;
  firmName: string;
  nip: string;
  regon: string;
  peopleNumber: string;
}

export interface InsuranceHealth {
  insuranceData: InsuranceHealthInsuranceData;
  insuredData: InsuranceHealthInsuredData;
}
export interface InsuranceHealthInsuranceData {
  insuranceStart: null;
  insuranceEnd: null;
  clauseOne: boolean;
  clauseTwo: boolean;
  clauseThree: boolean;
  clauseOnePrice: string;
  clauseTwoPrice: string;
  clauseThreePrice: string;
}
export interface InsuranceHealthInsuredData {
  policyholder: InsuranceBorderPolicyholder[];
}
export interface InsuranceBorderPolicyholder extends DefaultPersonalData {
  policyholderIs: string;
  citizenship: string;
  documentAdded: string;
}

export interface InsuranceSpecialist {
  personalData: DefaultPersonalData;
  insuredData: InsuranceSpecialistInsuredData;
}

export interface InsuranceSpecialistInsuredData {
  policyholder: DefaultPersonalData[];
}

export interface InsuranceSpecialistPersonalData {
  policyholderIs: string;
  citizenship?: string;
  name: string;
  nip: string;
  pesel: string;
  regon: string;
  phoneNumber?: string;
  email: string;
  documentAdded?: string;
  birthDate: null;
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
  insuranceStart?: null;
  insuranceEnd?: null;
  companyName?: string;
}

export interface InsuranceTransport {
  personalData: InsuranceTransportPersonalData;
  transportData: InsuranceTransportTransportData;
  specificData: InsuranceTransportSpecificData;
  additionalData: InsuranceTransportAdditionalData;
  appendedDocuments: InsuranceTransportAppendedDocuments;
}

export interface InsuranceTransportPersonalData extends DefaultPersonalData {
  oc: boolean;
  ac: boolean;
  greenCard: boolean;
  assistance: boolean;
  policyholderIs: string;
  companyName: string;
  documentAddedType: string;
  documentAdded: string;
  voivodeship: string;
  nip: string;
  isAppropLicence: boolean;
  birthDate: Date | null;
  drivingLicenceDate: Date | null;
  profession: string;
  maritalStatus: string;
}
export interface InsuranceTransportTransportData {
  registeredPoland: boolean;
  brand: string;
  model: string;
  version: string;
  regNumber: string;
  vinNumber: string;
  yearManufacture: Date | null;
}
export interface InsuranceTransportSpecificData {
  vehicleType: string;
  vehicleTypeOther: string;
  enginePower: string;
  engineVolume: string;
  fuelType: string;
  steeringWheel: string;
  transmissionType: string;
  abroadImport: boolean;
  purchaseYear: Date | null;
  kilometrage: string;
  techExamDate: Date | null;
  vehicleRegDate: Date | null;
  polandRegDate: Date | null;
}

export interface InsuranceTransportAdditionalData {
  predictMileage: string;
  useAbroad: string;
  usePurpose: string;
  parkingPlace: string;
  security: string;
}
export interface InsuranceTransportAppendedDocuments {
  filesTechPassport: File[] | null;
  filesPassport: File[] | null;
  filesCarSale: File[] | null;
  filesInsurance: File[] | null;
  isFirstOwner: boolean;
}

export interface InsuranceTravel {
  insuranceData: InsuranceTravelInsuranceData;
  personalData: DefaultPersonalData;
}

export interface InsuranceTravelInsuranceData {
  insuranceType: string;
  insuranceStart: null;
  insuranceEnd: null;
  peopleAmount: string;
  destination: string;
  purpose: string;
  inPoland: boolean;
}

export interface LoanCash {
  applicantData: ApplicantData;
  incomeData: IncomeData;
  loanData: LoanCashLoanData;
}

export interface ApplicantData {
  maritalStatus: string;
  propertySeparation: string;
  bothSpousesStart: string;
  applicant: Applicant[];
}

export interface Applicant {
  otherNation: string;
  nationality: string;
  validFrom: null;
  validUntil: null;
  name: string;
  birthDate: null;
  phoneNumber: string;
  email: string;
  pesel: string;
  contractFrom: null;
  contractUntil: null;
  averageIncome: string;
  currency: string;
  pit: string;
  bank: string;
}

export interface IncomeData {
  income: Income[];
}

export interface Income {
  truckDriver: string;
  industry: string;
  basicIncome: string;
  firstContract: string;
  sameEmployer: string;
  withoutPause: string;
  contractFrom: null;
  contractUntil: null;
  averageIncome: string;
  accountancy: string;
  pit: string;
  bank: string;
}

export interface LoanCashLoanData {
  remainingPayOff: string;
  lastApplications: string;
  custody: string;
  loanPurpose: string;
  loanAmount: string;
  paymentTerm: string;
  conditions: boolean;
}

export interface LoanMortgage {
  applicantData: ApplicantData;
  incomeData: IncomeData;
  loanData: LoanMortgageLoanData;
}

export interface LoanMortgageLoanData {
  custody: string;
  monthlyLoanPayments: string;
  cardLimits: string;
  loanPurpose: string;
  rialto: string;
  propertyValue: string;
  renovationValue: string;
  contributionAmount: string;
  paymentTerm: string;
  repayment: string;
  monthlyPayments: string;
  voivodeship: string;
  town: string;
  conditions: boolean;
}
