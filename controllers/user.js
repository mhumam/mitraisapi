const User = require('../models').user;

module.exports = {
    list(req, res) {
        return User.findAll()
            .then((User) => res.status(200).send(User))
            .catch((error) => {
                res.status(400).send(error);
            });
    },
    async add(req, res) {
        try {
            let responseCode = 200;
            let responseMessage = null;

            this.userid = null;

            const { mobilephone, email, firstname, lastname, gender, dateofbirth } = req.body;
            if (!mobilephone) {
                responseCode = 400;
                responseMessage = "Mobile phone is Required";
            } else if (!email) {
                responseCode = 400;
                responseMessage = "Email is Required";
            } else if (!firstname) {
                responseCode = 400;
                responseMessage = "First name is Required";
            } else if (!lastname) {
                responseCode = 400;
                responseMessage = "Last name is Required";
            }

            if (responseCode === 200) {
                /* Check email already exist */
                await User.findAll({ where: { email } })
                    .then((user) => {
                        if (user.length > 0) {
                            responseCode = 400;
                            responseMessage = "Email already exists";
                        }
                    })
                    .catch((error) => {
                        responseCode = 400;
                        responseMessage = error;
                    });

                /* Check mobilephone already exist */
                await User.findAll({ where: { mobilephone } })
                    .then((user) => {
                        if (user.length > 0) {
                            responseCode = 400;
                            responseMessage = "Mobile phone already exists";
                        }
                    })
                    .catch((error) => {
                        responseCode = 400;
                        responseMessage = error;
                    });
            }

            if (responseCode === 200) {
                await User
                    .create({
                        mobilephone: mobilephone,
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        gender: gender,
                        dateofbirth: dateofbirth
                    })
                    .then((user) => {
                        responseCode = 200;
                        responseMessage = "You have successfully registered";
                    })
                    .catch((error) => {
                        responseCode = 400;
                        responseMessage = error;
                    });
            }

            /* Response */
            res.status(400).send({
                status: {
                    code: responseCode,
                    message: responseMessage
                }
            });
        } catch (err) {
            res.status(400).send(err)
        }
    },
}