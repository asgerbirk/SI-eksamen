import fs from "fs";
import yaml from "js-yaml";
import { XMLParser } from "fast-xml-parser";
import csv from "csv-parser";

export function readJSON(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

export function readYAML(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return yaml.load(fileContent);
}

export function readXML(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parser = new XMLParser();
  return parser.parse(fileContent);
}

export async function readCSV(filePath) {
  const results = [];
  const stream = fs.createReadStream(filePath).pipe(csv());

  for await (const data of stream) {
    results.push(data);
  }

  return results;
}

export function readTextFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  // Opdel indholdet i linjer
  const lines = fileContent.split("\n");

  // Initialiser et objekt til at holde de parrede data
  const parsedData = {};

  // Iterer over hver linje for at ekstrahere nøgle-værdi-par
  lines.forEach((line) => {
    const [key, value] = line.split(":").map((part) => part.trim()); // Opdel ved ':' og trim whitespace
    if (key && value) {
      parsedData[key] = value;
    }
  });

  // Returner det parsede objekt
  return parsedData;
}
