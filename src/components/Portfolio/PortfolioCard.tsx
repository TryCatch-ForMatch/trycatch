import Image from 'next/image';
import { Github, Linkedin, Code2 } from 'lucide-react';
import { UserPortfolioCardData } from '@/types/portfolio/portfolio-card';

interface Props {
  data: UserPortfolioCardData;
}

export function UserPortfolioCard({ data }: Props) {
  return (
    <article className="relative min-h-[360px] w-full max-w-[500px] overflow-hidden rounded-2xl border border-[#EAEAEB] bg-white p-5 shadow-sm sm:p-6">
      {/* Background top (1/4 height, does not affect layout) */}
      <div className="pointer-events-none absolute top-0 left-0 h-1/4 w-full">
        <Image
          src="/bg-card.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Top Right Icon */}
      <div className="absolute top-4 right-4 z-10 text-[#5C5C65]">
        <Code2 size={18} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col pt-[15%]">
        {/* Avatar */}
        <div className="-mt-7">
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
        </div>

        {/* Info */}
        <div className="mt-3 flex flex-col items-start gap-2">
          <h3 className="text-sm font-semibold text-[#101014] sm:text-base">
            {data.displayName}
          </h3>

          {/* Skills */}
          <div className="flex gap-2">
            {data.skills.length > 0 ? (
              data.skills
                .slice(0, 4)
                .map((skill) => (
                  <Image
                    key={skill.id}
                    src={skill.iconUrl || '/placeholder-icon.png'}
                    alt={skill.name}
                    width={18}
                    height={18}
                    className="rounded sm:h-[20px] sm:w-[20px]"
                  />
                ))
            ) : (
              <span className="text-xs text-[#A6A6AA]">
                Sem skills cadastradas
              </span>
            )}
          </div>

          <span className="text-[11px] text-[#5C5C65] sm:text-xs">
            {data.role}
          </span>
        </div>

        {/* Bio */}
        {data.bio && (
          <p className="mt-3 line-clamp-4 text-xs leading-relaxed text-[#35343C] sm:text-sm">
            {data.bio}
          </p>
        )}

        {/* Social Icons (fixed) */}
        <div className="absolute right-6 bottom-6 flex gap-3 text-[#5C5C65]">
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
      </div>
    </article>
  );
}
