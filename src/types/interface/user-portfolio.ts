export interface PortfolioSkill {
  id: string;
  name: string;
  iconUrl: string | null;
}

export interface UserPortfolioCardData {
  id: string;
  avatarUrl: string | null;
  displayName: string;
  role: string;
  bio: string | null;
  skills: PortfolioSkill[];
  githubUrl?: string | null;
  linkedinUrl?: string | null;
}
