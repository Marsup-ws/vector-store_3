import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  img: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  origin: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  originLabel: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  originBadgeColor: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  categoryLabel: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type: string;
}
