import { IApiRequest, IApiResponse } from '../../../../server/api';
import { pm2 , method, combine, RequestError } from '../../../../server/middlewares';
import { getApp, stopApp, deleteApp, reloadApp, restartApp } from '../../../../server/pm2';
import { AppAction } from '../../../../shared/actions';

const onGet = async (req: IApiRequest, res: IApiResponse) => {
  const { query } = req;
  const { id } = query;

  const app = await getApp(id);

  if (!app) {
    throw new RequestError('This application does not exist.', 404);
  }

  res.status(200).json({ app });
};

const actions = {
  [AppAction.DELETE]: { fn: deleteApp},
  [AppAction.STOP]: { fn: stopApp },
  [AppAction.RELOAD]: { fn: reloadApp},
  [AppAction.RESTART]: { fn: restartApp },
  [AppAction.START]: { fn: restartApp },
};

const onPost = async (req: IApiRequest, res: IApiResponse) => {
  const { query } = req;
  const { action } = req.body;
  const { id } = query;

  const { fn, right } = actions[action];


  try {
    await fn(id);
    res.status(200).json({});
  }
  catch (err) {
    throw new RequestError(err.message ?? err.toString());
  }
};

const onRequest = (req: IApiRequest, res: IApiResponse) => req.method === 'GET' ? onGet(req, res) : onPost(req, res);

export default combine(method('GET', 'POST'), pm2, onRequest);