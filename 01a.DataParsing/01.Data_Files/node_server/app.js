import express from "express";
import {
  readJSON,
  readYAML,
  readXML,
  readCSV,
  readTextFile,
} from "./readAndParseFiles.js";
const app = express();

const filePath = "../me.";

app.get("/json", (req, res) => {
  const jsonFilePath = filePath + "json";
  const jsonData = readJSON(jsonFilePath);
  res.send({ data: jsonData });
});

app.get("/yaml", (req, res) => {
  const yamlFilePath = filePath + "yaml";
  const yamlData = readYAML(yamlFilePath);
  res.send({ data: yamlData });
});

app.get("/xml", (req, res) => {
  const xmlFilePath = filePath + "xml";
  const xmlData = readXML(xmlFilePath);
  res.send({ data: xmlData });
});

app.get("/txt", (req, res) => {
  const plainTextFilePath = filePath + "txt";
  const plainTextData = readTextFile(plainTextFilePath);
  res.send({ data: plainTextData });
});

app.get("/csv", async (req, res) => {
  try {
    const csvFilePath = filePath + "csv";
    const csvData = await readCSV(csvFilePath);
    res.send({ data: csvData });
  } catch (error) {
    res.status(500).json({ error: "Error reading CSV file" });
  }
});

app.get("/requestFastAPI/:fileType", async (req, res) => {
  const { fileType } = req.params;
  try {
    const response = await fetch(`http://localhost:8000/${fileType}`);
    const data = await response.json();
    res.send({ data: data });
  } catch (error) {
    res.status(500).json({ error: "Error requesting FastAPI server" });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
