from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Serve static files
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

# API endpoints
@app.route('/api/specializations', methods=['GET'])
def get_specializations():
    specializations = [
        {"id": 1, "name": "General Medicine", "description": "24/7 comprehensive care for all general health needs"},
        {"id": 2, "name": "Dental", "description": "Complete oral care from general dentistry to orthodontics"},
        {"id": 3, "name": "Pediatrics", "description": "Expert child healthcare and development"},
        {"id": 4, "name": "Orthopedics", "description": "Bone, joint, and musculoskeletal care"},
        {"id": 5, "name": "ENT", "description": "Ear, Nose, and Throat specialist treatments"},
        {"id": 6, "name": "Diabetology", "description": "Diabetes management and care"},
        {"id": 7, "name": "Dermatology", "description": "Skin care and cosmetology"},
        {"id": 8, "name": "Speech Therapy", "description": "Professional speech and language therapy"}
    ]
    return jsonify(specializations)

@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    doctors = [
        {
            "id": 1, "name": "Dr. Muhammad Ilyas", "specialization": "Family Physician", "department": "General Medicine",
            "timing": "24 Hours / 7 Days", "qualification": "MBBS, FFM (AFPI)"
        },
        {
            "id": 2, "name": "Dr. Muhammed Nazeer", "specialization": "General Physician", "department": "General Medicine",
            "timing": "24 Hours / 7 Days", "qualification": "MBBS"
        },
        {
            "id": 3, "name": "Dr. Afsal .K", "specialization": "RMO", "department": "General Medicine",
            "timing": "24 Hours / 7 Days", "qualification": "MBBS"
        },
        {
            "id": 4, "name": "Dr. Alfas Ali Khan", "specialization": "General Dentist", "department": "Dental",
            "timing": "Mon-Sat: 10 AM-2 PM | Mon & Fri: 6 PM", "qualification": "BDS"
        },
        {
            "id": 5, "name": "Dr. Sonu Clarence", "specialization": "Endodontist", "department": "Dental",
            "timing": "Mon-Sat: 10 AM-2 PM", "qualification": "BDS"
        },
        {
            "id": 6, "name": "Dr. Jerry Bastin", "specialization": "Oral Surgeon", "department": "Dental",
            "timing": "Mon-Sat: 10 AM-2 PM", "qualification": "BDS"
        },
        {
            "id": 7, "name": "Dr. Sunny George", "specialization": "Orthodontist", "department": "Dental",
            "timing": "Mon & Fri: 6 PM", "qualification": "BDS"
        },
        {
            "id": 8, "name": "Dr. Aleena Thomas", "specialization": "Orthodontist", "department": "Dental",
            "timing": "Mon & Fri: 6 PM", "qualification": "BDS"
        },
        {
            "id": 9, "name": "Dr. Sreelakshmi V", "specialization": "Paedodontist", "department": "Dental",
            "timing": "Mon-Sat: 10 AM-2 PM", "qualification": "BDS"
        },
        {
            "id": 10, "name": "Dr. Mohammed Khalil", "specialization": "Pediatric Internist", "department": "Pediatrics",
            "timing": "Mon-Sat: 5 PM-8 PM", "qualification": "MBBS, DCH"
        },
        {
            "id": 11, "name": "Dr. Mohammed Rafeeq", "specialization": "Orthopedic Surgeon", "department": "Orthopedics",
            "timing": "Mon, Wed, Fri: 5:30 PM-7 PM", "qualification": "MBBS, D Ortho, MS Ortho"
        },
        {
            "id": 12, "name": "Dr. Muhammad Shafeeq", "specialization": "ENT Specialist", "department": "ENT",
            "timing": "Thursday: 5 PM-7 PM", "qualification": "MBBS, DLO"
        },
        {
            "id": 13, "name": "Dr. Asha MS", "specialization": "ENT Specialist", "department": "ENT",
            "timing": "Mon-Sat: 5 PM-8 PM | Wed: 5 PM-6:30 PM", "qualification": "MBBS, DLS, DNB"
        },
        {
            "id": 14, "name": "Dr. Shobha Shalini", "specialization": "Diabetologist", "department": "Diabetology",
            "timing": "Call to confirm", "qualification": "MBBS, Dip Diabetology"
        },
        {
            "id": 15, "name": "Dr. Indhu Balan", "specialization": "Dermatology & Cosmetology", "department": "Dermatology",
            "timing": "Wednesday: 5 PM-6:30 PM", "qualification": "MBBS, MD"
        },
        {
            "id": 16, "name": "Ahana Abid", "specialization": "Speech Therapist", "department": "Speech Therapy",
            "timing": "Mon-Sat: 5 PM-8 PM", "qualification": "Speech Therapist"
        }
    ]
    return jsonify(doctors)

@app.route('/api/hospital-info', methods=['GET'])
def get_hospital_info():
    info = {
        "name": "Blackstone Hyaat Hospital",
        "tagline": "24hr Service Everyday",
        "address": "Karukapilly, Kaloor, Kochi, Kerala", 
        "phone": "+91 9746 768983",
        "email": "info@hyaathospital.com",
        "emergency": "+91 4843 5689"
    }
    return jsonify(info)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
