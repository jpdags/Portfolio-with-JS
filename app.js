const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
 
    cb(null, 'pfp.jpg')
  }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.send('No file uploaded!');
  }
  

  res.send('success');
});

app.get('/pfp/latest', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/uploads/pfp.jpg'));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});