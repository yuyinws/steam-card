import axios from "axios";

const summary = async () => {
  const response = await axios({
    method: 'get',
    url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
    params: {
      key: '5B23D7ECE73049D23EEB3B58C57BC242',
      steamids: '76561198393168645'
    }
  })
  console.log('response')
}

export {
  summary
}