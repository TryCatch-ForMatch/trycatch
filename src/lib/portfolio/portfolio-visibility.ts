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

  certificates: {
    id: string;
    title: string;
    issuer: string;
    url: string | null;
    date: string;
    description: string | null;
  }[];

  feedbacksReceived: {
    rating: number;
    fromUser: {
      name: string;
      avatar: string | null;
    };
  }[];

  skills: {
    skill: {
      id: string;
      name: string;
      iconUrl: string | null;
    };
  }[];

  stacksTaken: {
    stack: {
      id: string;
      name: string;
    };
    project: {
      id: string;
      name: string;
      description: string | null;
      status: string;
      skills: {
        skill: {
          id: string;
          name: string;
        };
      }[];
    };
  }[];
};

export function buildPublicPortfolio(user: PublicPortfolioInput) {
  // Agrupar stacks por projeto
  const groupedProjectsMap = user.stacksTaken.reduce(
    (acc, item) => {
      const projectId = item.project.id;

      if (!acc[projectId]) {
        acc[projectId] = {
          id: item.project.id,
          name: item.project.name,
          description: item.project.description ?? null,
          skills: item.project.skills.map((s) => ({
            id: s.skill.id,
            name: s.skill.name,
          })),
          stacks: [],
        };
      }

      acc[projectId].stacks.push({
        id: item.stack.id,
        name: item.stack.name,
      });

      return acc;
    },
    {} as Record<
      string,
      {
        id: string;
        name: string;
        description: string | null;
        skills: { id: string; name: string }[];
        stacks: { id: string; name: string }[];
      }
    >
  );

  const groupedProjects = Object.values(groupedProjectsMap);

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
    projects: user.showProjects ? groupedProjects : [],
    skills: user.skills,
  };
}
