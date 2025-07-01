import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])], //Entity
  providers: [CategoriaService], //Service
  controllers: [CategoriaController], //Controller
  exports: [CategoriaService], //Service
})
export class CategoriaModule { }
