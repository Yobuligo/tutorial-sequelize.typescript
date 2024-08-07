import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  ModelStatic,
} from "sequelize";
import { db } from "../../db/db";
import { IEntityDetails } from "../../shared/core/IEntityDetails";
import { IUser } from "../../shared/outdated/IUser";
import { Board } from "./Board";
import { Vote } from "./Vote";

const user: ModelStatic<Model<IUser, IEntityDetails<IUser>>> = db.define(
  "users",
  {
    password: DataTypes.STRING,
    username: DataTypes.STRING,
  }
);

export class User extends user {
  declare addBoard: BelongsToManyAddAssociationMixin<Board, number>
  declare getBoards: BelongsToManyGetAssociationsMixin<Board>;
  declare getVotes: HasManyGetAssociationsMixin<Vote>;
}

// A m to n relation
//    A board can belong to many users
//    A user can belong to many boards
Board.belongsToMany(User, { through: "usersBoards" });
User.belongsToMany(Board, { through: "usersBoards" });
