"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormRegistSchema, FormRegistSchemaData } from "./modals/auth-modal/forms/schemas";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form/form-input";
import { Button } from "../ui/button";
import { updateUserInfo } from "@/actions/actions";

interface ProfileFormProps {
  data: User
}

const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { data } = props;
  const { toast } = useToast();
  const form = useForm<FormRegistSchemaData>({
    resolver: zodResolver(FormRegistSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async (data: FormRegistSchemaData) => {
    try {
      updateUserInfo(data)
      toast({ title: "Data updated" })
    } catch (error) {
      console.error(error);
      toast({ title: "Data update error" })
    }
  }

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/"
    })
  }

  return (
    <Container
      className="my-10"
    >
      <Title
        size="md"
        text="Private data"
        className="font-bold"
      />
      <FormProvider
        {...form}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-96 mt-10"
        >
          <FormInput
            name='name'
            type="text"
            label="Full name"
            required
          />
          <FormInput
            name='email'
            type="email"
            label="E-Mail"
            required
          />
          <FormInput
            name='password'
            type="password"
            label="New password"
            required
          />
          <FormInput
            name='password'
            type="password"
            label="Repeate password"
            required
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
          >
            Logout
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}

export { ProfileForm }