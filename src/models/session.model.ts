import * as Sequelize from 'sequelize';

import sequelize from "../constants/db.init";

export interface SessionAddModel {
  sessionId: string
  selectedArticleId: string
};

export interface SessionModel extends Sequelize.Model<SessionModel, SessionAddModel> {
  id: number
  sessionId: string
  selectedArticleId: string
  createdAt: string
  updatedAt: string
};

export interface SessionViewModel {
  sessionId: string
  selectedArticleId: string
};

export const Session = sequelize.define('session', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sessionId: Sequelize.STRING,
  selectedArticleId: Sequelize.STRING
});
