# Quick Fix Guide - MongoDB Connection Issues

## Problem:
- Sign up nahi ho raha
- Add to cart kaam nahi kar raha  
- Orders place nahi ho rahe

## Solution:

### Step 1: MongoDB Connection String Setup

1. **`.env.local` file banao** (root directory mein):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecolight?retryWrites=true&w=majority
```

2. **MongoDB Atlas se connection string lo:**
   - https://www.mongodb.com/cloud/atlas par jao
   - Free account banao
   - Cluster banao
   - "Connect" button click karo
   - "Connect your application" choose karo
   - Connection string copy karo
   - Username aur password replace karo

### Step 2: Test Connection

Browser mein jao:
```
http://localhost:3000/api/test
```

Agar "success: true" dikhe to MongoDB connected hai!

### Step 3: Check Errors

1. **Browser Console** (F12) mein errors check karo
2. **Terminal** mein server logs check karo
3. **Network tab** mein API calls check karo

### Step 4: Common Fixes

**Error: "Database connection failed"**
- `.env.local` file check karo
- MONGODB_URI sahi hai ya nahi
- Server restart karo: `npm run dev`

**Error: "Cannot find module"**
- Dependencies install karo: `npm install`

**Error: "Authentication failed"**
- MongoDB username/password check karo
- Special characters encode karo (@ = %40)

**Error: "Network access denied"**
- MongoDB Atlas mein IP whitelist karo
- "Allow Access from Anywhere" (0.0.0.0/0) select karo

### Step 5: Verify Everything Works

1. **Sign Up Test:**
   - `/account/signup` par jao
   - Form fill karo aur submit karo
   - Success message aana chahiye

2. **Add to Cart Test:**
   - Koi product par "Add to Cart" click karo
   - Cart icon par count badhna chahiye

3. **Order Test:**
   - Cart mein jao
   - Checkout karo
   - Order place karo

## Still Not Working?

1. Terminal mein `npm run dev` run karo
2. Browser console (F12) check karo
3. Network tab mein failed requests check karo
4. MongoDB Atlas dashboard check karo

## Important Notes:

- **No localStorage**: Sab kuch MongoDB mein store hoga
- **SessionStorage**: User data temporary session ke liye
- **Error Messages**: Ab better error messages dikhenge
- **Test API**: `/api/test` se connection check kar sakte hain











