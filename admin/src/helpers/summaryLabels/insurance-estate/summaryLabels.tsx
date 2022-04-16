import formatBooleans from "@helpers/formatBooleans";
import formatDates from "@helpers/formatDates";

export const summaryLabels = (object: any) => {
  let finalArray: any = [];

  Object.entries(object).forEach((item: any) => {
    let obj = Object.entries(item[1]);
    formatDates(obj);
    formatBooleans(obj);

    let propObject = Object.fromEntries(obj);

    let header = item[0];
    let labeledArray = [header, propObject];
    finalArray.push(labeledArray);
  });

  return finalArray;
};
