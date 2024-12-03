// components/file-upload.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { pinFileToIPFS } from '../lib/pinata'

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const result = await pinFileToIPFS(file)
      const ipfsHash = result.IpfsHash
      const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`
      setSuccessMessage(`File uploaded successfully! IPFS URL: ${ipfsUrl}`)
      setFile(null) // Reset the file after successful upload
    } catch (err) {
      setError('Error uploading file to IPFS. Please try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file-upload">Upload PDF</Label>
        <Input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      {file && <div><p>Selected File: {file.name}</p></div>}
      {uploading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <Button type="submit" disabled={!file || uploading}>
        Upload PDF
      </Button>
    </form>
  )
}
