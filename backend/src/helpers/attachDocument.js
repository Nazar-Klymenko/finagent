import fs, { mkdir } from "fs";
import path from "path";
import PDFDocument from "pdfkit";
const __dirname = path.resolve();
import Application from "models/application.js";

async function attachImagesUser(id, files, model) {
  files.forEach(async (file) => {
    let { newPath, newFileName } = createFilePathPdf(id, file, "documents");

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(String(newPath)));
    doc
      .image(file.data, {
        fit: [500, 400],
        align: "center",
        valign: "center",
      })
      .save();
    doc.end();
    model.documents.push({
      filename: newFileName + ".pdf",
    });
  });

  return model;
}

// function createFilePathPdf(id, file, type) {
//   const imgPath = path.resolve(__dirname, "./src/files/");
//   let fileName = file.name;
//   let fileNameStripped = fileName.split(".");
//   fileNameStripped.pop();

//   const newPath = `${imgPath}/${id}/${type}/`;
//   if (!fs.existsSync(newPath)) {
//     fs.mkdirSync(newPath, { recursive: true });
//   }
//   return newPath;
// }
function createFilePathPdf(id, file, type) {
  const imgPath = path.resolve(__dirname, "./src/files/");
  let fileName = file.name;
  fileName = fileName.replace(/\s+/g, "");
  let newFileName = fileName.split(".");
  newFileName.pop();

  const newPathFolder = `${imgPath}/${id}/${type}/`;
  const newPath = `${imgPath}/${id}/${type}/${newFileName}.pdf`;
  if (!fs.existsSync(newPathFolder)) {
    fs.mkdirSync(newPathFolder, { recursive: true });
  }
  return { newPath, newFileName };
}

function createFilePath(id, file, type) {
  const imgPath = path.resolve(__dirname, "./src/files/");
  const newPath = `${imgPath}/${id}/${type}/${file.name}`;
  return newPath;
}

async function attachImagesAdmin(appId, files) {
  const application = await Application.findById(appId);
  files.forEach(async (file) => {
    let newPath = createFilePath(appId, file, "attachments");

    file.mv(newPath);
    application.attachments.push({
      filename: file.name,
    });
  });
  application.save();
}

export { attachImagesUser, attachImagesAdmin };
