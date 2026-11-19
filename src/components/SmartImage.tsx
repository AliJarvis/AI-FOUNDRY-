import { useState } from 'react';
import { Layers } from 'lucide-react';

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SmartImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#191D26] via-[#14171F] to-[#1E1B2E] border border-white/[0.08] text-center p-6 ${className}`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center mb-3 text-[#A78BFA]">
          <Layers className="w-5 h-5" aria-hidden="true" />
        </div>
        {fallbackTitle && (
          <p className="text-sm font-medium text-[#E5E7EB] font-display">
            {fallbackTitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
