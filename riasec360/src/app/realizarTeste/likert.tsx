//vou fazer um form com radiobuttons do shadcn
//Onde vou salvar os resultados desse form?
//em um array no cache da página, e só no final da aplicação mando pro banco
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { gravarResposta } from "@/actions/aplicacaoActions";

interface Cartao {
  id_cartao: number;
  pergunta: string | null;
  tipo: string | null;
  em_uso: boolean | null;
}
//TODO tirar essa interface daqui
interface LikertProps {
  cartoes: Cartao[];
  idAplicacao: number;
}

interface respostaCompleta {
  idAplicacao: number;
  idCartao: number;
  resposta: string;
  tipoResposta: string;
}

const FormSchema = z.object({
  type: z.enum(
    [
      "Gostaria Muito",
      "Gostaria Parcialmente",
      "Indiferente",
      "Não Gostaria",
      "Detestaria",
    ],
    {
      required_error: "É preciso selecionar uma opção para prosseguir",
    }
  ),
});

const Likert: React.FC<LikertProps> = ({ cartoes, idAplicacao }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [respostas, setRespostas] = useState<string[]>([]);

  useEffect(() => {
    if (respostas.length == cartoes.length) {
      console.log(respostas);
    }
  }, [respostas]);

  //como in preenchendo esse array de strings?
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (cartoes[currentQuestionIndex]) {
      // const resposta = cartoes[currentQuestionIndex].pergunta + ": " + data.type;

      // setRespostas([
      //   ...respostas,
      //   { id: currentQuestionIndex, name: resposta },
      // ]);

      try {
        const gravada = await gravarResposta(
          idAplicacao,
          cartoes[currentQuestionIndex].id_cartao,
          data.type,
          "Likert"
        );
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } catch (error) {
        console.log(error);
      }
    }

    //guardar aqui, ou retornar a info para página
    //como retornar isso?
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{cartoes[currentQuestionIndex].pergunta}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Gostaria Muito" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Gostaria Muito
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Gostaria Parcialmente" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Gostaria Parcialmente
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Indiferente" />
                    </FormControl>
                    <FormLabel className="font-normal">Indiferente</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Não Gostaria" />
                    </FormControl>
                    <FormLabel className="font-normal">Não Gostaria</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Detestaria" />
                    </FormControl>
                    <FormLabel className="font-normal">Detestaria</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {currentQuestionIndex < cartoes.length - 1 ? (
          <Button type="submit"> Proxima</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export default Likert;
