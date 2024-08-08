const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

// fs.readdir(folder, (err, files) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   files.forEach(file => {
//     console.log(file);
//   });
// });

async function listFiles (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log(pc.red(`No such file or directory: ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let fileStats
    try {
      fileStats = await fs.stat(filePath) // status -information about the file
    } catch (error) {
      console.log(`No such file or directory: ${filePath}`)
      process.exit(1)
    }

    const isDirectory = fileStats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = fileStats.size.toString()
    const fileModified = fileStats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(fileInfo => {
    console.log(fileInfo)
  })
}

listFiles(folder)
