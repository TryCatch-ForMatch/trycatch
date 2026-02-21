export interface PublicPortfolioSkill {
  skill: {
    id: string;
    name: string;
    iconUrl: string | null;
  };
}

export interface PublicPortfolioProject {
  id: string;
  name: string;
  description: string | null;
  skills: { id: string; name: string }[];
  stacks: { id: string; name: string }[];
}

export interface PublicPortfolioCertificate {
  id: string;
  title: string;
  issuer: string;
  url: string;
  date: string;
  description: string;
}

export interface PublicPortfolioFeedback {
  rating: number;
  fromUser: {
    name: string;
    avatar: string | null;
  };
}

export interface PublicPortfolio {
  id: string;
  name: string;
  userName: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  skills: PublicPortfolioSkill[];
  projects: PublicPortfolioProject[];
  certificates: PublicPortfolioCertificate[];
  feedbacks: PublicPortfolioFeedback[];
}
