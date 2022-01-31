import {Get, Post, Body, Controller} from '@nestjs/common';
import {ItemsService} from './items.service';
import {Item} from './items.interface';

@Controller('items')

export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll()
    }

    @Post()
    async create(@Body() item: Item) {
        this.itemsService.create(item);
    }
}