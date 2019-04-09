module.exports={
    mainpage:(req, res)=>{

       let selectquery="SELECT * FROM `product` Order By ProductID asc ";
       db.query(selectquery,(err,result)=>{
            if(err)
            return res.status(500).send(err);
            res.render("index.ejs",{
                title:"Welcome to products managements | view products ",
                products :result
            });
       });
    }
};


