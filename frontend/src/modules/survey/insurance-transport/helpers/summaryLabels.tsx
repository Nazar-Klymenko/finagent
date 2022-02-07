export const summaryLabels = (object: any) => {
  let finalArray;
  delete object.appendedDocuments;

  finalArray = Object.entries(object);
  return finalArray;
};
