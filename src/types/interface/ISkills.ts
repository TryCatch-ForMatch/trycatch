export type ISkillsProps = {
  id?: string;
  name?: string;
  iconUrl?: string | null;
  normalizedName?: string;
  createdAt?: string | Date;
};

export type IUserSkills = {
  id?: string;
  skill?: ISkillsProps;
  userId?: string;
  skillId?: string;
  updatedAt?: string | Date;
  createdAt?: string | Date;
};
