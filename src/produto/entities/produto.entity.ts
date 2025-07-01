import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nomeProduto: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @IsNotEmpty()
  @Column({ length: 500, nullable: false })
  descricao: string;

  @IsNotEmpty()
  @Column({ length: 20, nullable: false })
  classificacao: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE', //se deleta um tema todas as postagens vão junto com ele (efeito cascata)
  })
  categoria: Categoria;
}
