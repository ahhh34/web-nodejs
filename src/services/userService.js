import { hash } from "bcryptjs";
import db from "../models/index";
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);

        } catch (e) {
            reject(e);
        }


    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {

                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errmessage = "ok";

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errmessage = "password not true";

                    }
                } else {
                    userData.errCode = 2;
                    userData.errmessage = 'user not found';
                }

            } else {
                userData.errCode = 1;
                userData.errmessage = 'email dosent exit. try other'

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        }
        catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = 'acd';

            if (userId === 'ALL') {
                users = await db.User.findAll({

                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })



            }

            resolve(users)

        } catch {
            reject(e)

        }


    })

}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            // check email exit
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'your email is already in used, plz try another email',
                })
            }
            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId

            })

            resolve({
                errCode: 0,
                message: 'ok',
            })


        } catch (e) {
            reject(e);
        }
    })

}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: id },
            raw: false

        })
        if (!user) {
            resolve({
                errCode: 2,
                errmessage: 'user dose not exit'
            })
        }
        if (user) {
            await user.destroy();
        }

        resolve({
            errCode: 0,
            errmessage: 'user already delete'
        })


    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'missing require paramester'
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                console.log(user)

                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,


                // })

                resolve({
                    errCode: 0,
                    message: 'update user succeed'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'cant update user succeed,not found'
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,

}