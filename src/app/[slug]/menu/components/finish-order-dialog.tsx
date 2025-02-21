"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf } from "../helpers/cpf";
import { useContext, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { createOrder } from "../actions/create-order";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "O nome é obrigatório",
    }),
    cpf: z
        .string()
        .trim()
        .min(1, { message: "O CPF é obrigatório" })
        .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderButtonProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function FinishOrderDialog({ open, onOpenChange }: FinishOrderButtonProps) {
    const { slug } = useParams<{ slug: string }>();
    const { products } = useContext(CartContext);
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
        shouldUnregister: true,
    });

    const onSubmit = async (data: FormSchema) => {
        try {
            const consumptionMethod = searchParams.get("consumptionMethod") as ConsumptionMethod;
            startTransition(async () => {
                await createOrder({
                    consumptionMethod,
                    customerName: data.name,
                    customerCpf: data.cpf,
                    products,
                    slug,
                });
                onOpenChange(false);
                toast.success("Pedido finalizado com sucesso!");
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu CPF</FormLabel>
                                        <FormControl>
                                            <PatternFormat
                                                placeholder="Digite seu CPF..."
                                                format="###.###.###-##"
                                                customInput={Input}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button
                                    type="submit"
                                    variant={"destructive"}
                                    className="rounded-full"
                                    disabled={isPending}
                                >
                                    {isPending && <Loader2Icon className="animate-spin" />}
                                    Finalizar
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full rounded-full">
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
};