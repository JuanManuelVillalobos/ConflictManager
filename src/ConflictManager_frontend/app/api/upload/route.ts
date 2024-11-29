import { NextResponse } from 'next/server'
import formidable from 'formidable'
import { HttpAgent, Actor } from '@dfinity/agent'
import { idlFactory } from '@/.dfx/local/canisters/backend/backend.did'
import { Principal } from '@dfinity/principal'

// Configure formidable to handle file uploads
const form = new formidable.IncomingForm()

export async function POST(req: Request) {
  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err)
        return resolve(NextResponse.json({ error: 'File upload failed' }, { status: 500 }))
      }

      // Handle the uploaded file
      const uploadedFile = files.file && Array.isArray(files.file) ? files.file[0] : files.file

      if (uploadedFile) {
        // Read the uploaded file as a binary buffer
        const fileBuffer = await fs.promises.readFile(uploadedFile.filepath)

        // Send the file to the Motoko canister
        try {
          const agent = new HttpAgent({ host: 'https://ic0.app' }) // Adjust with your IC endpoint
          agent.fetchRootKey()

          const fileStoreCanister = Actor.createActor(idlFactory, {
            agent,
            canisterId: Principal.fromText('your-canister-id-here'), // Replace with your canister ID
          })

          // Call the Motoko canister to store the file
          const result = await fileStoreCanister.uploadFile('file-id', fileBuffer)

          console.log('File uploaded to Motoko canister:', result)

          return resolve(NextResponse.json({ message: 'File uploaded successfully!' }))
        } catch (uploadErr) {
          console.error(uploadErr)
          return resolve(NextResponse.json({ error: 'Failed to upload to Motoko canister' }, { status: 500 }))
        }
      } else {
        return resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }))
      }
    })
  })
}
