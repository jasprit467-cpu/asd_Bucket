const database = require('../database/database');

async function delayReadData() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    })
    return await database.readData();
}

async function getAllProducts() {
    return await delayReadData();
}

async function getProductById(id) {
    let products = await delayReadData();
    return products.find((item) => item.id === id);
}

async function createProduct(product) {
    let products = await database.readData();
    product.id = products.length + 1;
    products.push(product);
    await database.writeData(products);
    return product;
}

async function updateProduct(id, productData) {
    let products = await database.readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    let updatedProduct = {
        id: id,
        ...productData
    };
    products[index] = updatedProduct;
    await database.writeData(products);
    return updatedProduct;
}
async function patchProduct(id, productData) {
    let products = await database.readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    products[index] = {
        ...products[index],
        ...productData,
        id: id
    };
    await database.writeData(products);
    return products[index];
}
async function deleteProduct(id) {
    let products = await database.readData();
    let index = products.findIndex((item) => item.id === id);
    if (index === -1) {
        return null;
    }
    let deletedProduct = products[index];
    products.splice(index, 1);
    await database.writeData(products);
    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};