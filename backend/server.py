from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import os
from datetime import datetime
import uuid

app = FastAPI(title="Mstatili Tech and Data Solutions API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL')
client = MongoClient(MONGO_URL)
db = client.mstatili_db

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str
    service: str
    message: str

class ServiceInquiry(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service_type: str
    project_details: str
    budget_range: str
    timeline: str

@app.get("/api/")
async def root():
    return {"message": "Welcome to Mstatili Tech and Data Solutions API"}

@app.post("/api/contact")
async def submit_contact_form(contact: ContactForm):
    try:
        contact_data = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "phone": contact.phone,
            "company": contact.company,
            "service": contact.service,
            "message": contact.message,
            "created_at": datetime.utcnow(),
            "status": "new"
        }
        
        result = db.contacts.insert_one(contact_data)
        
        if result.inserted_id:
            return {"message": "Thank you for your inquiry! We'll get back to you soon.", "success": True}
        else:
            raise HTTPException(status_code=500, detail="Failed to submit form")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting form: {str(e)}")

@app.post("/api/service-inquiry")
async def submit_service_inquiry(inquiry: ServiceInquiry):
    try:
        inquiry_data = {
            "id": str(uuid.uuid4()),
            "name": inquiry.name,
            "email": inquiry.email,
            "phone": inquiry.phone,
            "service_type": inquiry.service_type,
            "project_details": inquiry.project_details,
            "budget_range": inquiry.budget_range,
            "timeline": inquiry.timeline,
            "created_at": datetime.utcnow(),
            "status": "new"
        }
        
        result = db.service_inquiries.insert_one(inquiry_data)
        
        if result.inserted_id:
            return {"message": "Service inquiry submitted successfully! Our team will contact you soon.", "success": True}
        else:
            raise HTTPException(status_code=500, detail="Failed to submit inquiry")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting inquiry: {str(e)}")

@app.get("/api/services")
async def get_services():
    services = [
        {
            "id": "branding",
            "name": "Branding Solutions",
            "description": "Complete brand identity development including logo design, brand guidelines, and marketing materials",
            "icon": "🎨",
            "features": ["Logo Design", "Brand Guidelines", "Marketing Materials", "Brand Strategy"]
        },
        {
            "id": "app-development",
            "name": "App Development",
            "description": "Custom mobile and web application development using modern technologies",
            "icon": "📱",
            "features": ["Mobile Apps", "Web Applications", "API Development", "UI/UX Design"]
        },
        {
            "id": "automation",
            "name": "Automation Solutions",
            "description": "Business process automation to improve efficiency and reduce manual work",
            "icon": "🤖",
            "features": ["Process Automation", "Workflow Optimization", "Integration Solutions", "Custom Scripts"]
        },
        {
            "id": "ai-solutions",
            "name": "AI Solutions",
            "description": "Artificial intelligence and machine learning solutions for business optimization",
            "icon": "🧠",
            "features": ["Machine Learning", "AI Integration", "Predictive Analytics", "Natural Language Processing"]
        },
        {
            "id": "data-solutions",
            "name": "Data Solutions",
            "description": "Comprehensive data services from collection to analysis and reporting",
            "icon": "📊",
            "features": ["Data Collection", "Data Analysis", "Report Writing", "Data Advisory"]
        }
    ]
    return {"services": services}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)