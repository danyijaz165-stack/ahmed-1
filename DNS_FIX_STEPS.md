# DNS Error Fix - Complete Solution Guide

## ✅ Step 1: Connection String Updated

Main ne `.env.local` file ko clean connection string se update kar diya hai. Ab ye format hai:

```
MONGODB_URI=mongodb+srv://dameer:dameer1122@cluster0.uesf4uu.mongodb.net/ecolight?retryWrites=true&w=majority
```

## ✅ Step 2: Server Restart (ZAROORI!)

Terminal mein jahan `npm run dev` chal raha hai:
1. **Ctrl+C** se stop karo
2. Phir restart karo:
   ```bash
   npm run dev
   ```

## ✅ Step 3: Test Again

Browser mein:
```
http://localhost:3000/api/test
```

## 🔧 Agar Abhi Bhi Error Aaye - Additional Solutions:

### Solution A: DNS Server Change

Windows mein DNS server change karo:

1. **Network Settings** kholo:
   - Windows Key + R
   - Type: `ncpa.cpl` aur Enter
   
2. **Active Network** par right-click → **Properties**

3. **Internet Protocol Version 4 (TCP/IPv4)** select karo → **Properties**

4. **"Use the following DNS server addresses"** select karo:
   - Preferred DNS: `8.8.8.8` (Google DNS)
   - Alternate DNS: `8.8.4.4` (Google DNS)
   
   Ya:
   - Preferred DNS: `1.1.1.1` (Cloudflare DNS)
   - Alternate DNS: `1.0.0.1` (Cloudflare DNS)

5. **OK** click karo

6. **DNS Flush** karo:
   ```bash
   ipconfig /flushdns
   ```

7. Server restart karo

### Solution B: MongoDB Atlas Cluster Check

1. **MongoDB Atlas Dashboard**: https://cloud.mongodb.com
2. **Login** karo
3. **Clusters** section check karo:
   - Cluster **active** hai? (paused nahi?)
   - Cluster URL sahi hai? (`cluster0.uesf4uu.mongodb.net`)
   - Agar cluster paused hai to **Resume** karo

### Solution C: Standard Connection String Try Karein

Agar `mongodb+srv://` nahi chal raha, to standard connection string use karo:

1. MongoDB Atlas mein:
   - **Connect** → **Connect your application**
   - **Driver:** Node.js
   - **Version:** 4.1 or later
   - Connection string copy karo

2. Standard connection string format:
   ```
   mongodb://dameer:dameer1122@cluster0-shard-00-00.uesf4uu.mongodb.net:27017,cluster0-shard-00-01.uesf4uu.mongodb.net:27017,cluster0-shard-00-02.uesf4uu.mongodb.net:27017/ecolight?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
   ```

3. `.env.local` mein update karo:
   ```env
   MONGODB_URI=mongodb://dameer:dameer1122@cluster0-shard-00-00.uesf4uu.mongodb.net:27017,cluster0-shard-00-01.uesf4uu.mongodb.net:27017,cluster0-shard-00-02.uesf4uu.mongodb.net:27017/ecolight?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
   ```

**Note:** Standard connection string MongoDB Atlas se copy karo - exact format cluster ke hisaab se different ho sakta hai.

### Solution D: Network/Firewall Check

1. **Firewall** check karo - MongoDB ports allow hain?
2. **Antivirus** temporarily disable karo (test ke liye)
3. **VPN** agar use kar rahe ho to band karo
4. **Different network** try karo (mobile hotspot)

### Solution E: Password Special Characters

Agar password mein special characters hain, to URL encode karo:

- `@` = `%40`
- `#` = `%23`
- `$` = `%24`
- `%` = `%25`
- `&` = `%26`
- `+` = `%2B`
- `=` = `%3D`

Example:
- Password: `pass@123` → `pass%40123`

## 📝 Quick Checklist:

- [x] Connection string clean ho gaya (extra parameters remove)
- [ ] Server restart kiya
- [ ] DNS flush kiya (`ipconfig /flushdns`)
- [ ] MongoDB Atlas cluster active hai
- [ ] Network Access configured hai (IP whitelist)
- [ ] DNS server change kiya (agar zaroorat ho)
- [ ] Standard connection string try kiya (agar `mongodb+srv://` fail ho)

## 🆘 Still Not Working?

1. **MongoDB Atlas** mein fresh connection string copy karo
2. **Cluster status** verify karo
3. **Network Access** check karo - "Allow Access from Anywhere" enable karo
4. **Terminal logs** check karo - koi aur errors?

## 💡 Most Common Fix:

**90% cases mein ye kaam karta hai:**
1. Connection string clean (✅ Done)
2. Server restart (✅ Ab karo)
3. DNS flush (`ipconfig /flushdns`)
4. MongoDB Atlas cluster verify

