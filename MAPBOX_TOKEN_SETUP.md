# Mapbox Token Setup Guide

## Issue
The Mapbox access token in the code appears to be expired or invalid. You need to get a new token.

## Steps to Get a New Mapbox Token

1. **Go to Mapbox Account**
   - Visit: https://account.mapbox.com/access-tokens/
   - Sign in or create a free account (free tier includes 50,000 map loads per month)

2. **Create a New Access Token**
   - Click "Create a token" or use the default token
   - Give it a name (e.g., "QCell Website")
   - Make sure it has these scopes:
     - `styles:read`
     - `fonts:read`
     - `datasets:read`
   - Click "Create token"

3. **Add Token to Your Project**

   **Option A: Environment Variable (Recommended)**
   - Create or edit `.env.local` file in the root directory
   - Add this line:
     ```
     NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
     ```
   - Replace `your_token_here` with your actual token
   - Restart your development server

   **Option B: Update Code Directly**
   - Edit `components/enhanced-coverage-map-two.tsx`
   - Find line 14 and replace the token:
     ```typescript
     mapboxgl.accessToken = "your_new_token_here";
     ```

4. **Restart Your Server**
   ```bash
   npm run dev
   ```

## Testing the Token

After adding the token, check the browser console (F12) for:
- "Map loaded successfully" - Token is working!
- "401 Unauthorized" - Token is invalid
- "403 Forbidden" - Token lacks permissions

## Free Tier Limits

Mapbox free tier includes:
- 50,000 map loads per month
- Sufficient for most small to medium websites
- No credit card required

## Troubleshooting

If you still see errors:
1. Check browser console (F12) for specific error messages
2. Verify token is correctly copied (no extra spaces)
3. Ensure token has required scopes
4. Check if token has URL restrictions that might block your domain


