import digest from 'digest-fetch'

export default class newTek {
  constructor( IP ) {
    this.IP = IP
    this.client = new digest('admin', 'admin')
  }
  setDataLink (dataLinkName, text) {
    const url = encodeURI(`http://${this.IP}/v1/datalink?key=${dataLinkName}&value=${text}`)

    this.client.fetch(url)
      .then((response) => {
        return response
      })
      .then((data) => {
        console.log(data)
      })

  }
  triggerMacro (macroName) {
    const url = encodeURI(`http://${this.IP}/v1/trigger?name=${macroName}`)

    this.client.fetch(url)
      .then((response) => {
        return response
      })
      .then((data) => {
        console.log(data)
      })

  }

}
