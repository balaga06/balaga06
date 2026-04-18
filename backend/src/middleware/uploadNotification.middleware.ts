import multer from "multer";
import path from "path";
import fs from "fs";

/* CREATE FOLDER IF NOT EXISTS */
const uploadPath = "uploads/notifications";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* STORAGE */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const uploadNotification = multer({ storage });