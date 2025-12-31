# MongoDB DNS Error Fix - ENOTFOUND Error

## Problem:
```
querySrv ENOTFOUND _mongodb._tcp.cluster0.uesf4uu.mongodb.net
```

Ye error ka matlab hai ki MongoDB Atlas cluster URL resolve nahi ho raha.

## ✅ Solutions:

### Solution 1: Connection String Format Fix

Aapka current connection string:
```
MONGODB_URI=mongodb+srv://dameer:dameer1122@cluster0.uesf4uu.mongodb.net/ecolight?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000
```

**Issue:** Connection string ke end mein extra timeout parameters hain jo URI mein nahi hone chahiye.

**Fix:** `.env.local` file mein connection string ko clean karein:

```env
MONGODB_URI=mongodb+srv://dameer:dameer1122@cluster0.uesf4uu.mongodb.net/ecolight?retryWrites=true&w=majority
```

**Important:** 
- Extra timeout parameters (`serverSelectionTimeoutMS`, `socketTimeoutMS`) hata do
- Ye parameters already mongoose options mein hain

### Solution 2: MongoDB Atlas Cluster Verify Karein

1. **MongoDB Atlas Dashboard** mein jao: https://cloud.mongodb.com
2. **Login** karo
3. **Clusters** section mein jao
4. **Apna cluster** select karo
5. **"Connect"** button click karo
6. **"Connect your application"** choose karo
7. **Connection string copy karo** - verify karo ki URL sahi hai

**Check karein:**
- Cluster name: `cluster0.uesf4uu.mongodb.net` sahi hai?
- Cluster active hai ya paused?
- Cluster delete to nahi ho gaya?

### Solution 3: Network/DNS Issue

Agar cluster URL sahi hai, to ye try karein:

1. **Internet connection** check karo
2. **DNS flush** karo (Windows):
   ```bash
   ipconfig /flushdns
   ```
3. **Different network** try karo (mobile hotspot, etc.)
4. **VPN** agar use kar rahe ho to band karo

### Solution 4: Connection String Format Verify

Sahi format:
```
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

**Important points:**
- `username` aur `password` mein special characters ho to URL encode karo:
  - `@` = `%40`
  - `#` = `%23`
  - `$` = `%24`
  - `%` = `%25`
  - `&` = `%26`
- Database name (`ecolight`) sahi hai?
- Query parameters (`?retryWrites=true&w=majority`) sahi hain?

### Solution 5: Alternative Connection Method

Agar `mongodb+srv://` nahi chal raha, to standard connection string try karo:

1. MongoDB Atlas mein **"Connect"** → **"Connect your application"**
2. **Driver:** Node.js
3. **Version:** 4.1 or later
4. Connection string copy karo
5. Verify karo ki format sahi hai

### Solution 6: MongoDB Atlas Cluster Status

1. MongoDB Atlas dashboard mein jao
2. **Clusters** section check karo
3. Agar cluster **paused** hai to **resume** karo
4. Agar cluster **deleted** hai to naya cluster banao

## 🔧 Step-by-Step Fix:

### Step 1: .env.local File Update

`.env.local` file kholo aur connection string ko clean karo:

```env
MONGODB_URI=mongodb+srv://dameer:dameer1122@cluster0.uesf4uu.mongodb.net/ecolight?retryWrites=true&w=majority
```

**Extra parameters hata do:**
- `&serverSelectionTimeoutMS=10000`
- `&socketTimeoutMS=45000`

### Step 2: MongoDB Atlas Verify

1. https://cloud.mongodb.com par jao
2. Cluster status check karo
3. Connection string fresh copy karo
4. Verify karo ki cluster URL sahi hai

### Step 3: Server Restart

```bash
# Terminal mein Ctrl+C se stop karo
npm run dev
```

### Step 4: Test Again

Browser mein:
```
http://localhost:3000/api/test
```

## 🆘 Still Not Working?

1. **MongoDB Atlas** mein cluster status check karo
2. **Connection string** fresh copy karo
3. **Username/password** verify karo
4. **Network Access** check karo (IP whitelist)
5. **Internet connection** verify karo

## 📝 Quick Checklist

- [ ] Connection string clean hai (extra parameters nahi hain)
- [ ] MongoDB Atlas mein cluster active hai
- [ ] Cluster URL sahi hai
- [ ] Username/password sahi hain
- [ ] Network Access configured hai
- [ ] Server restart kiya hai
- [ ] DNS flush kiya hai (agar zaroorat ho)

