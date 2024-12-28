import { Service } from "@smoke-trees/postgres-backend";
import { CategoryTags } from "./categoryTags.entity";
import { CategoryTagsDao } from "./categoryTags.dao";

export class CategoryTagsService extends Service<CategoryTags>{
    dao: CategoryTagsDao
    constructor(dao: CategoryTagsDao) {
        super(dao);
        this.dao = dao;
    }
}