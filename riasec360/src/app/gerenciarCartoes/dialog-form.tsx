"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EditarCartao } from "../../actions/cartoesActions";
import React, { Dispatch, SetStateAction } from "react";

enum TipoPerguntaEnum {
  Realista = "Realista",
  Investigativo = "Investigativo",
  Artistico = "Artístico",
  Social = "Social",
  Empreendedor = "Empreendedor",
  Convencional = "Convencional",
}

enum TipoPerguntaEnum {}
const formSchema = z.object({
  pergunta: z
    .string()
    .min(4, {
      message: "Pergunta deve ter mais que 4 caracteres",
    })
    .max(600, { message: "Pergunta muito grande" }),
  tipoPergunta: z.nativeEnum(TipoPerguntaEnum),
});

interface DialogFormProps {
  idRecebido: number;
  pergunta: string;
  tipoRecebido: string | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function stringToEnum(valor: string | null): TipoPerguntaEnum | undefined {
  for (const value of Object.values(TipoPerguntaEnum)) {
    if (value === valor) {
      return value as TipoPerguntaEnum;
    }
  }
  return undefined;
}
const EditarCartaoForm: React.FC<DialogFormProps> = ({
  idRecebido,
  pergunta,
  tipoRecebido,
  setIsOpen: onSubmitClosing,
}) => {
  //const router = useRouter();
  // 1. Define your form.

  const tipo = stringToEnum(tipoRecebido);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pergunta: pergunta,
      tipoPergunta: tipo,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const cartao = await EditarCartao({
      id: idRecebido,
      pergunta: values.pergunta,
      tipo: values.tipoPergunta,
    });

    if (cartao == "Cartão em uso") {
      alert(cartao);
    } else {
      onSubmitClosing(false);
    }
    //console.log(cartao);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pergunta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pergunta</FormLabel>
              <FormControl>
                <Input placeholder="Escreva sua Pergunta" {...field} />
              </FormControl>
              <FormDescription>Aqui você escreve a pergunta.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipoPergunta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={tipoRecebido} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Realista"> Realista</SelectItem>
                  <SelectItem value="Investigativo"> Investigativo</SelectItem>
                  <SelectItem value="Artístico"> Artístico</SelectItem>
                  <SelectItem value="Social"> Social</SelectItem>
                  <SelectItem value="Empreendedor"> Empreendedor</SelectItem>
                  <SelectItem value="Convencional"> Convencional</SelectItem>
                </SelectContent>
                <FormDescription>
                  Aqui você seleciona o tipo RIASEC da pergunta.
                </FormDescription>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditarCartaoForm;
