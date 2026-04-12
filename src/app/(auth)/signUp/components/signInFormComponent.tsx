"use client"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

import {zodResolver} from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import marginLogo from "@/public/Margin.svg";
import {useState} from "react";
import {authClient} from "@/src/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";


const formSchema = z.object({
    name:z.string().min(1,{error:"O campo nome é obrigatório"}),
    email:z.email({error:"O campo email deve ser um email válido"}).min(1,{error:"O campo email é obrigatório"}),
    password:z.string().min(1,{error:"O campo senha é obrigatório"}).min(6,{error:"A senha deve conter no mínimo 6 caracteres"})
})

const SignInFormComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof  formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(data:z.infer<typeof formSchema>){

        setIsLoading(true);

        await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            fetchOptions:{
                onSuccess: ()=>{
                    setIsLoading(false);
                    router.push("/onboarding")
                },
                onError(context) {
                    setIsLoading(false);
                    if (context.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
                        toast.error("user already exists");
                    }
                },
            }
        })
    }

    return (
        <Card className="w-full h-194 flex justify-center gap-10 p-10 sm:max-w-md bg-[#201F1F]">
            <CardHeader className="text-center ">
                <Image src={marginLogo} alt="Logo do Transfer Notes" width={48} height={48} className="mx-auto" />
                <CardTitle className='text-[#E5E2E1] text-[24px] leading-8 font-extrabold' >TRANSFER NOTES</CardTitle>
                <CardDescription className="text-[#C4C5D6] text-[14px] leading-5 ">
                    Transfira suas anotações para um novo app.
                </CardDescription>
            </CardHeader>
            <CardContent >
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} >
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-name" className="text-[#8E90A0] text-[10px] font-extrabold leading-3.75">
                                        Nome
                                    </FieldLabel>
                                    <InputGroup className="h-[47px] rounded-sm border-none bg-[#0E0E0E]">
                                        <InputGroupAddon>
                                            <InputGroupText className="text-[#444654]">
                                                <User />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...field}
                                            id="form-rhf-demo-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Ana Clara da Silva"
                                            autoComplete="name"
                                            required={fieldState.invalid}
                                            className="h-full text-[#E5E2E1] placeholder:text-[#444654]"
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-email" className="text-[#8E90A0] text-[10px] font-extrabold leading-3.75">
                                        Email
                                    </FieldLabel>
                                    <InputGroup className="h-[47px] rounded-sm border-none bg-[#0E0E0E]">
                                        <InputGroupAddon>
                                            <InputGroupText className="text-[#444654]">
                                                <Mail />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...field}
                                            id="form-rhf-demo-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="exemplo@gmail.com"
                                            autoComplete="email"
                                            type="email"
                                            required={fieldState.invalid}
                                            className="h-full text-[#E5E2E1] placeholder:text-[#444654]"
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-password" className="text-[#8E90A0] text-[10px] font-extrabold leading-3.75">
                                        Senha
                                    </FieldLabel>
                                    <InputGroup className="h-[47px] rounded-sm border-none bg-[#0E0E0E]">
                                        <InputGroupAddon>
                                            <InputGroupText className="text-[#444654]">
                                                <Lock />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            {...field}
                                            id="form-rhf-demo-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="******"
                                            autoComplete="new-password"
                                            type="password"
                                            required={fieldState.invalid}
                                            className="h-full text-[#E5E2E1] placeholder:text-[#444654]"
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <Field orientation="horizontal">
                        <Button type="submit" form="form-rhf-demo" className="w-full h-[52px] bg-[#2B45AB] cursor-pointer mt-10 font-extrabold" >
                            Criar Conta
                        </Button>
                    </Field>
                    <div className="mt-8 flex w-full items-center gap-4">
                        <Separator className="flex-1 bg-[#444654]" />
                        <span className="shrink-0 text-[#444654] text-[10px] leading-3.75 font-extrabold">
                            OU CONTINUE COM
                        </span>
                        <Separator className="flex-1 bg-[#444654]" />
                    </div>


                    <Field orientation="horizontal">
                        <Button type="button" className="w-full h-[52px] bg-[#2A2A2A] cursor-pointer mt-10 font-extrabold"  >
                            <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
                                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.233 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                                <path fill="#4CAF50" d="M24 44c5.168 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.143 35.091 26.715 36 24 36c-5.212 0-9.619-3.329-11.283-7.963l-6.523 5.025C9.505 39.556 16.227 44 24 44z" />
                                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.055 12.055 0 0 1-4.084 5.565l6.19 5.238C37.014 39.144 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                            </svg>
                            Crie sua conta com Google
                        </Button>
                    </Field>
                    <p className="mt-4 text-center text-[#C4C5D6] text-[14px] leading-[15px] font-extrabold ">
                        Novo no Transfer Notes ?
                        <a href="" className="text-[#B8C3FF]"> SignUp</a>
                    </p>
                </form>
            </CardContent>

        </Card>
    );
};

export default SignInFormComponent;
