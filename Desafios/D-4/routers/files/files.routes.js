const express = require("express");
const multer = require("multer");
const path = require("path");

const generateFilesHtml = (files) => {
  let html = "";
  files.forEach((file, index) => {
    let filePath = file.path.split("public/")[1];
    const linkElement = `<a href='${filePath}'>${file.fieldname}-${
      index + 1
    }</a><br>`;
    html += linkElement;
  });
  return html;
};

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // req=> peticion
    // file=> representa el archivo que se está caargando
    // cb=> callback para manejar el proceso asincrono de cargar el archivo

    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const extension = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

router.post("/file", upload.single("file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error(" Debe cargar un archivo!");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.sendFile(
    path.resolve(__dirname, `../../public/uploads/${file.filename}`)
  );
});

router.post("/files", upload.array("files"), (req, res) => {
  const files = req.files;
  if (!files || files.length < 1) {
    const error = new Error(" Debe cargar uno o más archivos!");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(generateFilesHtml(files));
});

module.exports = router;
