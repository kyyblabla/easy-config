import fs from 'fs'
import config from './config'

let _realPath = (fileName) => {
  return config.aliasFilePath + '/' + fileName
}

let _writeFile = (pathName, content) => {
  let path = pathName.replace(/\/[^/]*$/, '')
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  fs.writeFileSync(pathName, content, 'utf-8')
}

let _getAlisFileIndex = () => {
  if (!fs.existsSync(config.aliasFileIndexPath)) {
    return []
  }
  let content = fs.readFileSync(config.aliasFileIndexPath)
  return JSON.parse(content)
}

export function loadAliasFiles () {
  return _getAlisFileIndex().map(({path, title, use}) => {
    let text = fs.readFileSync(path, 'utf-8')
    return {
      title,
      text,
      content: text,
      path
    }
  })
}

export function saveAliasFile ({title, newTitle, text}) {
  if (newTitle && newTitle !== title) {
    fs.renameSync(_realPath(title), _realPath(newTitle))
    title = newTitle
  }
  _writeFile(_realPath(title), text)
}

export function saveAliasFileIndex (files) {
  _writeFile(config.aliasFileIndexPath, JSON.stringify(files || []))
}
