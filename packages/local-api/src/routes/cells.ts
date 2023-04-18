import { Router, json } from 'express';
import fs from 'fs/promises';
import path from 'path';

type Cell = {
  id: string;
  content: string;
  code: 'text' | 'code';
};

const isNodeError = (
  error: Error | NodeJS.ErrnoException
): error is NodeJS.ErrnoException => {
  return (error as NodeJS.ErrnoException).code !== undefined;
};

const creatCellsRoute = (filename: string, dir: string) => {
  const router = Router();
  router.use(json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.status(200).send(JSON.parse(result));
    } catch (error) {
      if (error instanceof Error && isNodeError(error)) {
        if (error.code === 'ENOENT') {
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.status(200).send([]);
        } else {
          throw error;
        }
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.status(200).send();
  });

  return router;
};

export default creatCellsRoute;
