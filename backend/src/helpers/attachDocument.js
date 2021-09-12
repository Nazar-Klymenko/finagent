import Application from "models/application.js";

import path from "path";
const __dirname = path.resolve();

async function attachImagesAdmin(appId, files) {
  const application = await Application.findById(appId);
  files.forEach(async (file) => {
    let newPath = deconstructFile(appId, file, "attachments");

    file.mv(newPath);
    application.attachments.push({
      filename: file.name,
    });
  });
  application.save();
}

async function attachImagesUser(id, files, model) {
  files.forEach(async (file) => {
    let newPath = deconstructFile(id, file, "documents");
    file.mv(newPath);
    model.documents.push({
      filename: file.name,
    });
  });

  return model;
}

function deconstructFile(id, file, type) {
  const imgPath = path.resolve(__dirname, "./src/files/");
  const newPath = `${imgPath}/${id}/${type}/${file.name}`;
  return newPath;
}

export { attachImagesUser, attachImagesAdmin };
