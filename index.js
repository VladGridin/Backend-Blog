import expres from "express";
import multer from 'multer';
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import {UserController, PostController} from './controlers/index.js';
import {handlerValidationError, checkAuth} from "./utils/index.js";

// Подключаемся к бд
mongoose.set('strictQuery', false);
mongoose
    .connect('mongodb+srv://admin:qwertyt0p@cluster0.ps63dun.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DATABASE WORK'))
    .catch( (err) => console.log('ERROR IN DATABASE', err));

// Экспрес хрень которая реагирует на ссылку и создает сервер мы ему объяснили что будем юзать джисон
const app = expres();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

app.use(expres.json());
app.use(cors());
app.use('/uploads', expres.static('uploads'));
app.post('/auth/login', loginValidation, handlerValidationError, UserController.login);
app.post('/auth/register', registerValidation, handlerValidationError, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, handlerValidationError, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, handlerValidationError, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('SERVER STARTED IN PORT 4444');
});