import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = formidable({ multiples: false, maxFileSize: 5 * 1024 * 1024 }); // 5MB
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ error: 'File too large or invalid.' }, { status: 400 })
        );
      }
      const file = files.file;
      if (!file) {
        return resolve(
          NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        );
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.mimetype)) {
        return resolve(
          NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed.' }, { status: 400 })
        );
      }
      const ext = path.extname(file.originalFilename);
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      const targetPath = path.join(uploadDir, uniqueName);
      fs.rename(file.filepath, targetPath, (err) => {
        if (err) {
          return resolve(
            NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
          );
        }
        const url = `/uploads/${uniqueName}`;
        return resolve(
          NextResponse.json({ url }, { status: 200 })
        );
      });
    });
  });
} 