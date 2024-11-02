'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormInput } from '../form/form-input';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock
      title="3. Address to delivery"
    >
      <div
        className="flex flex-col gap-5"
      >
        <FormInput
          name="address"
          type="text"
          className="text-base"
          placeholder="Your address"
        />
        <Textarea
          rows={5}
          name="comment"
          className="text-base"
          placeholder="Comment to order"
        />
      </div>
    </WhiteBlock>
  );
};