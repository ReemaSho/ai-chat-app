import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class Chat extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;
}
