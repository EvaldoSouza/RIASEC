import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const perguntas = [
    { pergunta: "Eu gosto de trabalhar em carros", tipo: "Realista" },
    { pergunta: "Eu gosto de fazer quebra-cabeças", tipo: "Investigativo" },
    {
      pergunta: "Eu sou bom em trabalhar de forma independente",
      tipo: "Investigativo",
    },
    { pergunta: "Eu gosto de trabalhar em equipe", tipo: "Social" },
    {
      pergunta: "Eu sou uma pessoa ambiciosa, estabeleço metas para mim mesmo",
      tipo: "Empreendedor",
    },
    {
      pergunta: "Eu gosto de organizar coisas (arquivos, mesas/escritórios)",
      tipo: "Convencional",
    },
    { pergunta: "Eu gosto de construir coisas", tipo: "Realista" },
    { pergunta: "Eu gosto de ler sobre arte e música", tipo: "Artístico" },
    {
      pergunta: "Eu gosto de ter instruções claras a seguir",
      tipo: "Convencional",
    },
    {
      pergunta: "Eu gosto de tentar influenciar ou persuadir as pessoas",
      tipo: "Empreendedor",
    },
    { pergunta: "Eu gosto de fazer experimentos", tipo: "Investigativo" },
    { pergunta: "Eu gosto de ensinar ou treinar pessoas", tipo: "Social" },
    {
      pergunta:
        "Eu gosto de tentar ajudar as pessoas a resolverem seus problemas",
      tipo: "Social",
    },
    { pergunta: "Eu gosto de cuidar de animais", tipo: "Realista" },
    {
      pergunta:
        "Eu não me importaria de trabalhar 8 horas por dia em um escritório",
      tipo: "Convencional",
    },
    { pergunta: "Eu gosto de vender coisas", tipo: "Empreendedor" },
    { pergunta: "Eu gosto de escrever de forma criativa", tipo: "Artístico" },
    { pergunta: "Eu gosto de ciência", tipo: "Investigativo" },
    {
      pergunta: "Eu sou rápido em assumir novas responsabilidades",
      tipo: "Empreendedor",
    },
    { pergunta: "Eu tenho interesse em curar pessoas", tipo: "Social" },
    {
      pergunta: "Eu gosto de tentar descobrir como as coisas funcionam",
      tipo: "Investigativo",
    },
    { pergunta: "Eu gosto de montar ou ensamblar coisas", tipo: "Realista" },
    { pergunta: "Eu sou uma pessoa criativa", tipo: "Artístico" },
    { pergunta: "Eu presto atenção aos detalhes", tipo: "Convencional" },
    { pergunta: "Eu gosto de arquivar ou digitar", tipo: "Convencional" },
    {
      pergunta: "Eu gosto de analisar coisas (problemas/situações)",
      tipo: "Investigativo",
    },
    { pergunta: "Eu gosto de tocar instrumentos ou cantar", tipo: "Artístico" },
    { pergunta: "Eu gosto de aprender sobre outras culturas", tipo: "Social" },
    {
      pergunta: "Eu gostaria de começar meu próprio negócio",
      tipo: "Empreendedor",
    },
    { pergunta: "Eu gosto de cozinhar", tipo: "Realista" },
    { pergunta: "Eu gosto de atuar em peças de teatro", tipo: "Artístico" },
    { pergunta: "Eu sou uma pessoa prática", tipo: "Realista" },
    {
      pergunta: "Eu gosto de trabalhar com números ou gráficos",
      tipo: "Convencional",
    },
    {
      pergunta: "Eu gosto de entrar em discussões sobre questões",
      tipo: "Empreendedor",
    },
    {
      pergunta: "Eu sou bom em manter registros do meu trabalho",
      tipo: "Convencional",
    },
    { pergunta: "Eu gosto de liderar", tipo: "Empreendedor" },
    { pergunta: "Eu gosto de trabalhar ao ar livre", tipo: "Realista" },
    {
      pergunta: "Eu gostaria de trabalhar em um escritório",
      tipo: "Convencional",
    },
    { pergunta: "Eu sou bom em matemática", tipo: "Convencional" },
    { pergunta: "Eu gosto de ajudar as pessoas", tipo: "Social" },
    { pergunta: "Eu gosto de desenhar", tipo: "Artístico" },
    { pergunta: "Eu gosto de fazer discursos", tipo: "Empreendedor" },
  ];

  for (const pergunta of perguntas) {
    await prisma.cartao.create({
      data: {
        pergunta: pergunta.pergunta,
        tipo: pergunta.tipo,
        em_uso: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
