let fs =require("fs");
module.exports={
    addproductpage:(req, res)=>{
        res.render("add_product.ejs",
        {
            message:"",
            title:"add new product | Products Manegment App"
        });
    },
    addproduct:(req,res)=> {
       if(!req.files)
        return res.status(400).send("No product Image were Uploade");   

        let     message     = '',
                category    =req.body.category,
                title       =req.body.title,
                description =req.body.description,
                quantity     =req.body.quantity,
                price       =req.body.price,
                uploadedfile=req.files.image;

       let  insertquery  ="INSERT INTO `product`( `title`, `quantity`, `price`, `category`, `image`, `description`)"
             +" VALUES ('"+title+"',"+quantity+","+price+",'"+category+"','"+uploadedfile.name+"','"+description+"')"

            db.query(insertquery,(err,result)=>{

        if(err)
            return res.status(500).send(err);
             
        else
            message=" product "+result.insertId+" added successfully";

            //Upload for Product Image
                let     fileExension    =uploadedfile.name.split('.')[1];
                let     image_name      =result.insertId+"."+fileExension;
                if ( uploadedfile.mimetype=='image/png' ||
                    //  uploadedfile.mimetype=='image/jpg' ||
                     uploadedfile.mimetype=='image/jpeg'|| 
                     uploadedfile.mimetype=='image/gif' ){
                         uploadedfile.mv('public/assets/imgs/'+image_name,(err)=>{
                             if (err)
                             return res.status(500).send(err);  
                         });
                         res.redirect("/");

                   }
                else{
                    message = "invalid image format. only 'png' , 'jpeg' ,'jpg',and  'gif'  image formats are allowed ";
                    res.render("add_product.ejs",
                    {
                        message: message,
                        title:"add new product | Products Manegment App"
                    });

                }
               
        });
   
    },
    editproductpage:(req,res)=>{
        let ProductId=req.params.id;
        let selectquery="SELECT * FROM `product` Where productId="+ProductId;
        db.query(selectquery,(err,result)=>{
             if(err)
             return res.status(500).send(err);
        
             res.render("edit_product.ejs",{
                 title: "Welcome to products Management | Edit products",
                 product: result[0] ,
                 message:result[0].title
             });
        });

    },
    editproduct:(req,res)=>{   
        let     message     = '',
                    category    =req.body.category,
                    title       =req.body.title,
                    description =req.body.description,
                    quantity     =req.body.quantity,
                    price       =req.body.price,
                    uploadedfile =req.files.image,
                    productId = req.params.id ;

        let updateQuery       = "  UPDATE `product` SET `"
            +"title`='"+title+"',`quantity`="+quantity+","
            +"`price`="+price+",`category`='"+category+"',"
            +"`image`='"+uploadedfile.name+"',"
            +"`description`='"+description+"' "
            +" WHERE `productID`="+productId ;
        
            db.query(updateQuery,(err,result)=>{

              if(err)
                    return res.status(500).send(err);
                     
                else
                    message=" product "+productId+" updated successfully";
        
                    //Upload for Product Image
                        let     fileExension    =uploadedfile.name.split('.')[1];
                        let     image_name      =+productId+"."+fileExension;
                        if ( uploadedfile.mimetype=='image/png' ||
                            //  uploadedfile.mimetype=='image/jpg' ||
                             uploadedfile.mimetype=='image/jpeg'|| 
                             uploadedfile.mimetype=='image/gif' ){
                                 uploadedfile.mv('public/assets/imgs/'+image_name,(err)=>{
                                     if (err)
                                     return res.status(500).send(err);  
                                 });
                                 res.redirect("/");
                           }
                        else{
                            message = "invalid image format. only 'png' , 'jpeg' ,'jpg',and  'gif'  image formats are allowed ";
                            res.render("add_product.ejs",
                            {
                                message: message,
                                title:"Edit product | Products Manegment App"
                            });
        
                        }
                       
                });

            }, 
            deleteproduct:(req ,res)=>{
                let productId=req.params.id;
                let deletequery="Delete FROM `product` Where productId="+productId;
                db.query(deletequery,(err,result)=>{
                     if(err)
                     return res.status(500).send(err);
                //  fs.unlink("public/assets/imgs/"+productId+".jpg",(err)=>{
                //         return res.status(500).send(err);
                //      }); 
                     });
                 res.redirect("/");
                
            }

        };