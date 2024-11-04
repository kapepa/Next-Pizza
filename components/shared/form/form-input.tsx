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
  const value = watch(name);
  const errorMessage = errors[name]?.message as string;

  const onClickClear = () => setValue(name, "", { shouldValidate: true });

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
          {...register(name)}
          {...other}
        />
        {value && (
          <ClearButton
            onClick={onClickClear}
          />
        )}

      </div>

      {errorMessage && (
        <ErrorText
          text={errorMessage}
          className="mt-2"
        />
      )}

    </div>
  )
}

export { FormInput }