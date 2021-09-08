import path from "path";
const __dirname = path.resolve();

const serveDocument = (req, res, next) => {
  let { filename, type, id } = req.params;

  try {
    const imgPath = path.resolve(__dirname, "./src/files");
    res.sendFile(`${imgPath}/${id}/${type}/${filename}`);
  } catch (error) {
    next(error);
  }
};
export default serveDocument;
