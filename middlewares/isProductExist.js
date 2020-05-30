const Product = require('../models/Product');
module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id);

        if (!product) throw new Error('Product is not found');

        next();
    } catch (e) {
        res.json({error: e})
    }
};
