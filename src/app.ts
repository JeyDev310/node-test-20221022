import express from 'express';
// import https from 'https';
// import fs from 'fs';
import cors from "cors";
import parseurl from 'parseurl';
import session from 'express-session';

import articleRouter from './routes/article.route';

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  const reqSession: any = req.session;
  if (!reqSession?.views) {
    reqSession.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  reqSession.views[pathname] = (reqSession.views[pathname] || 0) + 1

  next()
})

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// enabling cors for all requests by using cors middleware
app.use(cors());

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
  res.status(200).json({success: true}).end();
});

export default app;
