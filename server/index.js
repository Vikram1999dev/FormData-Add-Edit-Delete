const express = require('express');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

// you need to make sure that you're parsing the request body correctly.
const bodyParser = require('body-parser');
// middleware is used to parse URL-encoded data. The extended option allows the use of nested objects in the URL-encoded data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('strictQuery', false);

//setting up api that connect this application to mongodb atlas
mongoose.connect('xxxxxxxx+srv://xxxxxxx:xxxxxxx@cluster0.rjyumeo.mongodb.net', {
  dbName: 'formDatabase',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//will execute once the connection is successful
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Define a schema for storing images
const FormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dob: String,
  data: Buffer,
  contentType: String,
  gender: String,
  qualification: Array,
});

// Create a model for images
const FormData = mongoose.model('Form', FormSchema);

// Set up Multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('image'), async (req, res) => {
  const existingUser = await FormData.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email Already Exist' });
  }
  try {
    // Create a new image document
    const newForm = new FormData({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      data: req.file.buffer,
      contentType: req.file.mimetype,
      gender: req.body.gender,
      qualification: req.body.qualification,
    });

    await newForm.save().then(() => {
      console.log('New Form saved in database');
    });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/grabformdata', async (req, res) => {
  try {
    // Find all data in the database
    const everyFormData = await FormData.find().exec();

    const Formss = everyFormData.map((x) => {
      const data = x.data.toString('base64');
      return {
        ...x.toObject(),
        imageUrl: `data:${x.contentType};base64,${data}`,
      };
    });

    // Send the image data URLs along with
    //all the data
    res.status(200).send(Formss);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.patch('/makechange/:id', async (req, res) => {
  try {
    const updatedItem = await FormData.findByIdAndUpdate(
      req.params.id,

      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      { new: true },
    );
    res.send(updatedItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/itemdelete/:id', async (req, res) => {
  try {
    const deletedItem = await FormData.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).send();
    }
    res.send(deletedItem);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
