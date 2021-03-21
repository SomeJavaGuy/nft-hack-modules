var express = require('express')
var router = express.Router()
const axios = require('axios')

const pinataApiKey = process.env.PINATA_API_KEY
const pinataSecretApiKey = process.env.SECRET_API_KEY
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')

router.post('pin', async (req, res, next) => {
  const url = private.env.PINATA_ROUTE

  let res = new FormData()

  res.append('file', fs.createReadStream('../public/images/image1.jpeg'))

  const data = await axios
    .post(url, data, {
      maxContentLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .catch(console.log)
  
  res.send(data.data)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ title: 'Express' })
})

//Generate wallet ETH
router.post('/generate', async function (req, res, next) {
  const data = await axios
    .post(
      'https://api-sandbox.circle.com/v1/wallets/1000080700/addresses',
      {
        idempotencyKey: '2678c583-20d1-405d-b185-047f8d01fe6c',
        currency: 'USD',
        chain: 'ETH',
      },
      {
        headers: { Authorization: 'Bearer ' + process.env.API_KEY },
      }
    )
    .catch(console.log)

  res.send(data.data)

  //0xe0444778759de8c1801ad092fca1504d61fddcca
})

//Check payments status 
router.post('/status', async function (req, res, next) {
  const data = await axios
    .post(
      'https://api-sandbox.circle.com/v1/payments/81855279-b53d-4119-9f1e-5d0af00f0c2',
      {
        headers: { Authorization: 'Bearer ' + process.env.API_KEY },
      }
    )
    .catch(console.log)

  res.send(data.data)
})


router.post('/payment', function (req, res, next) {
  res.send({ title: 'Express' })
})

router.post('/payout', async function (req, res, next) {
  const data = await axios.post(
    'https://api-sandbox.circle.com/v1/payouts',
    {
      idempotencyKey: 'ff9d668a-ccde-48c3-82fd-8deb2a6f7c28',
      destination: { type: 'wire', id: '66686a41-1403-49b5-b124-9652b3210bf2' },
      amount: { currency: 'USD', amount: '1.00' },
      metadata: { beneficiaryEmail: 'john.smith@email.com' },
    },
    {
      headers: { Authorization: 'Bearer ' + process.env.API_KEY },
    }
  )

  res.send(data.data)
})

//Crypto payout
router.post('/cPayout', async function (req, res, next) {
  console.log("LAB")
  const data = await axios.post(
    'https://api-sandbox.circle.com/v1/businessAccount/transfers',
    {
      idempotencyKey: '4ca72ac7-5217-49bb-bbe6-e8dcb4c53c25',
      destination: {
        type: 'verified_blockchain',
        addressId: '0x493A9869E3B5f846f72267ab19B76e9bf99d51b1',
        chain: 'ETH',
      },
      amount: { amount: '0.10', currency: 'USD' },
    },
    {
      headers: { Authorization: 'Bearer ' + process.env.API_KEY },
    }
  ).catch(console.log)


  res.send(console.log(data))
})

module.exports = router

// 1 - Recevoir payement et notifs USDC par carte bancaire
// 2 - Recevoir payement et notifs USDC par wallet ETH
