const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
app.use(cookieParser())
app.use(express.json())

let timers = []

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/timers", (req, res) => {
    const creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        return res.send({ message: "No timers found", data: [] })
    }
    const creatorTimers = timers.filter((timer) => timer.creatorId === creatorId)
    res.send({ message: "Successfully fetched your timers", data: creatorTimers })
})

app.post("/timers", (req, res) => {
    const { timer } = req.body
    if (!timer) {
        return res.send({ message: "Please provide 'timer'" })
    }

    let creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        creatorId = uniqueId()
        res.cookie("creatorId", creatorId, {
            expires: new Date(Date.now() + 90000000),
            httpOnly: true
        })
    }

    const timerId = uniqueId()
    const newTimer = {
        creatorId: creatorId,
        timer: timer,
        creationTime: new Date(),
        timerId: timerId,
        enabled: false
    }
    timers.push(newTimer)
    res.send({ message: "Timer created", data: newTimer })
})

app.put("/timers/:timerId", (req, res) => {
    const creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        return res.status(400).send({ message: "You have not created any timers yet" })
    }
    const { timerId } = req.params
    if (!timerId) {
        return res.status(400).send({ message: "Please provide a 'timerId'" })
    }

    const index = timers.findIndex((t) => t.timerId === timerId && t.creatorId === creatorId)
    timers[index].enabled = !timers[index].enabled
    res.send({ message: "Timer updated" })
})

app.delete("/timers/:timerId", (req, res) => {
    const creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        return res.status(400).send({ message: "You have not created any timers yet" })
    }
    const { timerId } = req.params
    if (!timerId) {
        return res.status(400).send({ message: "Please provide a 'timerId'" })
    }

    const timer = timers.find((t) => t.timerId === timerId && t.creatorId === creatorId)
    if (!timer) {
        return res.status(400).send({ message: "No timer with the given id" })
    }
    timers = timers.filter((t) => t.timerId !== timerId)
    res.send({ message: "Timer deleted" })
})

const uniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}


const port = 8080
app.listen(port, (err) => {
    if (err) {
        console.log("Server failed to start with error:", err)
        return
    }
    console.log(`Server started and running at http://localhost:${port}`)
})
