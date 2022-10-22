import express from 'express';
const router = express.Router();

import { Article, ArticleModel, Session, SessionModel } from '../models';

router.get('/', async (req, res) => {
  const list = await Article.findAll({
    order: [
      ['score', 'DESC']
    ],
    limit: 20
  }) as ArticleModel[];

  const filtered = list.map((article: ArticleModel) => {
    return {
      id: article.id,
      thumbnail: article.thumbnail,
      score: article.score,
      title: article.title,
      author: article.author
    }
  });

  const sessionId = req.session.id;
  const session = await Session.findOne({
    where: {sessionId}
  }) as SessionModel;

  let selectedId = '';
  if (session) {
    selectedId = session.selectedArticleId;
  }

  res.status(200).json({
    list: filtered,
    selectedId
  }).end();
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  
  const data = await Article.findOne({
    where: {id: id}
  });

  res.status(200).json(data).end();
});

router.put('/select/:id', async (req, res) => {
  const id = req.params.id;
  
  const sessionId = req.session.id;
  const exist = await Session.findOne({
    where: {sessionId}
  }) as SessionModel;

  if (exist) {
    exist.selectedArticleId = id;
    exist.save();
  } else {
    await Session.create({
      sessionId,
      selectedArticleId: id
    });
  }

  res.status(200).json({success: true}).end();
});

router.put('/unselect', async (req, res) => {
  const sessionId = req.session.id;
  const exist = await Session.findOne({
    where: {sessionId}
  }) as SessionModel;

  if (exist) {
    exist.selectedArticleId = '';
    exist.save();
  }

  res.status(200).json({success: true}).end();
});

export default router;
