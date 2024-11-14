const express = require('express');

const UserController = require('../../controllers/user-controller');

const { AuthRequestValidatorMiddleware, AuthRequestValidator } = require('../../middlewares/index');

const router = express.Router();

router.post(
    '/signup',
    UserController.create
);
router.post(
    '/signin',
    UserController.signIn
);


router.get(
    '/isAuthenticated',
    UserController.isAuthenticated

);

router.get(
    '/isAdmin',
    AuthRequestValidator.validateIsAdminRequest,
    UserController.isAdmin

);



module.exports = router;