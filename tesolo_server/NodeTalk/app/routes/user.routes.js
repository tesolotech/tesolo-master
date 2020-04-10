
const checkAuth = require('../middleware/check_auth');

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/api/signup', users.signupUser,checkAuth);

    // Login user
    app.post('/api/login', users.loginUser);
    
    // Delete a user
    app.delete('/api/user/:userId', users.userDelete, checkAuth);
    
    // Get all user
    app.get('/api/users',users.GetAllUser);
    
    // Get Single User by Id
    app.get('/api/user/:userid',users.GetUserById);
    
    // Update Single User by Id
    app.put('/api/user/:userid', users.UpdateUserById, checkAuth);


    
}

