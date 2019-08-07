'use stric'
const fs = require('fs')
const xlsx = require('async-xlsx')
const parseFile = (format, path) => {
  return new Promise((resolve, reject) => {
    try {
      let datajson = []
      xlsx.parseFileAsync(path, {}, (result) => {
        for (let i = 0; i < result.length; i++) { // recorremos cada hoja del archivo
          let data = result[i].data // datos de la hoja actual
          data.forEach((value, index) => { // recorremos las datos de la hoja actual
            let json = {}
            format.forEach((item, index) => { // construimos el json con el formato necesario
              json[item] = value[index]
            })
            datajson.push(json)
          })
        }
        fs.writeFile('./example.json', JSON.stringify(datajson), 'utf-8', (err) => {
          if (err) return reject(new Error(err))
          resolve('parse file complete :)')
        })
      })
    } catch (e) {
      return reject(new Error(e))
    }
  })
}
module.exports = {
  parseFile
}
