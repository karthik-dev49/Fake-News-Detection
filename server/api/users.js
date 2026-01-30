const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const user = require("../models/users");


//Signup
router.post('/signup', (req,res)=>{
    let {userName,email,password} = req.body;
    userName = userName.trim();
    email = email.trim();
    password = password.trim();

    if(userName==="" || email==="" || password===""){
        res.json({status:"error",message:"Empty input fields"});
    }else if(!/^[a-zA-Z0-9]+$/.test(userName)){
        res.json({status:"error",message:"Invalid username"});
    }
    else if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)){
        res.json({status:"error",message:"Invalid email"});
    }
    else if(password.length<2){
        res.json({status:"error",message:"Password too short"});
    }
    else{
        //check if email already exists
        user.find({email}).then(result=>{
            if(result.length){
                res.json({status:"error",message:"Email already exists"});
            }else{
                //save the user
                //password hashing
                const saltRounds = 10;
                bcrypt.hash(password,saltRounds).then(hashedPassword=>{
                    const newUser = new user({userName,email,password:hashedPassword});
                    newUser.save().then(result=>{
                        res.json({status:"ok",message:"Signup Success"});
                    }).catch(err=>{
                        res.json({status:"error",message:"An error occured while saving user data"});
                    });
                }).catch(err=>{
                    res.json({status:"error",message:"An error occured while hashing password"});
                });
            }
        }).catch(err=>{
            console.log(err);
            res.json({status:"error",message:"An error occured while checking for existing user"});
        });

    }

});


//login
router.post('/login', (req,res)=>{
    let {email,password} = req.body;
    if (!email || !password) {
        return res.json({ status: "error", message: "Empty input fieldshgf" });
    }
    email = email.trim();
    password = password.trim();

    if(email==="" || password===""){
        res.json({status:"error",message:"Empty input fields"});
    }
    else{
        // check if user exits
        user.find({email}).then(data=>{
            if(data.length){
                // user found
                const hashedPassword = data[0].password;
                
                bcrypt.compare(password,hashedPassword).then(result=>{
                    if(result){
                        //password match
                        const userName = data[0].userName;
                        res.json({status:"ok",message:"Login Success",userName:userName});
                    }else{
                        //password did not match
                        res.json({status:"error",message:"Invalid password"});
                    }
                }).catch(err=>{
                    res.json({status:"error",message:"An error occured while comparing passwords"});
                });
            }
            else{
                //user not found
                res.json({status:"error",message:"Invalid email"});
            }
        }).catch(err=>{
            res.json({status:"error",message:"An error occured while checking for existing user"});
        });
    }

});


// router.post('/retrive', (req,res)=>{
//     let {userEmail} = req.body;
//     if (!userEmail) {
//         return res.json({ status: "error", message: "Empty input field" });
//     }
//     userEmail = userEmail.trim();

//     if(userEmail===""){
//         res.json({status:"error",message:"Empty input fields"});
//     }
//     else{
//         // check if user exits
//         user.find({email:userEmail}).then(data=>{
//             if(data.length){
//                 // user found
//                 const email = data[0].email;
//                 const password = data[0].password;
//                 // decrypt the password
                  

//                 res.json({status:"ok",message:"User Found",email:email,password:password});
//             }
//             else{
//                 //user not found
//                 res.json({status:"error",message:"Invalid Email"});
//             }
//         }).catch(err=>{
//             res.json({status:"error",message:"An error occured while checking for existing user"});
//         });
//     }

// });
module.exports = router;