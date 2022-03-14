import { format, isDate } from "date-fns";

const formatDates = (obj: any) => {
  obj.forEach((prop: any) => {
    if (
      prop[1]
        .toString()
        .match(/\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d\.\d\d\d\w/g) !== null
    ) {
      prop[1] = format(new Date(prop[1]), "P");
      console.log(prop[1]);
    }
  });
};

export default formatDates;
