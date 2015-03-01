var currentUser = {
    name: 'Omri Litov',
    unique: 'litov',
    email: 'omrilitov@gmail.com'
};

module.exports = {
    getCurrentUser: function () {
        return currentUser;
    }
};