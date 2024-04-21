const z = require('zod');
const userSigninSchema = z.object({
    username:z.string().email(),
    password:z.string().min(2),
    fname:z.string(),
    lname:z.string()
})

const userSignupSchema = z.object({
    username:z.string().email(),
    password:z.string().min(2),
})

module.exports = {userSigninSchema,userSignupSchema};