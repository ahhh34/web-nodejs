import userService from "../services/userService";
// import CRUDService from "../services/CRUDService";

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

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //all,id
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            errmessage: 'missing required param',
            users: []

        })
    }


    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errmessage: 'ok',
        users

    })


}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message)
    return res.status(200).json(message);

}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)

}

let handleDeleteUser = async (req, res) => {
    // let id = '12';
    let id = req.body.id;
    console.log(id)
    // console.log(id2)
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errmessage: 'missing required parameters'
        })
    }


    let message = await userService.deleteUser(id);
    console.log(message)
    return res.status(200).json(message);
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
}