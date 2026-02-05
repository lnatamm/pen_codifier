from pydantic import BaseModel
from typing import Optional


class CodifyRequest(BaseModel):
    text: str


class CodifyResponse(BaseModel):
    text: str
    fraction: str
    height_cm: float


class DecodifyRequest(BaseModel):
    fraction: str


class DecodifyResponse(BaseModel):
    fraction: str
    text: str
