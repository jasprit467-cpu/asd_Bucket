const express = require("express");
const app = express();

const fs = require("fs/promises");
const path = require("path");

const cache = {};

const filePath = path.join(__dirname, "db.json");


// Read data from db.json
async function readFile() {
    let data = await fs.readFile(filePath, "utf8");

    return JSON.parse(data);
}



app.get("/products", async (req, res) => {
    try {
        let key = req.url;

        let value = cache[key];

        if (value) {
            return res.json(value);
        }

        let products = await readFile();

        cache[key] = products;

        console.log(products);

        res.json(products);

    } catch (error) {
        console.error(error);
    }
});



async function readfilewithdelay() {

    await new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve();
        }, 1500);

    });

    let products = await readFile();

    return products;
}



app.get("/products/:id", async (req, res) => {

    try {

        let products = await readfilewithdelay();

        let product = products.find(
            p => p.id === parseInt(req.params.id)
        );

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        console.log(product);

        res.json(product);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
});


// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});