import { cn } from '@/lib/utils';
import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return <p className={cn('text-red-500 text-sm', className)}>{text}</p>;
};