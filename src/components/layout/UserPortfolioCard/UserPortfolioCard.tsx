import Image from 'next/image';
import { Github, Linkedin, Code2 } from 'lucide-react';
import {
  UserPortfolioCardData,
  PortfolioSkill,
} from '@/types/interface/user-portfolio';

interface Props {
  data: UserPortfolioCardData;
}

export function UserPortfolioCard({ data }: Props) {
  return (
    <article className="relative flex h-[260px] flex-col rounded-2xl border border-[#EAEAEB] bg-white p-6 shadow-sm">
      {/* Top Right Icon */}
      <div className="absolute top-4 right-4 text-[#5C5C65]">
        <Code2 size={18} />
      </div>

      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#D9D9ED]">
          {data.avatarUrl && (
            <Image
              src={data.avatarUrl}
              alt={data.displayName}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-[#101014]">
            {data.displayName}
          </h3>

          {/* Skills */}
          <div className="flex gap-3">
            {data.skills.length > 0 ? (
              data.skills
                .slice(0, 4)
                .map((skill) => (
                  <Image
                    key={skill.id}
                    src={skill.iconUrl || '/placeholder-icon.png'}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="rounded"
                  />
                ))
            ) : (
              <span className="text-xs text-[#A6A6AA]">
                Sem skills cadastradas
              </span>
            )}
          </div>

          <span className="text-sm text-[#5C5C65]">{data.role}</span>
        </div>
      </div>

      {/* Bio */}
      {data.bio && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#35343C]">
          {data.bio}
        </p>
      )}

      {/* Social Icons (fixed) */}
      <div className="absolute right-4 bottom-4 flex gap-3 text-[#5C5C65]">
        {data.githubUrl && (
          <a
            href={data.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        )}

        {data.linkedinUrl && (
          <a
            href={data.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
    </article>
  );
}
