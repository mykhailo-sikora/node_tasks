const CronJob = require('cron').CronJob;

const {EmailActionEnum: {USER_FORGOT_UPDATE_PRODUCT}} = require('../constants');
const {emailService, userService, productService} = require('../services');

module.exports = () => {
    const job = new CronJob('0 10 * * *', async () => {
        const products = await productService.findAllByParams({photo: null});

        for (const product of products) {
            const user = await userService.getUserById(product.userId);

            await emailService.sendMail(user.email, USER_FORGOT_UPDATE_PRODUCT, {user, product})
        }
    });
    return job.start();
};

