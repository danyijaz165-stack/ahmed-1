# Backend Setup Guide

## MongoDB Database Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `mongodb` - MongoDB driver
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens (for future auth)

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecolight?retryWrites=true&w=majority
```

Replace:
- `username` with your MongoDB username
- `password` with your MongoDB password
- `cluster` with your cluster name
- `ecolight` with your database name

### 4. Database Models

The following models are created:
- **User** - User accounts (name, email, password)
- **Cart** - Shopping cart items per user
- **Order** - Order history with customer details

### 5. API Routes

All API routes are in `app/api/`:

- **Auth**
  - `POST /api/auth/signup` - Create new account
  - `POST /api/auth/login` - Login user

- **Cart**
  - `GET /api/cart` - Get user's cart
  - `POST /api/cart` - Add item to cart
  - `PUT /api/cart` - Update cart
  - `DELETE /api/cart` - Clear cart

- **Orders**
  - `GET /api/orders` - Get user's orders
  - `POST /api/orders` - Create new order
  - `GET /api/orders/[id]` - Get single order

### 6. Frontend Changes

All localStorage usage has been replaced with API calls:
- Cart data stored in MongoDB
- User authentication via API
- Orders saved to database
- No data stored in localStorage

### 7. User Session

User data is stored in `sessionStorage` (not localStorage) for the current session only.

### 8. Run the Application

```bash
npm run dev
```

The application will connect to MongoDB automatically when API routes are called.

## Important Notes

- **No localStorage**: All data is stored in MongoDB
- **Session-based**: User sessions use sessionStorage
- **Error handling**: All API calls have proper error handling
- **Password security**: Passwords are hashed with bcryptjs
- **Guest users**: Cart works for guest users (userId: 'guest')

## Troubleshooting

1. **Connection Error**: Check your MongoDB URI in `.env.local`
2. **Authentication Error**: Verify MongoDB username/password
3. **Network Error**: Check IP whitelist in MongoDB Atlas
4. **Build Error**: Make sure all dependencies are installed











