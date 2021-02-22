const axios = require('axios')

const getBalance = async (user) => {
  const btc = await axios.get(`https://api.f2pool.com/bitcoin/${user}`).then(res => res.data.balance)
  const convert = await axios.get('https://blockchain.info/ticker').then(res => res.data)
  const rub = convert.RUB.last
  const usd = convert.USD.last
  return `${btc.toFixed(7)} BTC, ${(btc * rub).toFixed(2)} р., ${(btc * usd).toFixed(2)}$`
}

module.exports = getBalance
