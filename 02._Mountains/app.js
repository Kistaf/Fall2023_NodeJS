const express = require("express")
const app = express()
const port = 8080


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

    // deconstructing valid filters
    const { minHeight, maxHeight, location } = filters

    // no valid filters were entered
    if (!minHeight && !maxHeight && !location) {
        return res.send({
            message: "Only 'minHeight', 'maxHeight' and 'location' are valid filters.",
            data: mountains
        })
    }

    const filterableValues = location ? mountains.filter((m) =>
        m.location.includes(location)) : mountains

    // no reason to perform another filter,
    // if neither of minHeight and maxHeight were specified
    if (!minHeight && !maxHeight) return res.send(filterableValues)

    const filteredValues = filterableValues.filter((mountain) => {
        // defining default values for the case where
        // either of minHeight or maxHeight is not present
        const minHeightFilter = minHeight ?? Number.MIN_SAFE_INTEGER
        const maxHeightFilter = maxHeight ?? Number.MAX_SAFE_INTEGER
        if (mountain.height >= minHeightFilter && mountain.height <= maxHeightFilter) {
            return mountain
        }
    })

    res.send(filteredValues)
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


app.listen(port, () => console.log(`Server started and running at http://localhost:${port}`))
