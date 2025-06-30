import React from 'react';
import { cn } from '../../lib/utils'; // pastikan util ini tersedia

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div className={cn('bg-white rounded-xl border shadow', className)} {...props} />
  );
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn('p-4', className)} {...props} />
  );
}
