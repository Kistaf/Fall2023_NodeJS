const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
app.use(cookieParser())
app.use(express.json())

let alarms = []

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/alarms", (req, res) => {
    const creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        return res.send({ message: "No alarms found", data: [] })
    }
    const createdAlarms = alarms.filter((alarm) => alarm.creatorId === creatorId)
    res.send({ message: "Successfully fetched your alarms", data: createdAlarms })
})

app.post("/alarms", (req, res) => {
    const { alarm } = req.body
    if (!alarm) {
        return res.send({ message: "Please provide 'alarm'" })
    }

    let creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        creatorId = uniqueId()
        res.cookie("creatorId", creatorId, {
            expires: new Date(Date.now() + 90000000),
            httpOnly: true
        })
    }

    const alarmId = uniqueId()
    const newAlarm = {
        creatorId: creatorId,
        alarm: alarm,
        creationTime: new Date(),
        alarmId: alarmId,
        enabled: false
    }
    alarms.push(newAlarm)
    res.send({ message: "Alarm created", data: newAlarm })
})

app.put("/alarms/:alarmId", (req, res) => {
    const creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        return res.status(400).send({ message: "You have not created any alarms yet" })
    }
    const { alarmId } = req.params
    if (!alarmId) {
        return res.status(400).send({ message: "Please provide an 'alarmId'" })
    }

    const index = alarms.findIndex((a) => a.alarmId === alarmId && a.creatorId === creatorId)
    alarms[index].enabled = !alarms[index].enabled
    res.send({ message: "Alarm updated" })
})

app.delete("/alarms/:alarmId", (req, res) => {
    const creatorId = req.cookies["creatorId"]
    if (!creatorId) {
        return res.status(400).send({ message: "You have not created any alarms yet" })
    }
    const { alarmId } = req.params
    if (!alarmId) {
        return res.status(400).send({ message: "Please provide an 'alarmId'" })
    }

    const alarm = alarms.find((a) => a.alarmId === alarmId && a.creatorId === creatorId)
    if (!alarm) {
        return res.status(400).send({ message: "No alarm with the given id" })
    }
    alarms = alarms.filter((a) => a.alarmId !== alarmId)
    res.send({ message: "Alarm deleted" })
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
