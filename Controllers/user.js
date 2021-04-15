const User = require('../Models/user');

exports.signUpUser = (req, res) => {
    const reqBody = req.body;
    const email = reqBody.email;
    const pwd = reqBody.password;
    const FN = reqBody.firstname;
    const LN = reqBody.lastname;

    const userObj = new User({ email: email, password: pwd, firstname: FN, lastname: LN });
    userObj.save()
        .then(response => {
            res.status(200).json({ message: "User Registered Successfully", user: response })
        })
        .catch(err => { res.status(500).json({ error: err }) })
}

exports.loginUser = (req, res) => {
    const reqBody = req.body;
    const email = reqBody.email;
    const pwd = reqBody.password;

    User.find({ email: email, password: pwd })
        .then(response => {
            if (response.length != 0) {
                res.status(200).json({ message: "User LoggedIn Successfully", user: response, IsLoggedIn: true })
            } else {
                res.status(200).json({ message: "Combination of email and password is wrong", user: response, IsLoggedIn: false })
            }
        })
        .catch(err => { res.status(500).json({ error: err }) })
}