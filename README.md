# Portfolio with Node.js Express

A modern portfolio website built with Node.js, Express, and multer for image upload functionality.

## Features

- **Responsive Design**: Modern, pixel-art inspired design with dark/light theme toggle
- **Image Upload**: Upload and manage profile pictures and project thumbnails
- **File Management**: Organized file storage in `/public/uploads/` directory
- **Real-time Updates**: Images update immediately after upload
- **Error Handling**: Comprehensive error handling for uploads and file operations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## File Structure

```
Portfolio-with-JS/
├── public/
│   └── uploads/
│       ├── pfp/          # Profile pictures
│       └── projects/     # Project thumbnails
├── imgs/                 # Static images (theme icons, etc.)
├── css/
│   └── styles.css        # Main stylesheet
├── script/
│   └── script.js         # Frontend JavaScript
├── app.js                # Express server
├── index.html            # Main HTML file
└── package.json          # Dependencies
```

## API Endpoints

### Upload Endpoints
- `POST /upload/pfp` - Upload profile picture
- `POST /upload/project` - Upload project image

### Management Endpoints
- `GET /api/images` - Get list of uploaded images
- `DELETE /api/images/:type/:filename` - Delete uploaded image

## Upload Features

- **File Validation**: Only image files are accepted
- **Size Limit**: 5MB maximum file size
- **Organized Storage**: Files are stored in organized directories
- **Automatic Updates**: Images display immediately after upload
- **Error Handling**: User-friendly error messages

## Technologies Used

- **Backend**: Node.js, Express.js
- **File Upload**: Multer
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: CSS Custom Properties, Grid Layout, Flexbox

## Usage

1. **Profile Picture**: Use the upload form in the About Me section
2. **Project Images**: Each project has its own upload form
3. **Theme Toggle**: Click the theme icon to switch between light/dark modes
4. **Responsive**: Works on desktop and mobile devices

## Development

The application uses:
- Express.js for the web server
- Multer for handling multipart/form-data (file uploads)
- Static file serving for images and assets
- RESTful API design for image management