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

export function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  const { container, image } = avatarSizes[size];
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Image
      src={src ?? '/default-avatar.png'}
      alt={name}
      width={image}
      height={image}
      className={`${container} rounded-full object-cover ring-2 ring-background shrink-0 ${className}`}
    />
  );
}
