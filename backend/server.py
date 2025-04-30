from fastapi import FastAPI, APIRouter, File, UploadFile, HTTPException, Depends, Form, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import json
import base64
from enum import Enum

# Directory setup
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'zemedic_ai_db')]

# Create the main app without a prefix
app = FastAPI(title="ZemedicAI API", description="AI-powered medical imaging analysis API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Authentication setup
SECRET_KEY = os.environ.get("SECRET_KEY", "zemedicai_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

# Data Models
class UserRole(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"

class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[UserRole] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: UserRole

class UserCreate(UserBase):
    password: str
    medical_license_id: Optional[str] = None

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserInDB(User):
    hashed_password: str

class ImageAnalysisResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    image_type: str
    findings: List[Dict[str, Any]]
    confidence_scores: Dict[str, float]
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    image_url: Optional[str] = None

class AnalysisRequest(BaseModel):
    image_type: str
    image_data: str  # Base64 encoded image

# Authentication functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(email: str):
    user = await db.users.find_one({"email": email})
    if user:
        return UserInDB(**user)

async def authenticate_user(email: str, password: str):
    user = await get_user(email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.PyJWTError:
        raise credentials_exception
    user = await get_user(email=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user

# Mock AI analysis function (to be replaced with real integration)
def analyze_medical_image(image_type: str, image_data: str):
    """
    Mock function to simulate AI analysis of medical images.
    In production, this would integrate with Google Cloud Healthcare API or another AI service.
    """
    # Simulated response
    if image_type.lower() == "xray":
        return {
            "findings": [
                {"name": "Pneumonia", "location": "Right Lower Lobe", "severity": "Moderate"},
                {"name": "Pleural Effusion", "location": "Right Side", "severity": "Mild"}
            ],
            "confidence_scores": {
                "Pneumonia": 0.94,
                "Pleural Effusion": 0.78,
                "Tuberculosis": 0.01
            }
        }
    elif image_type.lower() == "mri":
        return {
            "findings": [
                {"name": "Disc Herniation", "location": "L4-L5", "severity": "Moderate"},
                {"name": "Spinal Stenosis", "location": "L3-L4", "severity": "Mild"}
            ],
            "confidence_scores": {
                "Disc Herniation": 0.89,
                "Spinal Stenosis": 0.76,
                "Tumor": 0.02
            }
        }
    else:
        return {
            "findings": [
                {"name": "No significant findings", "location": "N/A", "severity": "N/A"}
            ],
            "confidence_scores": {
                "Normal": 0.95
            }
        }

# Authentication Routes
@api_router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}, 
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# User Routes
@api_router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate doctor registration
    if user.role == UserRole.DOCTOR and not user.medical_license_id:
        raise HTTPException(status_code=400, detail="Medical license ID required for doctor registration")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_data = user.dict()
    user_data.pop("password")
    user_obj = UserInDB(**user_data, hashed_password=hashed_password)
    
    await db.users.insert_one(user_obj.dict())
    return User(**user_data)

@api_router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# Image Analysis Routes
@api_router.post("/analyze", response_model=ImageAnalysisResult)
async def analyze_image(
    analysis_request: AnalysisRequest,
    current_user: User = Depends(get_current_active_user)
):
    # Perform AI analysis using the mock function
    analysis_result = analyze_medical_image(
        analysis_request.image_type, 
        analysis_request.image_data
    )
    
    # Create result object
    result = ImageAnalysisResult(
        user_id=current_user.id,
        image_type=analysis_request.image_type,
        findings=analysis_result["findings"],
        confidence_scores=analysis_result["confidence_scores"]
    )
    
    # Save to database
    await db.analysis_results.insert_one(result.dict())
    
    return result

@api_router.get("/analyses", response_model=List[ImageAnalysisResult])
async def get_user_analyses(current_user: User = Depends(get_current_active_user)):
    analyses = await db.analysis_results.find(
        {"user_id": current_user.id}
    ).sort("timestamp", -1).to_list(100)
    
    return [ImageAnalysisResult(**analysis) for analysis in analyses]

@api_router.get("/analyses/{analysis_id}", response_model=ImageAnalysisResult)
async def get_analysis_by_id(
    analysis_id: str,
    current_user: User = Depends(get_current_active_user)
):
    analysis = await db.analysis_results.find_one({"id": analysis_id, "user_id": current_user.id})
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return ImageAnalysisResult(**analysis)

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ZemedicAI"}

# Model Training Routes (for doctors)
@api_router.post("/model/train")
async def train_model(
    current_user: User = Depends(get_current_active_user)
):
    if current_user.role != UserRole.DOCTOR and current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=403, 
            detail="Only doctors and admins can train models"
        )
    
    # In a real implementation, this would initiate a model training job
    return {
        "status": "training_initiated",
        "message": "Model training has been queued. You will be notified when complete.",
        "estimated_completion_time": datetime.utcnow() + timedelta(hours=2)
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
