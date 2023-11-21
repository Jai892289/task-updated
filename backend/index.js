const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const UserModal = require("./User");
const multer = require("multer");

const app = express();
// const upload = multer();

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
});

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001", "http://localhost:3005", "http://127.0.0.1:5173/"];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// mongoose.connect('mongodb://127.0.0.1:27017/employee');

mongoose.connect('mongodb+srv://jgupta324:jai8922@cluster0.jazwwvu.mongodb.net/employee?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]));

app.get('/', async (req, res) => {
  try {
    const comments = await UserModal.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments.' });
  }
})

app.post('/register', async (req, res) => {
  try {
      const { title, description } = req.body;
      let audio, video, image, additionalText;

      if (req.files) {
          audio = req.files['audio'] ? req.files['audio'][0].buffer : null;
          video = req.files['video'] ? req.files['video'][0].buffer : null;
          image = req.files['image'] ? req.files['image'][0].buffer : null;
      }

      if (req.body.additionalText) {
          additionalText = req.body.additionalText.map((text, index) => ({
              [`additionalText${index}`]: text,
          }));
      }

      if (!title || !description) {
          return res.status(400).json({ error: 'Title and description are required fields.' });
      }

      const newUser = await UserModal.create({
          title,
          description,
          audio,
          video,
          image,
          ...additionalText, 
      });

      const populatedUser = await UserModal.findById(newUser._id)
          .select('title description audio video image additionalText')
          .exec();

      console.log("populatedUser", populatedUser);

      res.json({ message: 'Success', user: populatedUser });
  } catch (error) {
      console.error('Error registering user:', error);

      console.error('Request Body:', req.body);
      console.error('Request Files:', req.files);

      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/update/:id', async (req, res) => {
  const { title, description, audio, video, image } = req.body;
  const id = req.params.id;

  UserModal.findByIdAndUpdate(id, { title, description, audio, video, image })
    .then(() => res.send("updated successfully"))
    .catch(err => res.status(500).json({ error: err }));
});

app.delete('/delete/:id/:mediaType', async (req, res) => {
  const id = req.params.id;
  const mediaType = req.params.mediaType;

  try {
    const updateData = {};
    switch (mediaType) {
      case 'image':
        updateData.image = null;
        break;
      case 'video':
        updateData.video = null;
        break;
      case 'audio':
        updateData.audio = null;
        break;
      default:
    }

    await UserModal.findByIdAndUpdate(id, updateData);

    res.send("deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


app.listen(3008, () => {
  console.log("Server is running on port 3008");
});


