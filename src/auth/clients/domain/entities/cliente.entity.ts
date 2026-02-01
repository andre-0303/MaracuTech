import { randomUUID } from 'crypto';

interface ClienteProps {
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  createdAt: Date;
}

export class Cliente {
  static restore(props: {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  createdAt: Date;
}) {
  const cliente = new Cliente(
    {
      nome: props.nome,
      email: props.email,
      telefone: props.telefone,
      ativo: props.ativo,
      createdAt: props.createdAt,
    },
    props.id,
  );

  return cliente;
}

  private _id: string;
  private props: ClienteProps;

  private constructor(props: ClienteProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  // 🔹 Factory Method (forma correta de criar)
  static create(
    props: Omit<ClienteProps, 'ativo' | 'createdAt'>,
    id?: string,
  ) {
    const cliente = new Cliente(
      {
        ...props,
        ativo: true,
        createdAt: new Date(),
      },
      id,
    );

    return cliente;
  }

  // 🔹 getters (encapsulamento)
  get id() {
    return this._id;
  }

  get nome() {
    return this.props.nome;
  }

  get email() {
    return this.props.email;
  }

  get telefone() {
    return this.props.telefone;
  }

  get ativo() {
    return this.props.ativo;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  // 🔹 comportamentos (regra de negócio)
  desativar() {
    this.props.ativo = false;
  }

  atualizarTelefone(novoTelefone: string) {
    this.props.telefone = novoTelefone;
  }

  update(partial: Partial<Omit<ClienteProps, 'createdAt'>>) {
    if (partial.nome !== undefined) this.props.nome = partial.nome;
    if (partial.email !== undefined) this.props.email = partial.email;
    if (partial.telefone !== undefined) this.props.telefone = partial.telefone;
    if (partial.ativo !== undefined) this.props.ativo = partial.ativo;
  }
}
