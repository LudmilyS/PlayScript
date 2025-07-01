import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProdutoController } from './controllers/produto.controller';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './services/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule], //add o categoria module para que possamos acessar a classe
  providers: [ProdutoService], //add a service
  controllers: [ProdutoController], //add a controller
  exports: [],
})
export class ProdutoModule { }
