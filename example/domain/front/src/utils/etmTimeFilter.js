import moment from 'moment'

function getEpochTime (time) {
  if (time === undefined) {
    time = (new Date()).getTime()
  }
  var d = beginEpochTime()
  var t = d.getTime()
  return Math.floor((time - t) / 1000)
}

function beginEpochTime () {
  var d = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0))
  return d
}

function getTime (time) {
  return getEpochTime(time)
}

function getRealTime (epochTime) {
  if (epochTime === undefined) {
    epochTime = getTime()
  }
  var d = beginEpochTime()
  var t = Math.floor(d.getTime() / 1000) * 1000
  return t + epochTime * 1000
}

let etmTimeFilter = function (time) {
  let unixTimestamp = getRealTime(time)
  let stringDate = new Date(unixTimestamp)
  let formattedDate = moment(stringDate).format('MM/DD/YYYY hh:mm')
  return formattedDate
}

export default etmTimeFilter
