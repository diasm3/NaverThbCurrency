const express = require("express")
const cheerio = require("cheerio")
const axios = require("axios")
const fetch2 = require("node-fetch")
const bodyParser = require("body-parser")
const app = express()

const port = 3030

const getCurrency = async () => {
  const searchURL = "https://finance.naver.com/marketindex/exchangeList.nhn"
  const axiosGet = await axios.get(searchURL)
  const response = await fetch2(searchURL)
  const htmlString = await response.text()
  //   console.log(axiosGet);
  //   console.log(await response.text())
  const $ = cheerio.load(htmlString)
  const arr = $(".tbl_exchange tbody tr .sale")
  const result = Object.entries(arr[26].children["0"])
  console.log(Number(result[1][1]))
  data.currency = result[1][1]
}

const data = {
  name: "hello",
  phone: 0104203,
  email: "diasm2@gmail.com",
  currency: getCurrency(),
}
app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*")
  res.send(JSON.stringify(data))
})

const getData = async () => {
  try {
    const dataAddress = await axios("http://localhost:3030")
    console.log("hello", dataAddress.data.currency)
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, () => {
  console.log("conencted")
})

getData()
