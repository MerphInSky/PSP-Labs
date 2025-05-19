import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    create(createCharacterDto: CreateCharacterDto): void;
    findAll(title?: string): Character[];
    findOne(id: string): Character | null;
    update(id: string, updateCharacterDto: UpdateCharacterDto): void;
    remove(id: string): void;
}
