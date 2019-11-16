export default {

  convertTimestamp(input) {

    let time = new Date(input * 1000)

    return time//.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  },

  convertTimestampZoneOffset(input) {

    let timeStamp = new Date(input * 1000)
    let dateTime = new Date(timeStamp.valueOf() - (180 * 60000))

    return dateTime
  },

  dateNow() {

    let timeStamp = new Date()
    let dateNow = new Date(timeStamp.valueOf() - (180 * 60000))
    return dateNow.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  },

  dateNowInTimestamp() {

    let timeStamp = new Date()
    let dateNow = new Date(timeStamp.valueOf() - timeStamp.getTimezoneOffset() * 60000)
    
    dateNow = dateNow.getTime().toPrecision(10) / 1000
    
    return dateNow.getTime()
  }
}
