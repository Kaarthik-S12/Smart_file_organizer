from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from predictor import classify_files

app = FastAPI()

class File(BaseModel):
    name: str
    type: str

@app.post("/analyze")
def analyze_files(files: List[File]):

    file_list = [file.dict() for file in files]

    result = classify_files(file_list)

    return {
        "message": "File types analyzed successfully",
        "result": result
    }