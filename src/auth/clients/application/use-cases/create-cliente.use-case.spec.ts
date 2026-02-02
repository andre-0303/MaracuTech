import { CreateClienteUseCase } from './create-cliente.use-case';
import { ClientesRepositoryFake } from '../../infra/repositories/clientes-repository.fake';

describe('CreateClienteUseCase', () => {
  let useCase: CreateClienteUseCase;
  let clientesRepository: ClientesRepositoryFake;

  beforeEach(() => {
    clientesRepository = new ClientesRepositoryFake();
    useCase = new CreateClienteUseCase(clientesRepository);
  });

  it('deve criar um cliente com sucesso', async () => {
    const cliente = await useCase.execute({
      nome: 'Produtor da Ibiapaba',
      email: 'produtor@ibiapaba.com',
      telefone: '88999998888',
    });

    expect(cliente).toBeDefined();
    expect(cliente.id).toBeTruthy();
    expect(cliente.nome).toBe('Produtor da Ibiapaba');
    expect(cliente.email).toBe('produtor@ibiapaba.com');
    expect(cliente.ativo).toBe(true);
  });

  it('não deve permitir criar cliente com email duplicado', async () => {
    await useCase.execute({
      nome: 'Produtor 1',
      email: 'duplicado@ibiapaba.com',
      telefone: '111111111',
    });

    await expect(
      useCase.execute({
        nome: 'Produtor 2',
        email: 'duplicado@ibiapaba.com',
        telefone: '222222222',
      }),
    ).rejects.toThrow('Cliente já cadastrado com este email');
  });
});
