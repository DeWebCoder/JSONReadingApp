import express from "express";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const app = express();
const port = 3030;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFilePath = path.join(__dirname, "restaurant.JSON");

let jsonData = {};
let restaurantData;

fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading JSON file:", err);
        return;
    }
    jsonData = JSON.parse(data);
});


app.get("/", (req, res) => {
    res.render("index.ejs", { 
        data: jsonData,
        recipe: restaurantData,
        hours: jsonData.restaurant.hours,
        reviews: jsonData.restaurant.reviews
     });
});


app.post("/recipe", (req, res) => {
    switch (req.body.choice) {
        case "appetizers":
            restaurantData = jsonData.restaurant.menu[0];
            break;
        case "mainCourse":
            restaurantData = jsonData.restaurant.menu[1];
            break;
        case "desserts":
            restaurantData = jsonData.restaurant.menu[2];
            break
            default:
            break;
    }
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`App is running on port: ${ port }`);
});