import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from routes.template_routes import api_fruits
from routes.pen_routes import api_pen

app = FastAPI()
api = APIRouter(prefix="/api", tags=["API"])

# Atention: Adjust the origins list to match your frontend's URL
# For example, if your frontend is running on localhost:5173, you can set it
origins: List[str] = [
    "http://localhost:5173",
    "https://*.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api.include_router(api_fruits)
api.include_router(api_pen)

app.include_router(api)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)