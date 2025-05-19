import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { FileService } from 'src/file.service';

@Injectable()
export class CharactersService {
  constructor(private fileService: FileService<Character[]>) {}

  create(createCharacterDto: CreateCharacterDto) {
    const characters = this.fileService.read();

    const character = { ...createCharacterDto, id: characters.length + 1};
    this.fileService.add(character)
  }

  findAll(title?: string): Character[] {
    const characters = this.fileService.read();

    return title ?
      characters.filter(sem =>
        sem.title.toLowerCase().includes(title.toLowerCase())
      ) : 
      characters;
  }

  findOne(id: number): Character | null {
    const characters = this.fileService.read();

    return characters.find(sem => sem.id == id) ?? null;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    const characters = this.fileService.read();

    const updatedCharacters = characters.map(sem =>
      sem.id == id ? { ...sem, ...updateCharacterDto} : sem
    );
    this.fileService.write(updatedCharacters);
  }

  remove(id: number) {
    const characters = this.fileService.read();

    const updatedCharacters = characters.filter(sem =>
      sem.id != id
    );
    this.fileService.write(updatedCharacters);
  }
}
