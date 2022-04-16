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

/*
import formatBooleans from "@helpers/formatBooleans";
import formatDates from "@helpers/formatDates";

export const summaryLabels = (object: any) => {
  let finalArray: any = [];
  let subArray: any = [];
  let infoArray = object.insuredData.policyholder;

  infoArray.forEach((item: any) => {
    Object.entries(item).forEach((subitem: any, idx: number) => {
      console.log(subitem);

      let obj = Object.entries(subitem[1]);
      formatDates(obj);
      formatBooleans(obj);

      let propObject = Object.fromEntries(obj);

      let header = `policyholder ${idx + 1}`;
      let labeledArray = [header, propObject];
      subArray.push(labeledArray);
    });
  });

  delete object.insuredData.policyholder;

  Object.entries(object).forEach((item: any) => {
    let obj = Object.entries(item[1]);
    formatDates(obj);
    formatBooleans(obj);

    let propObject = Object.fromEntries(obj);

    let header = item[0];
    let labeledArray = [header, propObject];

    finalArray.push(labeledArray);
  });

  return { finalArray, subArray };
};

*/
