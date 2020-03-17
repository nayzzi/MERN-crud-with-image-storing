const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ApplicationRoutes = require('./routes');

const app = express();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',ApplicationRoutes);
app.use('/uploads', express.static('Product/uploads'));

app.listen(PORT,(err)=>{
   if(err){
       console.error(err);
   } else
       console.log('Server is up and running in Port: '+PORT);
});
