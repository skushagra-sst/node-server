import Products from "../../src/models/Product";

export const createProducts = async (req, res) => {
    await Products.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        isInStock: req.body.isInStock,
        Category: req.body.Category,
    });
    console.log(product);
    return res.status(201).json({ message: "Product created successfully" });
};

export const getProducts = async (req, res) => {
    const products = await Products.find({});
    return res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Products.findById(req.params.id);
    return res.json(product);
};

export const deleteProduct = async (req, res) => {
    const product = await Products.findByIdAndDelete(req.params.id);
    return;
    res.json(product);
};

export const updateProduct = async (req, res) => {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body);
    return res.json(product);
};
