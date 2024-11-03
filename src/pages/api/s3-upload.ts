import { APIRoute, sanitizeKey } from 'next-s3-upload'

export default APIRoute.configure({
    key(req, filename) {
        const documentName = req.body.documentName
        const userId = req.body.userId
        const tmpExt = filename.split('.')
        const ext = tmpExt[tmpExt.length - 1]
        const finalName = `${userId}_${documentName}_${Date.now()}.${ext}`
        return `${userId}/docs/${sanitizeKey(finalName)}`
    }
})
