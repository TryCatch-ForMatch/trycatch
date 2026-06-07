interface LoadingSpinnerProps {
  size?: 'sm' | 'md';
}

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  const s = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <svg className={`${s} animate-spin text-muted-foreground`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
