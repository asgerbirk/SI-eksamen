from fastapi import FastAPI
import requests
from readAndParseFiles import (
    parse_text_file,
    parse_json_file,
    parse_yaml_file,
    parse_csv_file,
    parse_xml_file,
)

app = FastAPI()

filePath = "../me."


@app.get("/txt")
def read_txt():
    data = parse_text_file(filePath + "txt")
    return data


@app.get("/json")
def read_json():
    data = parse_json_file(filePath + "json")
    return data


@app.get("/yaml")
def read_yaml():
    data = parse_yaml_file(filePath + "yaml")
    return data


@app.get("/csv")
def read_csv():
    data = parse_csv_file(filePath + "csv")
    return data


@app.get("/xml")
def read_xml():
    data = parse_xml_file(filePath + "xml")
    return data


@app.get("/requestExpress/{file_type}")
def request_express(file_type: str):
    response = requests.get("http://localhost:8080/" + file_type)
    result = response.json()
    return result
