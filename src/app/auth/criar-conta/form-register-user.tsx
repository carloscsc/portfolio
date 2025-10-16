"use client";
import { useEffect, useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import PasswordInput from "@/components/forms/PasswordInput";
import TextInput from "@/components/forms/TextInput";
import Checkbox from "@/components/forms/checkbox";
import Radio from "@/components/forms/Radio";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import FormMessage from "@/components/forms/form-message";

import { UserStoreSchema, UserStoreType } from "@/_domain/user/user.schema";
import { responseType } from "@/_domain/shared/types";
import { userStore } from "@/_domain/user/user.actions";
import { useCep } from "@/hooks/use-cep";

const steps = ["Dados Pessoais", "Endereço", "Senha", "Termos"];

const AuthRegister = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [message, setMessage] = useState<responseType["message"] | null>(null);

  const {
    // register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    clearErrors,
  } = useForm<UserStoreType>({
    resolver: zodResolver(UserStoreSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      nascimento: "",
      cel: "",
      tel: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      password: "",
      repeat: "",
      termos: true,
      marketing: false,
      pergunta: "Opt 1",
    },
  });

  const { fetchAddress, clearError } = useCep(setValue);

  // Steps
  const handleNext = async () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = await trigger([
        "name",
        "email",
        "cpf",
        "nascimento",
        "cel",
        "tel",
      ]);
    }

    if (activeStep === 1) {
      isValid = await trigger([
        "cep",
        "endereco",
        "numero",
        "bairro",
        "cidade",
        "uf",
      ]);
    }

    if (activeStep === 2) {
      isValid = await trigger(["password", "repeat"]);
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = async () => {
    setMessage(null);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = useCallback((data: UserStoreType) => {
    setMessage(null);
    startTransition(async () => {
      const submit = await userStore(data);

      if (submit.message) {
        setMessage(submit.message);
      }
      if (submit.isSuccess) {
        setIsSuccess(true);
      }
    });
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        clearErrors(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isSuccess && (
        <>
          <div className="flex justify-between items-center p-2 mb-8 bg-muted border-b-2 -mt-7">
            <p className="font-medium">{steps[activeStep]}</p>
            <p className="text-xs">
              Etapa: {activeStep + 1} de {steps.length}
            </p>
          </div>

          <div className="space-y-4">
            {activeStep === 0 && (
              <>
                <TextInput
                  control={control}
                  name="name"
                  label="Nome Completo"
                  placeholder="Informe seu nome completo"
                />
                <TextInput
                  control={control}
                  name="email"
                  label="E-mail"
                  placeholder="Informe seu melhor e-mail"
                />
                <TextInput
                  control={control}
                  name="cpf"
                  label="CPF"
                  mask="999.999.999-99"
                  placeholder="Infrome seu CPF"
                />
                <TextInput
                  control={control}
                  name="nascimento"
                  label="Data de Nascimento"
                  mask="99/99/9999"
                  placeholder="Informe sua data de nascimento"
                />

                <TextInput
                  control={control}
                  name="cel"
                  label="Celular"
                  mask="99 99999-9999"
                  placeholder="Informe seu número de celular"
                />

                <TextInput
                  control={control}
                  name="tel"
                  label="Telefone (opicional)"
                  mask="99 9999-9999"
                  placeholder="Informe seu número de telefone"
                />
              </>
            )}

            {activeStep === 1 && (
              <>
                <TextInput
                  control={control}
                  name="cep"
                  label="CEP"
                  placeholder="Informe seu CEP"
                  mask="99999-999"
                  onChange={(e) => {
                    clearError();
                    fetchAddress(e.target.value);
                  }}
                />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <TextInput
                      control={control}
                      name="endereco"
                      label="Endereço"
                      placeholder="Informe seu endereço"
                    />
                  </div>

                  <TextInput
                    control={control}
                    name="numero"
                    label="Número"
                    placeholder="Informe o número do endereço"
                  />
                </div>

                <TextInput
                  control={control}
                  name="complemento"
                  label="Complemento (opcional)"
                  placeholder="Informe o complemento do endereço"
                />

                <TextInput
                  control={control}
                  name="bairro"
                  label="Bairro"
                  placeholder="Informe o bairro"
                />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <div className="md:col-span-3">
                    <TextInput
                      control={control}
                      name="cidade"
                      label="Cidade"
                      placeholder="Informe o CEP"
                      readOnly
                    />
                  </div>

                  <TextInput
                    control={control}
                    name="uf"
                    label="UF"
                    placeholder="Informe o CEP"
                    readOnly
                  />
                </div>
              </>
            )}

            {activeStep === 2 && (
              <>
                <PasswordInput
                  control={control}
                  name="password"
                  label="Senha"
                  helper
                />

                <PasswordInput
                  control={control}
                  name="repeat"
                  label="Repita a senha"
                />
              </>
            )}

            {activeStep === 3 && (
              <>
                <Checkbox
                  control={control}
                  name="termos"
                  label="Termos de uso"
                  description={
                    <>
                      Eu li e concordo com os{" "}
                      <Link
                        href="/"
                        target="_blank"
                        className="font-medium underline"
                      >
                        termos do regulamento
                      </Link>{" "}
                      e estou ciente do tratamento e privacidade de meus dados”.
                    </>
                  }
                />

                <Checkbox
                  control={control}
                  name="marketing"
                  label="Marketing"
                  description="Eu aceito receber conteúdo de marketing por e-mail."
                />

                <Radio
                  control={control}
                  title="Qual a resposta certa?"
                  name="pergunta"
                  label="Qual a resposta para a pergunta?"
                  options={[
                    { value: "Opt 1", label: "Opção 1" },
                    { value: "Opt 2", label: "Opção 2" },
                  ]}
                />
              </>
            )}
          </div>

          <div
            className="flex justify-between no-wrap gap-4"
            style={{ marginTop: "30px" }}
          >
            <Button
              type="button"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outline"
            >
              Voltar
            </Button>

            {activeStep < 3 && (
              <Button type="button" onClick={handleNext} variant="default">
                {activeStep === steps.length - 1 ? null : "Avançar"}
              </Button>
            )}

            {activeStep === 3 && (
              <LoadingButton size="default" loading={isPending} type="submit">
                Criar minha conta
              </LoadingButton>
            )}
          </div>
        </>
      )}

      {message && <FormMessage message={message} />}
    </form>
  );
};

export default AuthRegister;
