import formatBooleans from "@helpers/formatBooleans";
import formatDates from "@helpers/formatDates";

export const summaryLabels = (object: any) => {
  let finalArray: any = [];
  delete object.appendedDocuments;

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

// export const summaryLabels = (object: any) => {
//   let finalArray: any = [];
//   let appDataCopy = JSON.parse(JSON.stringify(object));

//   delete appDataCopy.appendedDocuments;

//   Object.entries(appDataCopy).forEach((item: any) => {
//     let obj = Object.entries(item[1]);
//     formatDates(obj);
//     formatBooleans(obj);
//     finalArray.push(obj);
//   });

//   return finalArray;
// };
