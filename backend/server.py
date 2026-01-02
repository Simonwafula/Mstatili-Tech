from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
from datetime import datetime
import uuid
import logging
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sqlite3
from contextlib import contextmanager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - [%(request_id)s] - %(message)s'
)
logger = logging.getLogger(__name__)

# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Mstatili Tech and Data Solutions API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware with env-based restrictions
ALLOWED_ORIGINS = os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# SQLite Database Setup
DATABASE_PATH = os.environ.get('DATABASE_PATH', '/home/mstatilitechnologies.com/data/mstatili.db')

def init_database():
    """Initialize SQLite database with required tables"""
    os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        # Create contacts table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                company TEXT NOT NULL,
                service TEXT NOT NULL,
                message TEXT NOT NULL,
                organization_type TEXT,
                timeline TEXT,
                budget_range TEXT,
                preferred_contact_method TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'new',
                ip_address TEXT
            )
        ''')
        
        # Create service_inquiries table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS service_inquiries (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                service_type TEXT NOT NULL,
                project_details TEXT NOT NULL,
                budget_range TEXT,
                timeline TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'new',
                ip_address TEXT
            )
        ''')
        
        conn.commit()
        logger.info("Database initialized successfully")

@contextmanager
def get_db_connection():
    """Context manager for database connections"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_database()

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    
    logger.info(f"Request started: {request.method} {request.url.path}", 
                extra={'request_id': request_id})
    
    response = await call_next(request)
    
    logger.info(f"Request completed: {request.method} {request.url.path} - Status: {response.status_code}",
                extra={'request_id': request_id})
    
    return response

# Email notification helper (optional SMTP support)
async def send_notification_email(data: dict):
    """Send email notification for new submissions (optional)"""
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    notification_recipient = os.environ.get('NOTIFICATION_EMAIL')
    
    # Skip if SMTP not configured
    if not all([smtp_host, smtp_port, smtp_user, smtp_pass, notification_recipient]):
        return
    
    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = notification_recipient
        msg['Subject'] = f"New Contact Form Submission from {data.get('name')}"
        
        body = f"""
New contact form submission:

Name: {data.get('name')}
Email: {data.get('email')}
Phone: {data.get('phone')}
Company: {data.get('company', 'N/A')}
Service: {data.get('service', data.get('service_type', 'N/A'))}
Message: {data.get('message', data.get('project_details', 'N/A'))}

Organization Type: {data.get('organization_type', 'N/A')}
Timeline: {data.get('timeline', 'N/A')}
Budget Range: {data.get('budget_range', 'N/A')}
Preferred Contact: {data.get('preferred_contact_method', 'N/A')}

Submitted: {data.get('created_at')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        with smtplib.SMTP(smtp_host, int(smtp_port)) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            
        logger.info(f"Notification email sent for submission {data.get('id')}")
    except Exception as e:
        logger.error(f"Failed to send notification email: {str(e)}")
        # Don't fail the request if email fails
        pass

# Pydantic models with validation
class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: str = Field(..., min_length=2, max_length=100)
    service: str = Field(..., min_length=2, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)
    organizationType: Optional[str] = Field(None, max_length=50)
    timeline: Optional[str] = Field(None, max_length=50)
    budgetRange: Optional[str] = Field(None, max_length=50)
    preferredContactMethod: Optional[str] = Field(None, max_length=20)
    honeypot: Optional[str] = Field(None, max_length=0)  # Spam trap
    
    @field_validator('honeypot')
    @classmethod
    def honeypot_must_be_empty(cls, v):
        if v:
            raise ValueError('Invalid form submission')
        return v

class ServiceInquiry(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    service_type: str = Field(..., min_length=2, max_length=100)
    project_details: str = Field(..., min_length=10, max_length=2000)
    budget_range: str = Field(..., max_length=50)
    timeline: str = Field(..., max_length=50)
    honeypot: Optional[str] = Field(None, max_length=0)  # Spam trap
    
    @field_validator('honeypot')
    @classmethod
    def honeypot_must_be_empty(cls, v):
        if v:
            raise ValueError('Invalid form submission')
        return v

@app.get("/api/")
@limiter.limit("30/minute")
async def root(request: Request):
    return {"message": "Welcome to Mstatili Tech and Data Solutions API"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint for monitoring"""
    try:
        with get_db_connection() as conn:
            conn.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}

@app.post("/api/contact")
@limiter.limit("5/minute")
async def submit_contact_form(contact: ContactForm, request: Request):
    try:
        contact_data = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "phone": contact.phone,
            "company": contact.company,
            "service": contact.service,
            "message": contact.message,
            "organization_type": contact.organizationType,
            "timeline": contact.timeline,
            "budget_range": contact.budgetRange,
            "preferred_contact_method": contact.preferredContactMethod,
            "created_at": datetime.utcnow().isoformat(),
            "status": "new",
            "ip_address": get_remote_address(request)
        }
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO contacts (
                    id, name, email, phone, company, service, message,
                    organization_type, timeline, budget_range, 
                    preferred_contact_method, created_at, status, ip_address
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                contact_data['id'], contact_data['name'], contact_data['email'],
                contact_data['phone'], contact_data['company'], contact_data['service'],
                contact_data['message'], contact_data['organization_type'],
                contact_data['timeline'], contact_data['budget_range'],
                contact_data['preferred_contact_method'], contact_data['created_at'],
                contact_data['status'], contact_data['ip_address']
            ))
            conn.commit()
        
        logger.info(f"Contact form submitted: {contact.email}", 
                   extra={'request_id': request.state.request_id})
        
        # Optional: Send notification email
        await send_notification_email(contact_data)
        
        return {"message": "Thank you for your inquiry! We'll get back to you soon.", "success": True}
    
    except ValueError as e:
        # Honeypot triggered
        logger.warning(f"Honeypot triggered from {get_remote_address(request)}", 
                      extra={'request_id': request.state.request_id})
        # Return success to avoid revealing spam detection
        return {"message": "Thank you for your inquiry! We'll get back to you soon.", "success": True}
    
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}", 
                    extra={'request_id': request.state.request_id})
        raise HTTPException(status_code=500, detail=f"Error submitting form: {str(e)}")

@app.post("/api/service-inquiry")
@limiter.limit("5/minute")
async def submit_service_inquiry(inquiry: ServiceInquiry, request: Request):
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
            "created_at": datetime.utcnow().isoformat(),
            "status": "new",
            "ip_address": get_remote_address(request)
        }
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO service_inquiries (
                    id, name, email, phone, service_type, project_details,
                    budget_range, timeline, created_at, status, ip_address
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                inquiry_data['id'], inquiry_data['name'], inquiry_data['email'],
                inquiry_data['phone'], inquiry_data['service_type'],
                inquiry_data['project_details'], inquiry_data['budget_range'],
                inquiry_data['timeline'], inquiry_data['created_at'],
                inquiry_data['status'], inquiry_data['ip_address']
            ))
            conn.commit()
        
        logger.info(f"Service inquiry submitted: {inquiry.email}", 
                   extra={'request_id': request.state.request_id})
        
        await send_notification_email(inquiry_data)
        
        return {"message": "Service inquiry submitted successfully! Our team will contact you soon.", "success": True}
    
    except ValueError as e:
        # Honeypot triggered
        logger.warning(f"Honeypot triggered from {get_remote_address(request)}", 
                      extra={'request_id': request.state.request_id})
        return {"message": "Service inquiry submitted successfully! Our team will contact you soon.", "success": True}
    
    except Exception as e:
        logger.error(f"Error submitting service inquiry: {str(e)}", 
                    extra={'request_id': request.state.request_id})
        raise HTTPException(status_code=500, detail=f"Error submitting inquiry: {str(e)}")

@app.get("/api/services")
@limiter.limit("30/minute")
async def get_services(request: Request):
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
@limiter.limit("30/minute")
async def get_data_solutions_detail(request: Request):
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
    uvicorn.run(app, host="0.0.0.0", port=8000)