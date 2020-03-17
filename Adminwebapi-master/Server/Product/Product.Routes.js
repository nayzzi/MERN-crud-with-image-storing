var express = require('express');
var router = express.Router();
var ProductController = require('./Product.Controller');
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './Product/uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
        cb(new Error('invalid file format'), false);
        
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.post("/", upload.single('ImgPath'),(req,res)=>{
    ProductController.Insert(req).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});



router.get('/filter/:query',(req,res)=>{
    let query = req.params.query;
    ProductController.retrieve(query).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    ProductController.retrieveByID(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.put('/imgUpdate/:id',upload.single('ImgPath'),(req,res)=>{
    let id = req.params.id;
    ProductController.updatewithImg(id,req).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.put('/:id',upload.single('ImgPath'),(req,res)=>{
    let id = req.params.id;
    ProductController.update(id,req.body).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});

router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    ProductController.delete(id).then((data)=>{
        res.status(data.status).send(data.message);
    }).catch((err)=>{
        res.status(err.status).send(err.message);
    });
});



module.exports = router;