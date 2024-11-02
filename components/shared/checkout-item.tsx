'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image';
import { CartItemInfo } from './cart-item-details/cart-item-info';
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price';
import { CartItemDetailsCountButton } from './cart-item-details/cart-item-details-count-button';
import { ClickCountButtonProps } from '@/types/common';

interface Props extends CartItemProps {
  loading: boolean,
  className?: string;
  onClickRemove?: (id: string) => void;
  onClickCountButton: (props: ClickCountButtonProps) => void,
}

export const CheckoutItem: React.FC<Props> = ({
  id,
  name,
  price,
  loading,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickRemove,
  onClickCountButton,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled || loading,
        },
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage
          src={imageUrl}
        />
        <CartItemInfo
          name={name} details={details}
        />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetailsCountButton
          onClick={(val) => { onClickCountButton({ id, quantity, type: val }) }}
          value={quantity}
        />
        <button
          type="button"
          disabled={loading}
          onClick={onClickRemove?.bind(null, id)}
        >
          <X
            size={20}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          />
        </button>
      </div>
    </div>
  );
};