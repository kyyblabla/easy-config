import fs from 'fs'
import config from './config'

let _realPath = (fileName) => {
  return config.aliasFilePath + '/' + fileName
}

export function loadAliasFiles () {
  let files = fs.readdirSync(config.aliasFilePath)
  let fileWithContent = files.filter((f) => {
    return fs.statSync(_realPath(f)).isFile()
  }).map((f) => {
    let text = fs.readFileSync(_realPath(f), 'utf-8')
    return {
      title: f,
      text
    }
  })
  return fileWithContent
}

export function saveAliasFile ({title, newTitle, text}) {
  if (newTitle && newTitle !== title) {
    fs.renameSync(_realPath(title), _realPath(newTitle))
    title = newTitle
  }
  fs.writeFileSync(_realPath(title), text, 'utf-8')
}
