var keystone = require("keystone");


keystone.init({

    'cookie secret' : 'my_not_set_cookie_secret_is_this',
    'auto update' : true,
    'auth' : true,
    'user model' : 'Admins',
    'static' : ['css', 'front_end_scripts'],
    'sass' : 'css',
})
keystone.import('data_model_users');
keystone.import('express_path_routes');


keystone.start();