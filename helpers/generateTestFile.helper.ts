import * as fs from 'fs'

export function generateTestFile(filePath: string, sizeInBytes: number): void {
    fs.writeFileSync(filePath, Buffer.alloc(sizeInBytes))
}

export function deleteTestFile(filePath: string): void {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}