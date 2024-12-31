import express from "express";
import { parseTypeORMEntities } from "./parser/entityParser";
import cors from "cors";


const app = express();
const PORT = 3001;
app.use(cors());

app.get("/parse", (req, res) => {
  const entities = parseTypeORMEntities("./src/entities");
  res.json(entities);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
