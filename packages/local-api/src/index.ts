import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import creatCellsRoute from './routes/cells';

const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    const packagePath = require.resolve('local-client/dist/index.html');
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(creatCellsRoute(filename, dir));

  app
    .listen(port, () => {
      console.log(`${filename} is served on http://localhost:${port}`);
    })
    .on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${port} is in use. Try running on a different port.`
        );
      } else {
        console.error(err.message);
      }
    });
};

export default serve;
