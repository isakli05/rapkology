// Monthly Favorites Static Data - External File for Tree Shaking
export interface FavoriteItem {
  id: number;
  ranking: string; // "Top 10 (2. Sıra)"
  artist: string;  // "50 CENT"
  album: string;   // "CURTIS"
  coverImage: string;
  platform: 'youtube' | 'spotify';
}

export interface MonthlyFavoritesConfig {
  title: {
    text: string;
    lines: string[];
  };
  platforms: {
    youtube: {
      logo: string;
      alt: string;
    };
    spotify: {
      logo: string;
      alt: string;
    };
  };
}

export const monthlyFavoritesConfig: MonthlyFavoritesConfig = {
  title: {
    text: "AYIN FAVORİLERİ",
    lines: [
      "AYIN",
      "FAVORİLERİ"
    ]
  },
  platforms: {
    youtube: {
      logo: "/images/youtube.png",
      alt: "YouTube"
    },
    spotify: {
      logo: "/images/spotify.png", 
      alt: "Spotify"
    }
  }
};

export const favoritesData: FavoriteItem[] = [
  {
    id: 1,
    ranking: "Top 10 (1. Sıra)",
    artist: "50 CENT",
    album: "CURTIS",
    coverImage: "/images/fiftycent.png",
    platform: "youtube"
  },
  {
    id: 2,
    ranking: "Top 10 (2. Sıra)",
    artist: "SNOOP DOG",
    album: "BUSH",
    coverImage: "/images/snop.png",
    platform: "spotify"
  },
  {
    id: 3,
    ranking: "Top 10 (3. Sıra)",
    artist: "50 CENT",
    album: "CURTIS",
    coverImage: "/images/fiftycent.png",
    platform: "youtube"
  },
  {
    id: 4,
    ranking: "Top 10 (4. Sıra)",
    artist: "SNOOP DOG",
    album: "BUSH",
    coverImage: "/images/snop.png",
    platform: "spotify"
  }
];
