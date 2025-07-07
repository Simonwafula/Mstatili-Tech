import requests
import unittest
import json
import re
from pymongo import MongoClient
import os

# Backend URL from frontend/.env
BACKEND_URL = "http://localhost:8001"
API_BASE_URL = f"{BACKEND_URL}/api"

# MongoDB connection
MONGO_URL = "mongodb://localhost:27017/mstatili_db"
client = MongoClient(MONGO_URL)
db = client.mstatili_db

class MstatiliBackendTests(unittest.TestCase):
    
    def setUp(self):
        # Clear test data before each test
        try:
            db.contacts.delete_many({"name": {"$regex": "^Test"}})
            db.service_inquiries.delete_many({"name": {"$regex": "^Test"}})
            print("Test data cleared from database")
        except Exception as e:
            print(f"Warning: Could not clear test data: {e}")
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        response = requests.get(f"{API_BASE_URL}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Welcome to Mstatili Tech and Data Solutions API")
        print("✅ Root endpoint test passed")
    
    def test_services_endpoint(self):
        """Test the services endpoint returns all 5 services with correct data"""
        response = requests.get(f"{API_BASE_URL}/services")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check if services key exists and contains 5 services
        self.assertIn("services", data)
        services = data["services"]
        self.assertEqual(len(services), 5, f"Expected 5 services, got {len(services)}")
        
        # Expected service IDs
        expected_service_ids = ["branding", "app-development", "automation", "ai-solutions", "data-solutions"]
        actual_service_ids = [service["id"] for service in services]
        self.assertEqual(sorted(actual_service_ids), sorted(expected_service_ids), 
                         f"Service IDs don't match. Expected: {expected_service_ids}, Got: {actual_service_ids}")
        
        # Check each service has required fields
        required_fields = ["id", "name", "description", "icon", "features"]
        for service in services:
            for field in required_fields:
                self.assertIn(field, service, f"Service {service['id']} missing required field: {field}")
            
            # Check features is a non-empty list
            self.assertIsInstance(service["features"], list)
            self.assertTrue(len(service["features"]) > 0, f"Service {service['id']} has empty features list")
        
        # Check enhanced data solutions service
        data_solutions = next((s for s in services if s["id"] == "data-solutions"), None)
        self.assertIsNotNone(data_solutions, "Data solutions service not found")
        
        # Verify data solutions title is correct
        self.assertEqual(data_solutions["name"], "Data Solutions & Ecosystem Planning", 
                         "Data solutions service name is incorrect")
        
        # Verify enhanced description mentions strategy to execution
        self.assertIn("strategy to execution", data_solutions["description"].lower(), 
                      "Data solutions description should mention 'strategy to execution'")
        
        # Verify data solutions has 8 detailed features
        self.assertEqual(len(data_solutions["features"]), 8, 
                         f"Expected 8 data solutions features, got {len(data_solutions['features'])}")
        
        # Verify detailed_services exists for data solutions
        self.assertIn("detailed_services", data_solutions, 
                      "Data solutions service missing detailed_services field")
        self.assertIsInstance(data_solutions["detailed_services"], list)
        self.assertTrue(len(data_solutions["detailed_services"]) > 0, 
                        "Data solutions detailed_services list is empty")
        
        print("✅ Services endpoint test passed with enhanced data solutions verification")
    
    def test_data_solutions_detail_endpoint(self):
        """Test the new data solutions detail endpoint"""
        response = requests.get(f"{API_BASE_URL}/data-solutions-detail")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Check required fields
        required_fields = ["title", "subtitle", "overview", "planning_phases", 
                           "key_benefits", "technologies"]
        for field in required_fields:
            self.assertIn(field, data, f"Data solutions detail missing required field: {field}")
        
        # Verify title is correct
        self.assertEqual(data["title"], "Data Solutions & Ecosystem Planning", 
                         "Data solutions detail title is incorrect")
        
        # Verify planning phases
        self.assertIsInstance(data["planning_phases"], list)
        self.assertEqual(len(data["planning_phases"]), 5, 
                         f"Expected 5 planning phases, got {len(data['planning_phases'])}")
        
        # Verify each planning phase has required fields
        phase_fields = ["phase", "description", "deliverables"]
        for phase in data["planning_phases"]:
            for field in phase_fields:
                self.assertIn(field, phase, f"Planning phase missing required field: {field}")
        
        # Verify key benefits
        self.assertIsInstance(data["key_benefits"], list)
        self.assertTrue(len(data["key_benefits"]) > 0, "Key benefits list is empty")
        
        # Verify technologies
        self.assertIsInstance(data["technologies"], list)
        self.assertTrue(len(data["technologies"]) > 0, "Technologies list is empty")
        
        print("✅ Data solutions detail endpoint test passed")
    
    def test_contact_form_submission(self):
        """Test contact form submission and database insertion with updated contact info"""
        test_data = {
            "name": "Test Contact",
            "email": "info@mstatilitechnologies.com",  # Updated email
            "phone": "+254 708 385 523",  # Updated phone format
            "company": "Test Company Ltd",
            "service": "data-solutions",  # Testing with data solutions
            "message": "This is a test message for the contact form."
        }
        
        # Submit contact form
        response = requests.post(f"{API_BASE_URL}/contact", json=test_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("message", data)
        
        # Verify data was inserted into MongoDB
        db_record = db.contacts.find_one({"name": "Test Contact"})
        self.assertIsNotNone(db_record, "Contact record not found in database")
        self.assertEqual(db_record["email"], test_data["email"])
        self.assertEqual(db_record["phone"], test_data["phone"])
        self.assertEqual(db_record["company"], test_data["company"])
        self.assertEqual(db_record["service"], test_data["service"])
        self.assertEqual(db_record["message"], test_data["message"])
        self.assertEqual(db_record["status"], "new")
        self.assertIn("id", db_record)
        self.assertIn("created_at", db_record)
        
        print("✅ Contact form submission test passed with updated contact information")
    
    def test_service_inquiry_submission(self):
        """Test service inquiry submission and database insertion with updated contact info"""
        test_data = {
            "name": "Test Inquiry",
            "email": "info@mstatilitechnologies.com",  # Updated email
            "phone": "+254 708 385 523",  # Updated phone format
            "service_type": "data-solutions",
            "project_details": "This is a test project for comprehensive data ecosystem planning.",
            "budget_range": "$10,000 - $20,000",
            "timeline": "6 months"
        }
        
        # Submit service inquiry
        response = requests.post(f"{API_BASE_URL}/service-inquiry", json=test_data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("message", data)
        
        # Verify data was inserted into MongoDB
        db_record = db.service_inquiries.find_one({"name": "Test Inquiry"})
        self.assertIsNotNone(db_record, "Service inquiry record not found in database")
        self.assertEqual(db_record["email"], test_data["email"])
        self.assertEqual(db_record["phone"], test_data["phone"])
        self.assertEqual(db_record["service_type"], test_data["service_type"])
        self.assertEqual(db_record["project_details"], test_data["project_details"])
        self.assertEqual(db_record["budget_range"], test_data["budget_range"])
        self.assertEqual(db_record["timeline"], test_data["timeline"])
        self.assertEqual(db_record["status"], "new")
        self.assertIn("id", db_record)
        self.assertIn("created_at", db_record)
        
        print("✅ Service inquiry submission test passed with updated contact information")
    
    def test_contact_form_validation(self):
        """Test validation for contact form submission"""
        # Test missing required field
        invalid_data = {
            "name": "Test Validation",
            "email": "test.validation@example.com",
            "phone": "+254712345678",
            # Missing company field
            "service": "branding",
            "message": "This is a test message."
        }
        
        response = requests.post(f"{API_BASE_URL}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity
        
        # Test invalid email format
        invalid_data = {
            "name": "Test Validation",
            "email": "invalid-email",  # Invalid email format
            "phone": "+254712345678",
            "company": "Test Company",
            "service": "branding",
            "message": "This is a test message."
        }
        
        response = requests.post(f"{API_BASE_URL}/contact", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity
        
        print("✅ Contact form validation test passed")
    
    def test_service_inquiry_validation(self):
        """Test validation for service inquiry submission"""
        # Test missing required field
        invalid_data = {
            "name": "Test Validation",
            "email": "test.validation@example.com",
            # Missing phone field
            "service_type": "ai-solutions",
            "project_details": "This is a test project.",
            "budget_range": "$1,000 - $5,000",
            "timeline": "1 month"
        }
        
        response = requests.post(f"{API_BASE_URL}/service-inquiry", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity
        
        # Test invalid email format
        invalid_data = {
            "name": "Test Validation",
            "email": "not-an-email",  # Invalid email format
            "phone": "+254712345678",
            "service_type": "ai-solutions",
            "project_details": "This is a test project.",
            "budget_range": "$1,000 - $5,000",
            "timeline": "1 month"
        }
        
        response = requests.post(f"{API_BASE_URL}/service-inquiry", json=invalid_data)
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity
        
        print("✅ Service inquiry validation test passed")
    
    def test_mongodb_connection(self):
        """Test MongoDB connection is working"""
        try:
            # Check if we can list collections
            collections = db.list_collection_names()
            self.assertIsInstance(collections, list)
            print("✅ MongoDB connection test passed")
        except Exception as e:
            self.fail(f"MongoDB connection failed: {e}")

if __name__ == "__main__":
    print("Starting Mstatili Tech and Data Solutions Backend API Tests...")
    print(f"Testing backend at: {API_BASE_URL}")
    unittest.main(verbosity=2)

if __name__ == "__main__":
    print("Starting Mstatili Tech and Data Solutions Backend API Tests...")
    print(f"Testing backend at: {API_BASE_URL}")
    unittest.main(verbosity=2)