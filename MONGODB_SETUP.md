# MongoDB Atlas Cluster Setup Guide (Urdu/Hindi)

## 🚀 MongoDB Atlas Cluster Kaise Banayein

### Step 1: MongoDB Atlas Account Banayein

1. **Website pe jao:**
   - https://www.mongodb.com/cloud/atlas/register
   - Ya https://cloud.mongodb.com/ pe sign up karo

2. **Account create karo:**
   - Email address daalo
   - Password set karo
   - Account verify karo

### Step 2: Free Cluster Create Karein

1. **Login ke baad:**
   - "Build a Database" button pe click karo
   - Ya "Create" button pe click karo

2. **Cluster type select karo:**
   - **M0 FREE** select karo (Free tier)
   - Cloud Provider: AWS (default)
   - Region: ap-south-1 (Mumbai) ya ap-southeast-1 (Singapore) - India ke liye best

3. **Cluster name:**
   - Default name rakh sakte ho ya apna naam daalo
   - Example: `Cluster0`

4. **"Create Cluster" button pe click karo**
   - 3-5 minutes lag sakte hain cluster banne mein

### Step 3: Database User Create Karein

1. **Security section mein jao:**
   - Left sidebar mein "Database Access" pe click karo

2. **"Add New Database User" button:**
   - Username: apna username daalo (example: `admin`)
   - Password: Strong password daalo (save kar lo!)
   - Database User Privileges: "Atlas admin" select karo
   - "Add User" button pe click karo

### Step 4: Network Access Setup Karein

1. **"Network Access" pe click karo** (left sidebar)

2. **"Add IP Address" button:**
   - Development ke liye: "Allow Access from Anywhere" select karo
   - Ya apna IP address daalo
   - "Confirm" button pe click karo

### Step 5: Connection String Copy Karein

1. **"Database" section mein jao** (left sidebar)
   - Ya "Connect" button pe click karo

2. **"Connect your application" option select karo**

3. **Driver select karo:**
   - Driver: Node.js
   - Version: Latest (4.1 or later)

4. **Connection string copy karo:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Connection string update karo:**
   - `<username>` ko apne username se replace karo
   - `<password>` ko apne password se replace karo
   - Database name add karo: `?retryWrites=true&w=majority` se pehle
   
   **Final format:**
   ```
   mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ecolight?retryWrites=true&w=majority
   ```

### Step 6: .env.local File Mein Add Karein

1. **Project root directory mein `.env.local` file create karo**

2. **Connection string add karo:**
   ```env
   MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ecolight?retryWrites=true&w=majority
   ```

3. **Important:**
   - `admin` ko apne username se replace karo
   - `yourpassword` ko apne password se replace karo
   - `cluster0.xxxxx` ko apne cluster URL se replace karo
   - `ecolight` database name hai (ya apna naam daalo)

### Step 7: Server Restart Karein

```bash
# Server stop karo (Ctrl+C)
# Phir restart karo:
npm run dev
```

### Step 8: Test Connection

Browser mein jao:
```
http://localhost:3000/api/test
```

Agar "success: true" dikhe to sab sahi hai! ✅

## 📝 Example .env.local File

```env
MONGODB_URI=mongodb+srv://admin:mypassword123@cluster0.abc123.mongodb.net/ecolight?retryWrites=true&w=majority
```

## ⚠️ Important Security Notes

1. **`.env.local` file ko git mein commit mat karo!**
   - `.gitignore` mein already add honi chahiye

2. **Password strong rakho:**
   - Kam se kam 12 characters
   - Numbers, letters, aur special characters

3. **Production mein:**
   - Network Access mein sirf specific IPs allow karo
   - Strong passwords use karo

## 🆘 Common Issues

### Issue 1: Connection Timeout
**Solution:** Network Access mein "Allow Access from Anywhere" enable karo

### Issue 2: Authentication Failed
**Solution:** Username/password check karo, aur connection string mein sahi format use karo

### Issue 3: Database Name Error
**Solution:** Connection string mein database name add karo (example: `/ecolight`)

## 📞 Help

Agar koi problem ho to:
1. MongoDB Atlas dashboard check karo
2. Connection string verify karo
3. Server logs check karo
4. `.env.local` file location verify karo







