import { FC, InputHTMLAttributes } from "react";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/components/ui/input";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  required?: boolean,
  className?: string,
}

const FormInput: FC<FormInputProps> = (props) => {
  const { name, label, required, className, ...other } = props;
  const { register, formState: { errors }, watch, setValue } = useFormContext();

  return (
    <div
      className={className}
    >
      {label && (
        <p
          className="font-medium mb-2"
        >
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div
        className="relative"
      >
        <Input
          className="h-12 text-lg"
          {...other}
        />
        <ClearButton
          onClick={() => { console.log(name) }}
        />
      </div>

      <ErrorText
        text="Field is required"
        className="mt-2"
      />
    </div>
  )
}

export { FormInput }