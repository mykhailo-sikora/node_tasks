const users = [];

module.exports = class Users {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    save() {
        const user = Users.findUser(this.email, this.password);
        if (!user) {
            users.push(this);
            return true;
        } else {
            return false;
        }
    }

    static findUser(email, password) {
        return users.find((user) => user.email === email && user.password === password);
    }

    static fetchALl() {
        return users;
    }
};
