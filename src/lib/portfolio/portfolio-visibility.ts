type PublicPortfolioInput = {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  email: string;
  github: string | null;
  linkedin: string | null;

  showEmail: boolean;
  showGithub: boolean;
  showLinkedin: boolean;
  showCertificates: boolean;
  showProjects: boolean;
  showFeedback: boolean;

  certificates: unknown[];
  feedbacksReceived: unknown[];
  stacksTaken: unknown[];
  skills: unknown[];
};

export function buildPublicPortfolio(user: PublicPortfolioInput) {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio,

    email: user.showEmail ? user.email : null,
    github: user.showGithub ? user.github : null,
    linkedin: user.showLinkedin ? user.linkedin : null,

    certificates: user.showCertificates ? user.certificates : [],
    feedbacks: user.showFeedback ? user.feedbacksReceived : [],
    projects: user.showProjects ? user.stacksTaken : [],
    skills: user.skills,
  };
}
