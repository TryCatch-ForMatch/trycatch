import Image from 'next/image';

interface AvatarProps {
  name: string;
  src: string | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const avatarSizes = {
  sm: { container: 'w-8 h-8 text-xs', image: 32 },
  md: { container: 'w-11 h-11 text-sm', image: 44 },
  lg: { container: 'w-20 h-20 text-xl', image: 80 },
};

export function Avatar({
  name,
  src,
  size = 'md',
  className = '',
}: AvatarProps) {
  const { container, image } = avatarSizes[size];
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={image}
        height={image}
        className={`${container} shrink-0 rounded-full object-cover ring-2 ring-background ${className}`}
      />
    );
  }

  return (
    <div
      className={`${container} flex shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-background ${className}`}
    >
      {initials}
    </div>
  );
}
