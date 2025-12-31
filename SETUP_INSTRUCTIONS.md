# Setup Instructions - MongoDB Backend

## ⚠️ IMPORTANT: MongoDB Setup Required

Agar aapko ye errors aa rahe hain:
- Sign up nahi ho raha
- Add to cart kaam nahi kar raha
- Orders place nahi ho rahe

**Ye sab MongoDB connection ki wajah se ho sakta hai.**

## Quick Setup Steps:

### 1. MongoDB Atlas Account Banao
1. https://www.mongodb.com/cloud/atlas par jao
2. Free account banao
3. "Create" button click karo
4. "Build a Database" choose karo
5. Free tier (M0) select karo
6. Region choose karo (closest to you)
7. Cluster name de do (e.g., "Cluster0")
8. "Create" click karo

### 2. Database User Banao
1. "Database Access" par jao (left sidebar)
2. "Add New Database User" click karo
3. Username aur password set karo
4. "Database User Privileges" mein "Atlas admin" select karo
5. "Add User" click karo

### 3. Network Access Setup
1. "Network Access" par jao (left sidebar)
2. "Add IP Address" click karo
3. "Allow Access from Anywhere" select karo (0.0.0.0/0)
4. Ya apna IP address add karo
5. "Confirm" click karo

### 4. Connection String Lo
1. "Database" par jao (left sidebar)
2. "Connect" button click karo
3. "Connect your application" choose karo
4. Driver: "Node.js" select karo
5. Version: Latest select karo
6. Connection string copy karo

### 5. .env.local File Banao
Root directory mein `.env.local` file banao:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecolight?retryWrites=true&w=majority
```

**Important:**
- `YOUR_USERNAME` ko apne database username se replace karo
- `YOUR_PASSWORD` ko apne database password se replace karo
- `cluster0.xxxxx` ko apne cluster name se replace karo
- `ecolight` database name hai (aap kuch bhi de sakte hain)

### 6. Dependencies Install Karo
```bash
npm install
```

### 7. Server Restart Karo
```bash
npm run dev
```

## Testing

1. **Sign Up Test:**
   - `/account/signup` par jao
   - Form fill karo
   - Submit karo
   - Agar success message aaye to MongoDB connected hai

2. **Add to Cart Test:**
   - Koi product par "Add to Cart" click karo
   - Cart icon par count dikhna chahiye

3. **Order Test:**
   - Cart mein jao
   - Checkout karo
   - Order place karo

## Common Errors:

### Error: "Database connection failed"
**Solution:** `.env.local` file check karo, MONGODB_URI sahi hai ya nahi

### Error: "Authentication failed"
**Solution:** MongoDB username/password check karo

### Error: "Network access denied"
**Solution:** MongoDB Atlas mein IP address whitelist karo

### Error: "Cannot find module 'mongoose'"
**Solution:** `npm install` run karo

## Alternative: Local MongoDB (Optional)

Agar MongoDB Atlas use nahi karna, to local MongoDB install kar sakte hain:

1. MongoDB Community Edition install karo
2. `.env.local` mein:
```env
MONGODB_URI=mongodb://localhost:27017/ecolight
```

## Support

Agar koi issue ho to:
1. Browser console check karo (F12)
2. Terminal mein errors check karo
3. MongoDB Atlas dashboard check karo











