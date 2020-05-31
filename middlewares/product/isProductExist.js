module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (isNaN(id) || +id < 0) throw new Error('Product is not valide');

        next();
    } catch (e) {
        res.json({error: e.message})
    }
};
