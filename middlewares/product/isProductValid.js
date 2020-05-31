module.exports = async (req, res, next) => {
    try {
        const {title, price, description} = req.body;

        if (!isNaN(title)) throw  new Error('Title of product only text, not a numbers');

        if (!title || !price || !description) throw new Error('Product is not valid');

        if (!(price > 0 && price < 1000)) throw new Error('Price of product is not valid');

        if (!(title.length > 4 && title.length < 20)) throw new Error('Title of product is not valid');

        next();
    } catch (e) {
        res.json({error: e.message})
    }
};
