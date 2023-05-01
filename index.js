const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/User.routes")
const {auth} = require("./middleware/auth.middleware");
const { noteRouter } = require("./routes/Note.routes");
const cors = require("cors")
require("dotenv").config

const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)


//PROTECTED
app.use(auth)
app.use("/notes", noteRouter)

// app.get("/movie",(req,res)=> {
//    res.status(200).send("Movie Data")
// })

// app.get("/series",(req,res)=> {
//     res.status(200).send("Movie Data")
// })


app.listen(process.env.port, async()=> {
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        console.log("Cannot connect to the DB")
    }
    console.log(`Server running at port ${process.env.port}`)
})

module.exports=app