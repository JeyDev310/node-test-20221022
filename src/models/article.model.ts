import * as Sequelize from 'sequelize';

import sequelize from "../constants/db.init";

export interface Resolution {
  url: string
  width: number
  height: number
};

export interface ArticleAddModel {
  thumbnail: string
  score: number
  title: string
  author: string
  url: string
  num_comments: number
  resolution: Resolution
};

export interface ArticleModel extends Sequelize.Model {
  id: string
  thumbnail: string
  score: number
  title: string
  author: string
  url: string
  numComments: number
  resolution: Resolution
  createdAt: string
  updatedAt: string
};

export interface ArticleViewModel {
  id: string
  thumbnail: string
  score: number
  title: string
  author: string
  url: string
  num_comments: number
  resolution: Resolution
};

export const Article = sequelize.define('article', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  thumbnail: Sequelize.STRING,
  score: Sequelize.INTEGER,
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  url: Sequelize.STRING,
  num_comments: Sequelize.INTEGER,
  resolution: Sequelize.JSON
});
