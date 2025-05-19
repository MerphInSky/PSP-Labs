import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { FileService } from 'src/file.service';
export declare class CharactersService {
    private fileService;
    constructor(fileService: FileService<Character[]>);
    create(createCharacterDto: CreateCharacterDto): void;
    findAll(title?: string): Character[];
    findOne(id: number): Character | null;
    update(id: number, updateCharacterDto: UpdateCharacterDto): void;
    remove(id: number): void;
}
