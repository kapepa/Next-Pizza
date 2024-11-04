'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { Controller, useFormContext } from 'react-hook-form';
import { FormTextarea } from '../form/from-textarea';
import { AddressInput } from '../address-input';
import { ErrorText } from '../error-text';

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
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {
                fieldState.error?.message && <ErrorText text={fieldState.error.message} />
              }
            </>
          )}
        />
        <FormTextarea
          rows={5}
          name="comment"
          className="text-base"
          placeholder="Comment to order"
        />
      </div>
    </WhiteBlock>
  );
};