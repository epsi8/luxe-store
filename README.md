# Luxé Store — Setup & Deploy Guide

## Your file structure should look like this:
```
luxe-store/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── products.js
    ├── CartContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── CartPanel.jsx
    │   └── ProductCard.jsx
    └── pages/
        ├── Home.jsx
        └── ProductDetail.jsx
```

---

## STEP 1 — Install Node.js
Go to https://nodejs.org → download LTS → install it.

Check it worked:
```
node --version
npm --version
```

---

## STEP 2 — Set up the project
Open your terminal (or Command Prompt on Windows), navigate to where you want the project, then run:

```bash
npm install
npm run dev
```

Open http://localhost:5173 — your store should be running!

---

## STEP 3 — Push to GitHub
1. Go to https://github.com → create account → New Repository → name it `luxe-store`
2. Run in terminal:
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/luxe-store.git
git push -u origin main
```
Replace YOUR_USERNAME with your GitHub username.

---

## STEP 4 — Deploy to Vercel (get your shareable link)
1. Go to https://vercel.com → sign up with GitHub
2. Click "Add New Project"
3. Import your `luxe-store` repo
4. Click "Deploy" (leave all settings default)
5. Wait ~60 seconds → you get a link like: https://luxe-store-yourname.vercel.app

Share that link with anyone!

---

## STEP 5 — Update your site anytime
```bash
git add .
git commit -m "updated products"
git push
```
Vercel auto-redeploys in ~1 minute.
