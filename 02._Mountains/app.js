const express = require("express")
const app = express()
app.use(express.json())

let mountains = [
    {
        id: 1,
        name: "Mount Everest",
        location: "Himalayas, Nepal/China",
        height: 8848
    },
    {
        id: 2,
        name: "K2",
        location: "Karakoram, Pakistan/China",
        height: 8611
    },
    {
        id: 3,
        name: "Kangchenjunga",
        location: "Himalayas, Nepal/India",
        height: 8586
    },
    {
        id: 4,
        name: "Lhotse",
        location: "Himalayas, Nepal",
        height: 8516
    },
    {
        id: 5,
        name: "Makalu",
        location: "Himalayas, Nepal",
        height: 8462
    },
    {
        id: 6,
        name: "Cerro Bonete",
        location: "Andes, Argentina",
        height: 6759
    },
    {
        id: 7,
        name: "Huayna Potosi",
        location: "Andes, Bolivia",
        height: 6088
    }
]

app.get("/mountains", (req, res) => {
    const filters = req.query

    // no filters were entered
    if (Object.keys(filters).length === 0) {
        return res.send(mountains)
    }

    const allowedFilters = ["minHeight", "maxHeight", "location"]
    if (!Object.keys(filters).every(filter => allowedFilters.includes(filter))) {
        return res.send({
            message: "Only 'minHeight', 'maxHeight' and 'location' are valid filters.",
            data: mountains
        })
    }
    const { minHeight, maxHeight, location } = filters

    const filterableMountains = location ? mountains.filter((m) =>
        m.location.includes(location)) : mountains

    // no reason to perform another filter,
    // if neither of minHeight and maxHeight were specified
    if (!minHeight && !maxHeight) return res.send(filterableMountains)

    const filteredMountains = filterableMountains.filter((mountain) => {
        // defining default values for the case where
        // either of minHeight or maxHeight are not present
        const minHeightFilter = minHeight ?? Number.MIN_SAFE_INTEGER
        const maxHeightFilter = maxHeight ?? Number.MAX_SAFE_INTEGER
        if (mountain.height >= minHeightFilter && mountain.height <= maxHeightFilter) {
            return mountain
        }
    })

    res.send(filteredMountains)
})

app.get("/mountains/:id", (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.send({ error: "Please specify a mountain id" })
    }

    const mountain = mountains.find((m) => m.id === parseInt(id))
    if (!mountain) {
        return res.send({ data: "No mountain with the given id" })
    }

    res.send(mountain)
})

app.post("/mountains", (req, res) => {
    const { name, location, height } = req.body
    if (!name || !location || !height) {
        return res.send({
            message: "You must provide 'name', 'location' and 'height' for the mountain",
        })
    }

    const mountainExists = mountains.find(mountain => mountain.name.toLowerCase() === name.toLowerCase())
    if (mountainExists) {
        return res.send({ message: "This mountain already exists in the resource collection" })
    }

    const id = mountains[mountains.length - 1].id + 1
    const newMountain = {
        id: id,
        name: name,
        location: location,
        height: height
    }
    mountains.push(newMountain)

    res.send({ message: "The mountain was added to the resource collection", data: newMountain })
})

app.patch("/mountains/:id", (req, res) => {
    if (Object.keys(req.body).length > 1) {
        return res.send({message: "PATCH should only be used to update one field. Use PUT instead."})
    }

    const { id } = req.params
    if (!id) {
        return res.send({ error: "Please specify a mountain id" })
    }

    const mountain = mountains.find(m => m.id === parseInt(id))
    if (!mountain) {
        return res.send({ data: "No mountain with the given id" })
    }

    Object.assign(mountain, req.body)
    res.send({ message: "The mountain has been updated", data: mountain })
})

app.put("/mountains/:id", (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.send({ error: "Please specify a mountain id" })
    }

    const mountain = mountains.find(m => m.id === parseInt(id))
    if (!mountain) {
        return res.send({ data: "No mountain with the given id" })
    }

    Object.assign(mountain, req.body)
    res.send({ message: "The mountain has been updated", data: mountain })
})

app.delete("/mountains/:id", (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.send({ error: "Please specify a mountain id" })
    }

    const mountain = mountains.find((m) => m.id === parseInt(id))
    if (!mountain) {
        return res.send({ data: "No mountain with the given id" })
    }

    mountains = mountains.filter(currMountain => currMountain.id !== mountain.id)
    res.send({ message: "The mountain has been deleted", data: mountain })
})


const port = 8080
app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
