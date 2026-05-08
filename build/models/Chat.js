var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType } from "sequelize-typescript";
let Chat = class Chat extends Model {
    title;
    userId;
};
__decorate([
    Column({
        type: DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Chat.prototype, "title", void 0);
__decorate([
    Column({
        type: DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Chat.prototype, "userId", void 0);
Chat = __decorate([
    Table
], Chat);
export { Chat };
//# sourceMappingURL=Chat.js.map