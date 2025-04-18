import fs from 'fs';
import path from 'path';

export function initializeFileSystem() {
    const baseFolderPath = path.join(__dirname, "../../folders");

    if (!fs.existsSync(baseFolderPath)) {
        fs.mkdirSync(baseFolderPath, { recursive: true });
        console.log(`Initialized storage folder at: ${baseFolderPath}`);
    }
}

export function sanitizeFolderName(name: string): string {
    return name.replace(/[^a-zA-Z0-9 _-]/g, '');
}