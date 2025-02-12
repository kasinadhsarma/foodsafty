This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running the Backend API

To run the backend API, follow these steps:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python app.py
   ```

The backend server will start on [http://localhost:5000](http://localhost:5000).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

To deploy the backend API on Vercel, follow these steps:

1. Create a `vercel.json` file in the `backend` directory with the following content:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "app.py", "use": "@vercel/python" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "app.py" }
     ]
   }
   ```

2. Deploy the backend directory to Vercel:
   ```bash
   vercel --prod
   ```

The backend API will be deployed and accessible via the Vercel platform.
