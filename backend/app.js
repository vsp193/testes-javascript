import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes';

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
