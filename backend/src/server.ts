import express from "express";
import { parseTypeORMEntities } from "./parser/entityParser";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import removeFilesInFolder from "./removeFilesInFolder";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());


const upload = multer({ dest: "uploads/" });

app.get("/parse", (req, res) => {
  const entities = parseTypeORMEntities("./src/entities");
  res.json(entities);
});


app.post("/upload-folder", upload.any(), async (req, res) => {
  const folderPath = path.resolve(__dirname, "../uploads");

  try {
    // Parse uploaded files in the folder
    const entities = await parseTypeORMEntities(folderPath);

    // Clean up uploaded files
    removeFilesInFolder(folderPath);    res.json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process the folder" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
