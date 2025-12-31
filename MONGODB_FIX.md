# MongoDB Connection Fix Guide (Urdu/Hindi)

## Problem: MongoDB Connect Nahi Ho Raha

Aapka `.env.local` file mein connection string hai, lekin connection nahi ho raha. Ye common issues hain:

## ✅ Step 1: Connection String Format Check Karein

Aapka current connection string:
```
MONGODB_URI=mongodb+srv://dameer:dameer1122@cluster0.uesf4uu.mongodb.net/ecolight?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000
```

**Issue:** Connection string mein extra timeout parameters hain jo mongoose options mein honi chahiye, URI mein nahi.

**Fix:** Connection string ko clean karein:
```
MONGODB_URI=mongodb+srv://dameer:dameer1122@cluster0.uesf4uu.mongodb.net/ecolight?retryWrites=true&w=majority
```

## ✅ Step 2: MongoDB Atlas Network Access Check Karein

1. **MongoDB Atlas Dashboard** mein jao: https://cloud.mongodb.com
2. **Network Access** section mein jao (left sidebar)
3. **Check karein** agar aapka IP address whitelist mein hai
4. **Agar nahi hai**, to:
   - "Add IP Address" button click karo
   - Development ke liye: **"Allow Access from Anywhere"** (0.0.0.0/0) select karo
   - "Confirm" click karo

## ✅ Step 3: Database User Credentials Verify Karein

1. **Database Access** section mein jao (left sidebar)
2. **Username:** `dameer` check karo
3. **Password:** `dameer1122` verify karo
4. Agar password galat hai, to:
   - User edit karo
   - New password set karo
   - `.env.local` mein update karo

## ✅ Step 4: Connection String Mein Special Characters

Agar password mein special characters hain (@, #, $, %, etc.), to unhe **URL encode** karna hoga:
- `@` = `%40`
- `#` = `%23`
- `$` = `%24`
- `%` = `%25`
- `&` = `%26`

## ✅ Step 5: Server Restart Karein

`.env.local` file update karne ke baad **zaroor** server restart karein:

```bash
# Terminal mein Ctrl+C se server stop karo
# Phir restart karo:
npm run dev
```

## ✅ Step 6: Test Connection

Browser mein jao:
```
http://localhost:3000/api/test
```

Agar **"success: true"** dikhe to connection sahi hai! ✅

## 🔍 Common Errors aur Solutions

### Error 1: "MONGODB_URI is not defined"
**Solution:** `.env.local` file project root mein honi chahiye, aur server restart karo

### Error 2: "Authentication failed"
**Solution:** 
- Username/password check karo
- Password mein special characters ho to URL encode karo
- MongoDB Atlas mein user verify karo

### Error 3: "Network access denied" / "Connection timeout"
**Solution:**
- MongoDB Atlas mein Network Access check karo
- "Allow Access from Anywhere" enable karo (development ke liye)
- Firewall check karo

### Error 4: "Server selection timed out"
**Solution:**
- Internet connection check karo
- MongoDB Atlas cluster status check karo
- Connection string format verify karo

## 📝 Clean Connection String Format

`.env.local` file mein ye format use karein:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
```

**Important:**
- `username` aur `password` ko apne credentials se replace karo
- `cluster0.xxxxx` ko apne cluster URL se replace karo
- `database_name` ko apne database naam se replace karo (example: `ecolight`)

## 🆘 Still Not Working?

1. **Terminal logs check karo** - koi error message dikh raha hai?
2. **Browser console check karo** (F12) - network errors?
3. **MongoDB Atlas dashboard** - cluster status check karo
4. **Test API** - `/api/test` se connection test karo

## 📞 Quick Checklist

- [ ] `.env.local` file project root mein hai
- [ ] Connection string sahi format mein hai
- [ ] MongoDB Atlas mein Network Access configured hai
- [ ] Username/password sahi hain
- [ ] Server restart kiya hai (`npm run dev`)
- [ ] Test API se connection verify kiya hai

