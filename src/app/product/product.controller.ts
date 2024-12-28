import { Application, Controller, ServiceController} from '@smoke-trees/postgres-backend'
import { RequestHandler } from 'express'
import { ProductService } from './product.service'
import { Product } from './product.entity'

export class ProductController extends ServiceController<Product> {
	public path = '/product'
    protected controllers: Controller[] = []
    protected mw: RequestHandler[] = []
    public service: ProductService
    constructor(app: Application, productService: ProductService) {
        super(app, Product, productService);
        this.service = productService;
        this.controllers = [];
        this.mw = [];
        this.loadDocumentation();
    }
}
