import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) //exportando da entity
    private produtoRepository: Repository<Produto>, //chamamos de repository o que interage com o DB
    private categoriaService: CategoriaService,
  ) { }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        //esse é um código SQL
        id,
      },
      relations: {
        categoria: true,
      },
    });

    //O if é para caso não tiver o id que foi digitado
    if (!produto) {
      throw new HttpException('Produto não encontrada', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  async findAllByProduto(nomeProduto: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nomeProduto: ILike(`%${nomeProduto}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    await this.categoriaService.findById(produto.categoria.id);
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.categoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }
}
export { Produto };

