console.log("im here listening");

const express = require("express");
const { default: mongoose } = require("mongoose");
//mongodb+srv://mujahidalabdullah052:KvPuuaoWDivrrwrQ@finansversion01.49hk97i.mongodb.net/?retryWrites=true&w=majority

const app = express();

const article = require("./Models/Article");

const db = require("mongoose");
db.connect("mongodb+srv://mujahidalabdullah052:KvPuuaoWDivrrwrQ@finansversion01.49hk97i.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("connect is work")
}).catch((error) => {
    console.log("NOT connect , the error is : ", error);
})
app.use(express.json());

//-------------------------------------
//END POİNT or CONTROLER
app.get("/hello", (req, res) => {
    res.send("hello");
});

app.get("/", (req, res) => {
    res.send("Finans proje");
})
app.get("/numbers", (req, res) => {
    let numbers = "";
    for (let i = 0; i <= 100; i++) {
        numbers += i + "-";
    }
    res.send('the numbers from 1 to 100 : ' + numbers);

})

app.put("/page2", (req, res) => {
    res.send("welcome in page two")
})

app.listen(3000, () => {
    console.log("im here listening");
});

//path parameters
app.get("/FindSum/:num1/:num2", (req, res) => {
    const num1 = req.params.num1;
    const num2 = req.params.num2;


    res.send("num1+ num2 =" + (Number(num1) + Number(num2)));
    res.send(`the numbers are: ${num1}/ ${num2}`);
});

//body paramters(json)
app.get("/carpma", (req, res) => {
    console.log(req.body)
    res.send(`x + y=` + req.body.x * req.body.y);
})

//quary paramters
app.get("/login", (req, res) => {
    let check = false;
    if (check == true) {
        console.log(req.query);

        res.send(`my name is ${req.query.name} , i ${req.query.age} years old , i'm studing ${req.body.job}`);
    } else {
        res.json({
            job: req.body.job,
            name: req.query.name


        })
    }

})
//
app.post("/articles", async (req, res) => {
    const article1 = new article()
    article1.Title = "my secound article"
    article1.body = req.body.artbody;
    article1.numberOfLikes = 124;
    article1.yazar = req.body.name;
    //article1.tarih = "2015-03-25";

    await article1.save();
    //res.send("articles")
    res.json(article1)
})

app.get("/articles", async (req, res) => {
    const allArticles = await article.find();
    res.json(allArticles);

})

app.get("/articles/:art_id", async (req, res) => {
    const id = req.params.art_id;
    const Art = await article.findById(id);
    res.json(Art);

})

app.get("/anasayfa", async (req, res) => {
    const art = await article.find().maxTimeMS(10000).exec();;
    res.render("anasayfa.ejs", {
        Allart: art,
    })
})

app.get("/kayitol", (req, res) => {
    //res.sendFile( html path ) 
    res.render("login.ejs", {
        name: req.body.name + " ahmet",
        age: req.query.age
    })
})