var keystone = require("keystone");
var nunjucks = require('nunjucks');
fs = require('fs');


keystone.get('routes', function (app){

    nunjucks.configure('nunjucks_html', {
            autoescape : true,
            express : app
    });

    app.use(function(req, res, next){

        res.locals.name = 'tsehla';
        res.locals.page_title = 'Zertify'

        next();

    });

    

    app.get('/', function(req, res){
        res.locals.page_name = "Home Page";
        res.render('index.html');
        
    });

    
    app.get('/register', function(req, res){
        
      //  res.render('index.html');
      
      //user model markup for to be produced file
      var data = `var keystone = require('keystone');

      var name = 'Cohort `+req.query.number+`';
      var custom_model = 'cohort`+req.query.number+`';
      custom_model = new keystone.List(name);
      
      
      custom_model.add({
      
           name : {type : String},
           surname : { type : String},
          
      });
      
      
      custom_model.register();
      
      `;
      
    
      //file name of file to be produced
      var list_name = 'cohort_'+req.query.number;
      
      fs.stat('self_made_model_template/'+list_name+'.js', function(error, results){
    
       if(results == undefined){//result is undefined if file not exist
      
          fs.writeFile('self_made_model_template/'+list_name+'.js', data, function (err) {
              if (err){ return console.log(err); }
            model_import ();//import newly created files to keyston
            console.log('file created');
          });
      
       }
      
       else{console.log('file exist')};//self explanatory//
      
      });





    });

});


function model_import (){//keyston folder contents importer

 return keystone.import('self_made_model_template');

};

model_import ();//call on keystone start, if emmitted files already made will not show on admin ui