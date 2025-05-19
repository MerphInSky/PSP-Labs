"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let CharactersService = class CharactersService {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createCharacterDto) {
        const characters = this.fileService.read();
        const character = { ...createCharacterDto, id: characters.length + 1 };
        this.fileService.add(character);
    }
    findAll(title) {
        const characters = this.fileService.read();
        return title ?
            characters.filter(sem => sem.title.toLowerCase().includes(title.toLowerCase())) :
            characters;
    }
    findOne(id) {
        const characters = this.fileService.read();
        return characters.find(sem => sem.id == id) ?? null;
    }
    update(id, updateCharacterDto) {
        const characters = this.fileService.read();
        const updatedCharacters = characters.map(sem => sem.id == id ? { ...sem, ...updateCharacterDto } : sem);
        this.fileService.write(updatedCharacters);
    }
    remove(id) {
        const characters = this.fileService.read();
        const updatedCharacters = characters.filter(sem => sem.id != id);
        this.fileService.write(updatedCharacters);
    }
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], CharactersService);
//# sourceMappingURL=characters.service.js.map