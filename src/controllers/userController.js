import userService from "../services/userService";

let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing inputs parameter'
        })
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({

        errCode: userData.errCode,
        message: userData.errmessage,
        user: userData.user ? userData.user : { user: 'not found user' }


    })

}

module.exports = {
    handleLogin: handleLogin,
}