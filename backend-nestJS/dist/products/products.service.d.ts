import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService implements OnModuleInit {
    private readonly productRepository;
    private readonly logger;
    constructor(productRepository: Repository<Product>);
    onModuleInit(): Promise<void>;
    seedProducts(): Promise<void>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product | null>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: string, updateProductDto: Partial<CreateProductDto>): Promise<Product | null>;
    remove(id: string): Promise<void>;
}
