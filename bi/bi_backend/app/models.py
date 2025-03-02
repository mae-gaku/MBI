# app/models.py
from pydantic import BaseModel
from datetime import date

class SalesData(BaseModel):
    date: date
    sales: float
