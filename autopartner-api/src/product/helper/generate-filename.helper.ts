export const generateFileName = (fileName: string): string => {
    const ext = fileName.slice(-3)
    const name = fileName
        .trim()
        .replace(/ +/g, '-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
    // .slice(0,-3).replaceAll('.','_').replaceAll(' ','_')
    return `${name + '_' + Date.now()}.${ext}`
}
