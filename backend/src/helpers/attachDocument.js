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

async function attachImagesAdmin(id, files) {
  const application = await Application.findById(id);

  files.forEach(async (file) => {
    let { newPath, newFileName } = createFilePathPdf(id, file, "attachments");
    const doc = new PDFDocument();

    console.log({ file });
    doc.pipe(fs.createWriteStream(String(newPath)));
    doc
      .image(file.data, {
        fit: [500, 400],
        align: "center",
        valign: "center",
      })
      .save();
    doc.end();

    application.attachments.push({
      filename: newFileName + ".pdf",
    });
  });
  application.save();
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

export { attachImagesUser, attachImagesAdmin };
