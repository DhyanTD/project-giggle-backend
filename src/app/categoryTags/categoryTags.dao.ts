import { Dao, Database } from "@smoke-trees/postgres-backend";
import { CategoryTags } from "./categoryTags.entity";


export class CategoryTagsDao extends Dao<CategoryTags> {
    constructor(database: Database) {
        super(database, CategoryTags, "category_tags");
    }
}