import { cn } from '@/lib/utils';
import React from 'react';
import { CountIconButton } from './count-icon-button';
import { CountButtonType } from '@/types/common';

export interface CountButtonProps {
  size?: 'sm' | 'lg';
  value?: number;
  loading?: boolean,
  onClick?: (type: CountButtonType) => void;
  className?: string;
}

const CountButton: React.FC<CountButtonProps> = ({
  value = 1,
  size = 'sm',
  loading,
  onClick,
  className,
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1 || loading}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton
        onClick={() => onClick?.('plus')}
        disabled={loading}
        size={size}
        type="plus"
      />
    </div>
  );
};

export { CountButton }