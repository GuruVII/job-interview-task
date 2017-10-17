module.exports = function GetDateFromTimestamp (stamp) {
    let fullDate = new Date(parseInt(stamp))
    return `${fullDate.getFullYear()}-${fullDate.getMonth()+1}-${fullDate.getDate()} GMT`
  }