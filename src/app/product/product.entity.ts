import { BaseEntity, Documentation } from '@smoke-trees/postgres-backend'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserType } from '../users/IUser'
import { IProduct, PriceObj } from './IProduct'

@Entity({ name: 'product' })
@Documentation.addSchema({ type: 'object' })
export class Product extends BaseEntity implements IProduct {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column('varchar', { name: 'name' })
	@Documentation.addField({ type: 'string' })
	name!: string

	@Column('varchar', { name: 'desc', nullable: true })
	@Documentation.addField({ type: 'string' })
	desc?: string

	@Column('varchar', { name: 'created_by' })
	@Documentation.addField({ type: 'string' })
	createdBy!: string

	@Column('enum', { name: 'created_by_type', enum: UserType })
	@Documentation.addField({ type: 'string', enum: Object.values(UserType) })
	createdByType!: UserType

	@Column('boolean', { name: 'is_published' })
	@Documentation.addField({ type: 'boolean' })
	isPublished!: boolean

	@Column('varchar', { name: 'github_url', nullable: true })
	@Documentation.addField({ type: 'string' })
	githubUrl?: string

	@Column('varchar', { name: 'youtube_url', nullable: true })
	@Documentation.addField({ type: 'string' })
	youtubeUrl?: string

	@Column('varchar', { name: 'file_url', nullable: true })
	@Documentation.addField({ type: 'string' })
	fileUrl?: string

	@Column('varchar', { name: 'demo_url', nullable: true })
	@Documentation.addField({ type: 'string' })
	demoUrl?: string

	@Column('varchar', { name: 'instructions', nullable: true })
	@Documentation.addField({ type: 'string' })
	instructions?: string

	@Column('varchar', { name: 'image_url', nullable: true })
	@Documentation.addField({ type: 'string' })
	imageUrl?: string

	@Column({ name: 'price', type: 'json', default: [] })
	@Documentation.addField({ type: 'array' })
	price?: PriceObj[]

	@Column('varchar', { name: 'category_tag_id', nullable: true })
	@Documentation.addField({ type: 'string' })
	categoryTagId?: string

	constructor(it?: IProduct) {
		super(it)
		if (it) {
			if (it.id) {
				this.id = it.id
			}
			this.name = it.name
			this.desc = it.desc
			this.createdBy = it.createdBy
			this.createdByType = it.createdByType
			this.isPublished = it.isPublished
			this.githubUrl = it.githubUrl
			this.youtubeUrl = it.youtubeUrl
			this.fileUrl = it.fileUrl
			this.demoUrl = it.demoUrl
			this.instructions = it.instructions
			this.imageUrl = it.imageUrl
			this.price = it.price
			this.categoryTagId = it.categoryTagId
		}
	}
}
