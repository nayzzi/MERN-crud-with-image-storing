const mongoose = require('../DBSchema/SchemaMapper');
const Products = mongoose.model('products');

var ProductController = function(){

    this.Insert = (data1)=>{
        var data=data1.body;
        if(typeof data1.file  !== 'undefined' && data.Price !=='' && data.Title !=='' && data.Description !==''){
            var newImgPath=data1.file.path.replace("Product/","");
            if(!isNaN(data.Price)){
                return new Promise((resolve,reject)=>{
                    let products = new Products({

                        ImgPath:newImgPath,
                        Title:data.Title,
                        Description:data.Description,
                        Price:data.Price

                    });
                    products.save().then(()=>{
                        resolve({status:200,message:'success'});
                    }).catch((err)=>{
                        reject({status:500,message:'product creation failed due to Error: '+err});
                    });
                })
            }
            else{
                return new Promise((resolve,reject)=>{
                    resolve({status:200,message:'Price Should be a number'});
                })
            }
        }
        else{
            return new Promise((resolve,reject)=>{
                resolve({status:200,message:'Fill all the fields'});
            })
        }
    };

    this.retrieve = (query)=>{
        if(query==="all"){
            return new Promise((resolve,reject)=>{
                Products.find().then((data)=>{
                    resolve({status:200,message:data});
                }).catch((err)=>{
                    reject({status:500,message:'No data to be found. Error: '+err});
                })
            })
        }
        else {
        return new Promise((resolve,reject)=>{
        Products.find({"Title":/query/}).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        })}
           };

    
    this.retrieveByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Products.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    };

    this.update = (id,data)=>{
        if(data.Price !=='' && data.Title !=='' && data.Description !==''){
            if(!isNaN(data.Price)){
                return new Promise((resolve,reject)=>{

                    let products = {
                        Title:data.Title,
                        Description:data.Description,
                        Price:data.Price
                    };
                    Products.findByIdAndUpdate({_id: id},products).then(()=>{
                        resolve({status:200,message:'success'});
                    }).catch((err)=>{
                        console.log(err)
                        reject({status:500,message:'Products updating failed due to Error: '+err});
                    });
                })
            }
            else{
                return new Promise((resolve,reject)=>{
                    resolve({status:200,message:'Price Should be a number'});
                })
            }
        }
        else{
            return new Promise((resolve,reject)=>{
                resolve({status:200,message:'Fill all the fields'});
            })
        }
    };


    this.updatewithImg = (id,data1)=>{
        var data=data1.body;
        if(data.Price !=='' && data.Title !=='' && data.Description !==''){
            if(!isNaN(data.Price)){
                return new Promise((resolve,reject)=>{

                    let products = {
                        ImgPath:data1.file.path,
                        Title:data.Title,
                        Description:data.Description,
                        Price:data.Price
                    };
                    Products.findByIdAndUpdate({_id: id},products).then(()=>{
                        resolve({status:200,message:'success'});
                    }).catch((err)=>{
                        console.log(err)
                        reject({status:500,message:'Products updating failed due to Error: '+err});
                    });
                })
            }
            else{
                return new Promise((resolve,reject)=>{
                    resolve({status:200,message:'Price Should be a number'});
                })
            }
        }
        else{
            return new Promise((resolve,reject)=>{
                resolve({status:200,message:'Fill all the fields'});
            })
        }
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Products.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:{success:true}});
            }).catch((err)=>{
                reject({status:500,message:'No data to be found. Error: '+err});
            })
        });
    }

};

module.exports = new ProductController();