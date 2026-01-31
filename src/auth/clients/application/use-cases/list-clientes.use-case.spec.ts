import { ListClientesUseCase } from './list-clientes.use-case';
import { InMemoryClientesRepository } from '../../infra/repositories/in-memory-clientes.repository';
import { Cliente } from '../../domain/entities/cliente.entity';

describe('ListClientesUseCase', () => {
  let useCase: ListClientesUseCase;
  let clientesRepository: InMemoryClientesRepository;

  beforeEach(() => {
    clientesRepository = new InMemoryClientesRepository();
    useCase = new ListClientesUseCase(clientesRepository);
  });

  it('deve retornar uma lista de clientes', async () => {
    const cliente1 = Cliente.create({
      nome: 'Produtor 1',
      email: 'p1@ibiapaba.com',
      telefone: '111',
    });

    const cliente2 = Cliente.create({
      nome: 'Produtor 2',
      email: 'p2@ibiapaba.com',
      telefone: '222',
    });

    await clientesRepository.create(cliente1);
    await clientesRepository.create(cliente2);

    const clientes = await useCase.execute();

    expect(clientes).toHaveLength(2);
    expect(clientes[0].nome).toBe('Produtor 1');
    expect(clientes[1].nome).toBe('Produtor 2');
  });
});
