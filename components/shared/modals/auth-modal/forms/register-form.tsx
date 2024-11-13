import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormRegistSchema, FormRegistSchemaData } from "./schemas";
import { useToast } from "@/hooks/use-toast";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/actions/actions";

interface RegisterFormProps {
  onClose: VoidFunction,
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { onClose } = props;
  const { toast } = useToast();
  const form = useForm<FormRegistSchemaData>({
    resolver: zodResolver(FormRegistSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data: FormRegistSchemaData) => {
    try {
      await registerUser(data);
      onClose()
    } catch (error) {
      toast({ title: "Failed to registeration" })
      console.error(error)
    }
  }

  return (
    <FormProvider
      {...form}
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title
              text="Account Login"
              size="md"
              className="font-bold"
            />
            <p
              className="text-gray-400"
            >
              Enter your email to log in to your account
            </p>
          </div>
          <img
            src="/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput
          name="name"
          label="Name"
          type="text"
          required
        />
        <FormInput
          name="email"
          label="E-Mail"
          type="email"
          required
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          required
        />
        <FormInput
          name="confirmPassword"
          label="Confirme"
          type="password"
          required
        />

        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
        >
          Sign up
        </Button>
      </form>
    </FormProvider>
  )
}

export { RegisterForm }