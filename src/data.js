export const tabs = [
  "Home",
  "Trending",
  "Create",
  "Stickers",
  "Wallpapers",
  "Profile"
];

export const carouselWallpapers = [
  {
    title: "Cyberpunk Night City",
    tag: "AI Generated",
    accent: "#00d4ff"
  },
  {
    title: "AMOLED Mountain Glow",
    tag: "4K Dark",
    accent: "#37f4a9"
  },
  {
    title: "Anime Sakura Lights",
    tag: "Trending",
    accent: "#ff5ea8"
  }
];

export const wallpaperCategories = [
  "AMOLED Dark",
  "Minimal",
  "Anime",
  "Nature & Aesthetic",
  "4K / Ultra HD",
  "Live Wallpapers"
];

export const stickerPacks = [
  { title: "Cute Panda Cafe", downloads: "1.2M", likes: "243K", type: "AI Pack" },
  { title: "Diwali Spark Vibes", downloads: "830K", likes: "190K", type: "Seasonal" },
  { title: "Cricket Meme Shots", downloads: "690K", likes: "160K", type: "Sports" },
  { title: "Love Pop Hearts", downloads: "510K", likes: "98K", type: "Romance" }
];

export const trendingFeed = [
  { title: "Neon Samurai 8K", likes: 58200, downloads: 104000, shares: 19000 },
  { title: "Valentine Glass Blur", likes: 41000, downloads: 77000, shares: 11200 },
  { title: "Minimal Focus Grid", likes: 36700, downloads: 68900, shares: 9800 }
];

export const moods = [
  { mood: "Calm", suggestion: "Misty forest, soft green gradient" },
  { mood: "Focus", suggestion: "Minimal black with clean geometry" },
  { mood: "Love", suggestion: "Pink sunset with bokeh hearts" },
  { mood: "Relax", suggestion: "Ocean dusk and ambient clouds" },
  { mood: "Happy", suggestion: "Bright abstract confetti palette" }
];

export const monetization = [
  "Interstitial ads after downloads",
  "Premium sticker and wallpaper packs",
  "Pro subscription (No ads, exclusive content, unlimited creation)"
];

export const rewards = [
  { action: "Daily login", coins: 20 },
  { action: "Upload a wallpaper", coins: 60 },
  { action: "Watch a reward ad", coins: 15 }
];

export const notifications = [
  "New anime wallpapers are live.",
  "Your wallpaper is trending today.",
  "Daily surprise pack has been unlocked."
];

export const firebaseStructure = {
  collections: ["users", "wallpapers", "stickers", "likes", "downloads"],
  storageFolders: ["wallpapers/", "stickers/", "user_uploads/"]
};
