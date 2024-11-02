import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form/form-input';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock
      title="2. Personal data"
    >
      <div
        className="grid grid-cols-2 gap-5"
      >
        <FormInput
          name="firstName"
          type="text"
          className="text-base"
          placeholder="Name"
        />
        <FormInput
          name="lastName"
          type="text"
          className="text-base"
          placeholder="Last name"
        />
        <FormInput
          name="email"
          type="email"
          className="text-base"
          placeholder="E-mail"
        />
        <FormInput
          name="phone"
          type="text"
          className="text-base"
          placeholder="Phone number"
        />
      </div>
    </WhiteBlock>
  );
};