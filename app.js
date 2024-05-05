const express = require("express");
const app = express();
let port = 4567

const {v4: uuidv4 } = require('uuid');
uuidv4();

const path = require("path")
const methodOverride = require("method-override");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

let animals = [
    { id: uuidv4(), petName: "Buddy", animalType: "Dog" },
    { id: uuidv4(), petName: "Whiskers", animalType: "Cat" },
    { id: uuidv4(), petName: "Nemo", animalType: "Fish" },
    { id: uuidv4(), petName: "Max", animalType: "Dog" },
    { id: uuidv4(), petName: "Simba", animalType: "Lion" },
    { id: uuidv4(), petName: "Coco", animalType: "Bird" }
];

app.get("/animals",(req,res)=>{
    res.render("main.ejs", {animals});
})
app.get("/animals/new", (req, res)=>{
    res.render("createForm.ejs")
})
app.get("/animals/edit/:id", (req, res)=>{
    const id = req.params.id;
    const animal = animals.find(a => a.id === id);
    res.render("editForm.ejs", { animal });
})
app.post("/animals", (req,res)=>{
    let {petName, animalType} = req.body;
    let id = uuidv4();
    animals.push({ id, petName, animalType });
    res.redirect("/animals");
})
app.patch("/animals/edit/:id", (req, res) => {
    const id = req.params.id;
    const { petName, animalType } = req.body;
    const animalIndex = animals.findIndex(animal => animal.id === id);
    if (animalIndex === -1) {
        return res.status(404).send("Animal not found");
    }
    animals[animalIndex] = { ...animals[animalIndex], petName, animalType };
    res.redirect("/animals");
});
app.delete("/animals/:id", (req, res) => {
    const id = req.params.id;
    animals = animals.filter(animal => animal.id !== id);
    res.redirect("/animals");
});

app.listen(port, (req, res) =>{
    console.log("server connected")
});

