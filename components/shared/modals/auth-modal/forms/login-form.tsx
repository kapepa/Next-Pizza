import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormLoginData, FormLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form/form-input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  onClose: VoidFunction,
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { onClose } = props;
  const { toast } = useToast();
  const form = useForm<FormLoginData>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: FormLoginData) => {
    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (!res?.ok) throw new Error("Failed to login");

      toast({ title: "You've been successful" })
      onClose();
    } catch (error) {
      toast({ title: "Failed to login" })
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
            <Title text="Account Login" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your email to log in to your account</p>
          </div>
          <img src="/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput
          name="email"
          label="E-Mail"
          required
        />
        <FormInput
          name="password"
          label="Пароль"
          type="password"
          required
        />

        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
        >
          Sign in
        </Button>

      </form>
    </FormProvider>
  )
}

export { LoginForm }