from fastapi import APIRouter, HTTPException
from models.pen_models import *
from utils.pen import Pen

api_pen = APIRouter(prefix="/pen", tags=["Pen Codifier"])

# Instância global da caneta com altura de 1cm
pen = Pen(height=1)


@api_pen.post("/codify", response_model=CodifyResponse)
def codify_text(request: CodifyRequest):
    """
    Codifica um texto em uma fração decimal.
    Retorna a fração e a altura correspondente em cm.
    """
    try:
        fraction = pen.calculate_respective_height(request.text)
        height_cm = float(fraction) * pen.height
        
        return CodifyResponse(
            text=request.text,
            fraction=fraction,
            height_cm=height_cm
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao codificar: {str(e)}")


@api_pen.post("/decodify", response_model=DecodifyResponse)
def decodify_fraction(request: DecodifyRequest):
    """
    Decodifica uma fração decimal de volta para texto.
    """
    try:
        text = pen.decodify_height(request.fraction)
        
        return DecodifyResponse(
            fraction=request.fraction,
            text=text
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao decodificar: {str(e)}")
