import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.send({ hi: 'there' });
});

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(dependencies: string[], callback?: (updatedDependencies: ModuleId[]) => void): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

const PORT: number = parseInt(process.env.PORT as string, 10);

const server = app.listen(PORT);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
