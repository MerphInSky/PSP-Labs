import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { FileService } from 'src/file.service';
import { Character } from './entities/character.entity';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService,
    {
      provide: FileService,
      useFactory: () => new FileService<Character[]>('assets/characters.json')
    },
  ],
})
export class CharactersModule {}
