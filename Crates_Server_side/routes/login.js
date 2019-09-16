
exports.loadHomePage = (req, res) => {
    if (req.user) {
        res.render('index', { user: req.user });
    }
    else {
        res.render('login');
    }
};

exports.redirectToHomePage = (req, res) => {
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.login = (req, res) => {
    if (req.user) {
        res.redirect('/');
    }
    else {
        res.render('login');
    }
}