var express = require('express')
    bodyParser = require('body-parser')
    app = express()
    mongo = require('mongodb')
    MongoClient = mongo.MongoClient
    ObjectId = require('mongodb').ObjectID
    dbUrl = 'mongodb://mo1030_appTravel:Lemon2@mongo26.mydevil.net:27017/mo1030_appTravel'
    urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.use(express.static(__dirname + '/public')) 
    app.use(bodyParser.json())

app.listen('8000', function() {
    console.log('serwerOK')
});

app.get('/', function(req, res){
    res.sendfile('index.html')
});

app.all('*', function(reg, res, next){

    res.format({
        json: function() {
            next()
        },
        html: function() {
            res.redirect('/')
        }
    })
});

// for places 

app.get('/places', function(req, res){

    const limit = parseInt(req.query.limit)
    const name = req.query.name
    const regex = new RegExp(name, 'ig') // for search 
    
    MongoClient.connect(dbUrl, function(err, db) { 

        if(err) {
            res.status(500);
            res.send({error: true});

            return;
        }
    
        db.collection("places").find({localization: regex}).toArray(function(err, docs) {
              
            if(err) {     
                res.status(500);
                res.json({error: true});

                return;
            }
            docs.forEach(function(doc){
                doc.logo = doc.pictures[0]
                doc.name = doc.localization
            })
            res.json(docs)
            db.close()
        })
    })
})

app.get('/place/:id', function(req, res){ 
    
    const id = req.params.id
    const isValid = ObjectId.isValid(id)

    if(! isValid ) {
        res.status(500);
        res.json({error: true});

        return;
    }

    MongoClient.connect(dbUrl, function(err, db){

        if(err){
            res.status(500);
            res.json({error: true});

            return;
        }
        
        db.collection("places").find({_id: new mongo.ObjectID(id)}).toArray(function(err, doc){

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }

            res.json(doc[0])
            db.close()
        })
    })
})

// for users

app.get('/users', function(req, res) {

    const name = req.query.name
    const regex = new RegExp(name, 'ig') // for search 

    MongoClient.connect(dbUrl, function(err, db){

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }
        db.collection('users').find({$or: [{first_name: regex}, {last_name: regex}]}).toArray(function(err, docs){

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }

            docs.forEach(function(doc){
                doc.name = doc.first_name + ' ' + doc.last_name
            })

            res.json(docs)
            db.close()
        })
    })
});
app.get('/user/:id', function(req, res){

    const id = req.params.id
    const isValid = ObjectId.isValid(id)

    if(! isValid){
        res.status(500);
        res.json({error: true});

        return;
    }
    MongoClient.connect(dbUrl, function(err, db){

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection('users').find({_id: new mongo.ObjectID(id)}).toArray(function(err, doc){

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])
            db.close()
        })
    })
})
app.post("/users", function(req, res) {

    MongoClient.connect(dbUrl, function(err, db) {

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection("users").insert(req.body, function(err, doc) {

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])

            db.close();
        });
    });
});

// for reservations

app.get('/reservations', function(req, res) {

    const name = req.query.name
    const regex = new RegExp(name, 'ig') // for search 

    MongoClient.connect(dbUrl, function(err, db){

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }
        db.collection('reservations').find({user: regex}).toArray(function(err, docs){

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }

            res.json(docs)
            db.close()
        })
    })
});
app.get('/reservation/:id', function(req, res){

    const id = req.params.id
    const isValid = ObjectId.isValid(id)

    if(! isValid){
        res.status(500);
        res.json({error: true});

        return;
    }
    MongoClient.connect(dbUrl, function(err, db){

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection('reservations').find({_id: new mongo.ObjectID(id)}).toArray(function(err, doc){

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])
            db.close()
        })
    })
})
app.post("/reservations", function(req, res) {

    MongoClient.connect(dbUrl, function(err, db) {

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection("reservations").insert(req.body, function(err, doc) {

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])

            db.close();
        });
    });
});

// for opinions

app.get('/opinions', function(req, res) {

    const name = req.query.name
    const regex = new RegExp(name, 'ig') // for search 

    MongoClient.connect(dbUrl, function(err, db) {

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection('opinins').find({aboutDestination: regex}).toArray(function(err, docs){

            if(err) {
                res.status(500);
                res.json({error: true});
    
                return;
            }
            res.json(docs)
            db.close()
        })
    })
})

app.get('/opinion/:id', function(req, res){

    const id = req.params.id
    const isValid = ObjectId.isValid(id)

    if(! isValid){
        res.status(500);
        res.json({error: true});

        return;
    }
    MongoClient.connect(dbUrl, function(err, db){

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection('opinins').find({_id: new mongo.ObjectID(id)}).toArray(function(err, doc){

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])
            db.close()
        })
    })
})

app.post("/opinions", function(req, res) {

    MongoClient.connect(dbUrl, function(err, db) {

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection("opinins").insert(req.body, function(err, doc) {

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])

            db.close();
        });
    });
});


//for blog

app.get('/blog', function(req, res){

    const name = req.query.name
    const regex = new RegExp(name, 'ig') // for search 

    MongoClient.connect(dbUrl, function(err, db){

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }
        db.collection('blog').find({title: regex}).toArray(function(err, docs){

            if(err) {
                res.status(500);
                res.json({error: true});
    
                return;
            }
            res.json(docs)
            db.close()
        })
    })
});
app.get('/article/:id', function(req, res){

    const id = req.params.id
    const isValid = mongo.ObjectID.isValid(id)

    if( !isValid ){
        res.status(500);
        res.json({error: true});

        return;
    }
    MongoClient.connect(dbUrl, function(err, db){

        if(err){
            res.status(500);
            res.json({error: true});
    
            return; 
        }

        db.collection('blog').find({_id: new mongo.ObjectID(id)}).toArray(function(err, doc){

            if(err){
                res.status(500);
                res.json({error: true});

                return;
            }

            res.json(doc[0])
            db.close()
        })
    })
})

app.put('/article/:id', function(req, res){

    const id = req.params.id
    const isValid = mongo.ObjectID.isValid(id)

    if( !isValid ){
        res.status(500);
        res.json({error: true});

        return;
    }
    MongoClient.connect(dbUrl, function(err, db){

        if(err){
            res.status(500);
            res.json({error: true});
    
            return; 
        }
        delete req.body._id

        db.collection('blog').findAndModify({_id: new mongo.ObjectID(id)}, {}, {$push: {

            comments:{
                author:req.body.comments[0].author, 
                text:req.body.comments[0].text,
                data:req.body.comments[0].data
            }
        
        }}, {returnNewDocument: true}, function(err, doc){

            if(err){
                res.status(500);
                res.json({error: true});
        
                return; 
            }
            res.send(doc)
            
            db.close()
        })
    })
})

app.post("/blog", function(req, res) {

    MongoClient.connect(dbUrl, function(err, db) {

        if(err) {
            res.status(500);
            res.json({error: true});

            return;
        }

        db.collection("blog").insert(req.body, function(err, doc) {

            if(err) {
                res.status(500);
                res.json({error: true});

                return;
            }
            res.json(doc[0])

            db.close();
        });
    });
});