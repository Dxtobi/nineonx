const express = require('express');
const { mongoURL, PORT } = require('./config.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const football_router = require('./routes/news/sport/football/football.route.js');
const series_router = require('./routes/movies/series/series.route.js');
const swagger_ui = require('swagger-ui-express')
const swagger_js_doc =require('swagger-jsdoc');
const rate_limit = require('express-rate-limit')
const app = express();

const options ={
  definition:{
    openapi:"3.0.0",
    info:{
      title:'Itenx Movie API',
      version:'0.0.1',
      description:'Create movie apps with this API'
    },
    servers:[
      {
        url:"http://localhost:5000"
      }
    ]
  },
  apis:["./routes/**/*route.js"]
}
const limiter = rate_limit({
  windowMS:5*60*1000,
  max:100
})
const space = swagger_js_doc(options)
// Security measures and other middleware
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(limiter)
// app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/api/v1/docs", swagger_ui.serve, swagger_ui.setup(space))
//app.use('/api/v1/news/football/', football_router);
app.use('/api/v1/movies', series_router);

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'request received' });
});

mongoose.connect(mongoURL).then(() => {
  app.listen(PORT, () => {
    console.log(`App running on Port: http://localhost:${PORT}`);
  });  
  console.log('DB connected.....');
}).catch((err) => {
  console.log('could not connect to database server will not started', err.message);
});

