# Care Hospital Website

A modern, responsive hospital website built with React frontend and Flask backend, featuring beautiful scroll animations.

## Project Structure

```
hyaat/
├── backend/              # Flask backend
│   ├── app.py           # Flask application with API endpoints
│   ├── requirements.txt # Python dependencies
│   └── static/
│       └── images/      # Static images (logo, hospital image)
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main App component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Tailwind CSS imports
│   ├── public/          # Public assets
│   ├── package.json     # Node dependencies
│   └── vite.config.js   # Vite configuration
└── README.md
```

## Features

- **Modern UI Design**: Clean, professional healthcare website design
- **Scroll Animations**: Beautiful Framer Motion animations on scroll
- **Responsive Layout**: Works on all devices (mobile, tablet, desktop)
- **React Frontend**: Built with React, Vite, and Tailwind CSS
- **Flask Backend**: RESTful API for hospital data
- **Specializations Section**: Display medical specializations with icons
- **Doctors Section**: Show doctors with qualifications and timings
- **Contact Form**: Interactive contact form
- **Navigation**: Smooth scrolling navigation

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### GET /api/specializations
Returns list of medical specializations with icons and descriptions.

### GET /api/doctors
Returns list of doctors with their specializations, timings, and qualifications.

### GET /api/hospital-info
Returns hospital contact information and details.

### GET /images/<filename>
Serves static images from the backend.

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (for animations)
- Axios (for API calls)

### Backend
- Flask
- Flask-CORS (for CORS handling)

## Running the Application

1. Start the backend server first (terminal 1):
```bash
cd backend
python app.py
```

2. Start the frontend development server (terminal 2):
```bash
cd frontend
npm run dev
```

3. Open your browser and visit `http://localhost:3000`

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

### Backend Production
For production, consider:
- Using a production WSGI server like Gunicorn
- Setting up proper environment variables
- Configuring a reverse proxy (Nginx)
- Enabling HTTPS

## Customization

### Images
- Replace `backend/static/images/logo.png` with your hospital logo
- Replace `backend/static/images/hospital.png` with your hospital image
- Also copy these to `frontend/public/` for development

### Data
Edit `backend/app.py` to customize:
- Hospital information
- Specializations
- Doctors data
- Contact details

### Styling
- Modify `frontend/tailwind.config.js` for custom colors
- Edit component files for styling changes
- Adjust animation parameters in component files

## License

This project is open source and available for customization.
