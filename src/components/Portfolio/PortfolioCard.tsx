import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Code2 } from 'lucide-react';
import type { PortfolioSummaryItem } from '@/types/portfolio.types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SkillIcon } from '@/components/ui/skill-icon';
import { getRoleLabel } from '@/lib/role-labels';
import { Fragment } from 'react';

interface PortfolioCardProps {
  portfolio: PortfolioSummaryItem;
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const { username, name, bio, avatar, role, github, linkedin, skills } =
    portfolio;

  return (
    <Link href={`/portfolio/${username}`}>
      <article className="relative min-h-[360px] w-full max-w-[500px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
        {/* Background top strip */}
        <div className="pointer-events-none absolute top-0 left-0 h-1/4 w-full">
          <Image
            src="/bg-card.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Top right icon */}
        <div className="absolute top-4 right-4 z-10 text-gray-300">
          <Code2 size={18} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col pt-[15%]">
          {/* Avatar */}
          <div className="-mt-7">
            <Avatar
              name={name}
              src={avatar}
              size="md"
              className="bg-primary-light ring-0!"
            />
          </div>

          {/* Name + skills + role */}
          <div className="mt-3 flex flex-col items-start gap-2">
            <h3 className="text-sm font-semibold text-gray-500 sm:text-base">
              {name}
            </h3>

            <div className="flex gap-2">
              {skills.length > 0 ? (
                skills.slice(0, 4).map((skill) => (
                  <Fragment key={skill.id}>
                    {skill.iconUrl ? (
                      <SkillIcon src={skill.iconUrl} name={skill.name} />
                    ) : (
                      <Badge
                        variant="secondary"
                        className="rounded-full border-border/50 font-normal"
                      >
                        {skill.name}
                      </Badge>
                    )}
                  </Fragment>
                ))
              ) : (
                <span className="text-xs text-gray-200">
                  Sem skills cadastradas
                </span>
              )}
            </div>

            <span className="text-[11px] text-gray-300 sm:text-xs">
              {getRoleLabel(role)}
            </span>
          </div>

          {/* Bio */}
          {bio && (
            <p className="mt-3 line-clamp-4 text-xs leading-relaxed text-gray-400 sm:text-sm">
              {bio}
            </p>
          )}

          {/* Social icons — pinned to bottom-right */}
          {(github || linkedin) && (
            <div className="absolute right-6 bottom-6 flex gap-3 text-gray-300">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
