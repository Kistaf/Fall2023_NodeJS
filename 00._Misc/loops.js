// loop methods: They are all methods that help loop over a list
// forEach, map, filter, find, sort, reduce

const someData = [
    { name: "Some name", level: 1 },
    { name: "Some other name", level: 2 },
    { name: "Yet another name", level: 3 },
]
console.log(someData)

const changedLevels = someData.map((data) => data.level += 5)
console.log(changedLevels)

const oddNumberedData = someData.filter(data => data.level % 2 === 1)
console.log(oddNumberedData)
