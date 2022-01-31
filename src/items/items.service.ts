import {Injectable} from '@nestjs/common';
import {Item} from './items.interface';

@Injectable()
export class ItemsService {
    private readonly items: Item[] = [];

    findAll(): Item[] {
        return this.items;
    }

    create(item: Item) {
        this.items.push(item);
    }
}