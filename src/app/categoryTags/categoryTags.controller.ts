import { Application, Controller, ServiceController } from "@smoke-trees/postgres-backend";
import { CategoryTags } from "./categoryTags.entity";
import { RequestHandler } from "express";
import { CategoryTagsService } from "./categoryTags.service";

export class CategoryTagsController extends ServiceController<CategoryTags> {
    path = "/categoryTags";
    protected controllers: Controller[] = [];
    protected mw: RequestHandler[] = [];
    public service: CategoryTagsService;
    constructor(app: Application, categoryTagsService: CategoryTagsService) {
        super(app, CategoryTags, categoryTagsService);
        this.service = categoryTagsService;
        this.loadDocumentation();
    }
}