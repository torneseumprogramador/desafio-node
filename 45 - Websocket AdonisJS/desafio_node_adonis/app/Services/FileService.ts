import fs from 'fs'
import path from 'path'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

class FileService {
  public directoryPath: string

  constructor() {
    this.directoryPath = path.join(__dirname, '../../public/uploads')
  }

  public listFiles(search: string = '', page: number = 1, limit: number = 10) {
    const allFiles = fs.readdirSync(this.directoryPath).filter(file => !file.startsWith('.'))
    const filteredFiles = search ? allFiles.filter(file => file.includes(search)) : allFiles

    const totalFiles = filteredFiles.length
    const totalPages = Math.ceil(totalFiles / limit)
    const paginatedFiles = filteredFiles.slice((page - 1) * limit, page * limit)

    return {
      files: paginatedFiles,
      pagination: {
        totalFiles,
        totalPages,
        currentPage: page
      }
    }
  }

  public async saveFile(file: MultipartFileContract) {
    const fileName = `${new Date().getTime()}-${file.clientName}`
    await file.move(this.directoryPath, {
      name: fileName,
      overwrite: true
    })
  }

  public deleteFile(fileName: string) {
    const filePath = path.join(this.directoryPath, decodeURIComponent(fileName))
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    } else {
      throw new Error(`Arquivo ${fileName} não encontrado`)
    }
  }

  public deleteFiles(fileNames: string[]) {
    const errors: string[] = []
    fileNames.forEach(fileName => {
      try {
        this.deleteFile(fileName)
      } catch (error) {
        if (error instanceof Error) {
          errors.push(error.message)
        }
      }
    })
    if (errors.length > 0) {
      throw new Error(`Erros ao deletar arquivos: ${errors.join(', ')}`)
    }
  }
}

export default new FileService() 