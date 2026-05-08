import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class Message extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string; // "user" | "assistant"

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chatId!: number;
}
