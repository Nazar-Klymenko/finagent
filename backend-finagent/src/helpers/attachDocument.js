import Application from "models/application.js";
import createError from "http-errors";

import path from "path";
const __dirname = path.resolve();

async function attachImagesAdmin(appId, files) {
  if (files.length > 0) {
    for (const file of files) {
      let { newPath } = deconstructFile(file, "attachments");

      await Application.findByIdAndUpdate(
        appId,
        { $push: { attachments: { fileName: file.name } } },
        { safe: true, upsert: true }
      );
      file.mv(newPath);
    }
  }
}

async function attachImagesUser(files, model) {
  let documentsArray = [];
  files.forEach(async (file) => {
    let newPath = deconstructFile(file, "documents");
    // console.log(file);
    // console.log(file.name);
    file.mv(newPath);
    documentsArray = [...documentsArray, { fileName: file.name }];
    console.log(documentsArray);
  });

  model.documents = documentsArray;

  return model;
}

function deconstructFile(file, type) {
  const imgPath = path.resolve(__dirname, "./src/files/");
  const newPath = `${imgPath}/${type}/${file.name}`;
  return newPath;
}

export { attachImagesUser, attachImagesAdmin };
