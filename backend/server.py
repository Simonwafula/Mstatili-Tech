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
            "name": "Data Solutions & Ecosystem Planning",
            "description": "Comprehensive data ecosystem planning and implementation - from strategy to execution, ensuring data-driven transformation",
            "icon": "📊",
            "features": [
                "Data Strategy & Roadmap Planning",
                "Data Architecture Design", 
                "Data Governance & Quality Management",
                "Data Integration & Pipeline Development",
                "Advanced Analytics & Business Intelligence",
                "Data Security & Compliance",
                "Performance Monitoring & Optimization",
                "Training & Change Management"
            ],
            "detailed_services": [
                {
                    "name": "Data Strategy & Planning",
                    "description": "Comprehensive data strategy aligned with business objectives, including roadmap development and stakeholder engagement"
                },
                {
                    "name": "Data Architecture & Infrastructure",
                    "description": "Scalable data architecture design, technology stack assessment, and infrastructure optimization"
                },
                {
                    "name": "Data Governance & Quality",
                    "description": "Establish data governance policies, quality assurance processes, and stewardship frameworks"
                },
                {
                    "name": "Analytics & Intelligence",
                    "description": "Advanced analytics implementation, AI/ML integration, and business intelligence dashboards"
                },
                {
                    "name": "Data Integration & Management",
                    "description": "Seamless data integration across systems, pipeline development, and automated data processing"
                },
                {
                    "name": "Compliance & Security",
                    "description": "Data privacy compliance (GDPR, local regulations), security implementation, and risk management"
                }
            ]
        }
    ]
    return {"services": services}

@app.get("/api/data-solutions-detail")
async def get_data_solutions_detail():
    data_solutions = {
        "title": "Data Solutions & Ecosystem Planning",
        "subtitle": "From Strategy to Implementation - Complete Data Transformation",
        "overview": "We provide end-to-end data ecosystem planning and implementation services, helping organizations transform their data into strategic business assets. Our approach follows industry best practices and ensures sustainable, scalable data solutions.",
        "planning_phases": [
            {
                "phase": "1. Discovery & Assessment",
                "description": "Current state analysis, stakeholder mapping, and objective definition",
                "deliverables": ["Data audit report", "Stakeholder analysis", "Gap assessment", "Business requirements"]
            },
            {
                "phase": "2. Strategy & Planning",
                "description": "Data strategy development, roadmap creation, and governance framework design",
                "deliverables": ["Data strategy document", "Implementation roadmap", "Governance framework", "Success metrics"]
            },
            {
                "phase": "3. Architecture & Design",
                "description": "Technical architecture design, technology selection, and infrastructure planning",
                "deliverables": ["System architecture", "Technology recommendations", "Security framework", "Integration plan"]
            },
            {
                "phase": "4. Implementation",
                "description": "System deployment, data integration, and process implementation",
                "deliverables": ["Deployed systems", "Data pipelines", "Quality processes", "Training materials"]
            },
            {
                "phase": "5. Optimization & Support",
                "description": "Performance monitoring, continuous improvement, and ongoing support",
                "deliverables": ["Performance reports", "Optimization recommendations", "Support documentation", "Training programs"]
            }
        ],
        "key_benefits": [
            "Improved decision-making through data-driven insights",
            "Increased operational efficiency and cost reduction",
            "Enhanced data quality and governance",
            "Better compliance and risk management",
            "Scalable and future-proof data infrastructure",
            "Competitive advantage through advanced analytics"
        ],
        "technologies": [
            "Cloud Data Platforms (AWS, Azure, GCP)",
            "Data Warehousing & Lakes",
            "ETL/ELT Tools",
            "Business Intelligence Platforms",
            "Machine Learning & AI Tools",
            "Data Visualization Tools"
        ]
    }
    return data_solutions

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)