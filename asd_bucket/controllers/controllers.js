
const service = require('../services/services');


async function getProducts(req, res) {
    try {
        let products = await service.getAllProducts();
        res.cache(products);
        res.json(products);
    }
    catch (error) {
        console.log(error);
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);
        let data = await service.getProductById(id);

        res.cache(data);
        res.json(data);
    } catch (err) {
        console.log(err)
    }
}

async function createProduct(req, res) {

    try {
        const product = req.body;
        const data = await service.createProduct(product);
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }

}
async function updateProduct(req, res) {

    try {
        const id = Number(req.params.id);
        const data = await service.updateProduct(id, req.body);
        if (data === null) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
}
async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const data = await service.patchProduct(id, req.body);
        if (data === null) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(data);

    }
    catch (error) {

        console.log(error);

    }
}
async function deleteProduct(req, res) {

    try {
        const id = Number(req.params.id);
        const data = await service.deleteProduct(id);
        if (data === null) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json({
            message: "Product deleted successfully",
            product: data
        });

    }
    catch (error) {
        console.log(error);

    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};