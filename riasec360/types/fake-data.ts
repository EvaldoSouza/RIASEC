import {  } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeaplicacao() {
  return {
    local: undefined,
    data_agendamento: faker.date.anytime(),
    hora_inicial: undefined,
    hora_termino: undefined,
  };
}
export function fakeaplicacaoComplete() {
  return {
    id_aplicacao: faker.number.int(),
    id_grupo: undefined,
    id_teste: faker.number.int(),
    local: undefined,
    data_agendamento: faker.date.anytime(),
    hora_inicial: undefined,
    hora_termino: undefined,
  };
}
export function fakeaplicacao_usuario() {
  return {
    inicio_testagem: faker.date.anytime(),
    fim_testagem: undefined,
  };
}
export function fakeaplicacao_usuarioComplete() {
  return {
    id_aplicacao: faker.number.int(),
    id_usuario: faker.number.int(),
    inicio_testagem: faker.date.anytime(),
    fim_testagem: undefined,
  };
}
export function fakecartao() {
  return {
    pergunta: undefined,
    tipo: undefined,
  };
}
export function fakecartaoComplete() {
  return {
    id_cartao: faker.number.int(),
    pergunta: undefined,
    tipo: undefined,
    em_uso: false,
  };
}
export function faketeste() {
  return {
    descricao: undefined,
    quant_cartoes: undefined,
    data_criacao: undefined,
  };
}
export function faketesteComplete() {
  return {
    id_teste: faker.number.int(),
    descricao: undefined,
    quant_cartoes: undefined,
    data_criacao: undefined,
  };
}
export function faketeste_cartaoComplete() {
  return {
    id_teste: faker.number.int(),
    id_cartao: faker.number.int(),
  };
}
export function fakeresposta_cartao() {
  return {
    id_teste: faker.number.int(),
    resposta_competencia: undefined,
    resposta_afinidade: undefined,
  };
}
export function fakeresposta_cartaoComplete() {
  return {
    id_resposta: faker.number.int(),
    id_teste: faker.number.int(),
    id_cartao: faker.number.int(),
    resposta_competencia: undefined,
    resposta_afinidade: undefined,
    aplicacao_usuarioId_usuario: faker.number.int(),
    aplicacao_usuarioId_aplicacao: faker.number.int(),
  };
}
export function fakegrupo() {
  return {
    nome: undefined,
    descricao: undefined,
    data_criacao: undefined,
  };
}
export function fakegrupoComplete() {
  return {
    id_grupo: faker.number.int(),
    nome: undefined,
    descricao: undefined,
    data_criacao: undefined,
  };
}
export function fakeusuario() {
  return {
    nome: faker.lorem.words(5),
    email: faker.internet.email(),
    emailVerified: undefined,
    data_nasc: faker.date.anytime(),
    senha: faker.lorem.words(5),
    data_criacao: faker.date.anytime(),
    data_atualizacao: undefined,
    privilegio: faker.lorem.words(5),
  };
}
export function fakeusuarioComplete() {
  return {
    id_user: faker.number.int(),
    nome: faker.lorem.words(5),
    email: faker.internet.email(),
    emailVerified: undefined,
    data_nasc: faker.date.anytime(),
    senha: faker.lorem.words(5),
    data_criacao: faker.date.anytime(),
    data_atualizacao: undefined,
    privilegio: faker.lorem.words(5),
  };
}
export function fakesessao() {
  return {
    sessionToken: faker.lorem.words(5),
    expires: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakesessaoComplete() {
  return {
    id: faker.string.uuid(),
    sessionToken: faker.lorem.words(5),
    userId: faker.number.int(),
    expires: faker.date.anytime(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeusuario_grupoComplete() {
  return {
    id_usuario: faker.number.int(),
    id_grupo: faker.number.int(),
  };
}
