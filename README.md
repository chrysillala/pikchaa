# Pikchaa

This is a picture searching app bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 📚 Stacks

- Next JS: for the React framework
- Axios: as the HTTP client
- Material UI: to create the user interface
- TanStack Query: the data fetching library

## ⭐️ Features

As a user, I want to be able to:

- ✅ Display list of photos with their title, author, and thumbnail image.
- ✅ Search for photos using keywords.
- ✅ Modal to display the photo in full size when clicked.
- ✅ Save favorite photos.
- ✅ Share photos on social media.
- 🔜 Implement infinite scrolling to load more photos as the user scrolls down the page.
- 🔜 Implement caching to improve performance and reduce the number of API calls.

## ⚡️ Project Setup

First, you need to get your Unsplash API Keys from [https://unsplash.com/developers](https://unsplash.com/developers)

Then copy and paste Access Key and Secret Key to `.env.local`. You can find the example on `.env.example`.

### Development

On the project directory, run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production

```bash
npm run build
npm run start
```

## ⏭ What's Next

Here are some improvement ideas for the app:

- there are still some duplicate components, would be better if we can convert into component
- improve error handling
- add the remaining features
