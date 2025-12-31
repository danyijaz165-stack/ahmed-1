# .env.local File Setup Guide

## 📍 File Location

`.env.local` file **project ke root directory** mein bannani hai.

**Exact location:**
```
C:\Users\KhurshidComputers\OneDrive\Desktop\ahmed\.env.local
```

Yani jahan ye files hain:
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `app/` folder
- ✅ `components/` folder

## 📝 File Content

`.env.local` file mein ye content hona chahiye:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecolight?retryWrites=true&w=majority
```

## 🔧 How to Create

### Option 1: VS Code / Cursor
1. Root directory mein right click karo
2. "New File" select karo
3. File name: `.env.local` (dot se start)
4. Content paste karo

### Option 2: Notepad
1. Notepad open karo
2. Content type karo
3. "Save As" karo
4. File name: `.env.local` (quotes mein)
5. Location: Project root directory
6. Save type: "All Files"

### Option 3: Terminal (PowerShell)
```powershell
cd C:\Users\KhurshidComputers\OneDrive\Desktop\ahmed
New-Item -Path .env.local -ItemType File
notepad .env.local
```

## ✅ Verification

File create hone ke baad:
1. Root directory mein `.env.local` file dikhni chahiye
2. File mein `MONGODB_URI` hona chahiye
3. Server restart karo: `npm run dev`

## ⚠️ Important Notes

- File name exactly `.env.local` honi chahiye (dot se start)
- File root directory mein honi chahiye (package.json ke saath)
- MongoDB connection string sahi hona chahiye
- Server restart karna zaroori hai after creating file

## 🧪 Test Connection

Browser mein jao:
```
http://localhost:3000/api/test
```

Agar "success: true" dikhe to sab sahi hai!











