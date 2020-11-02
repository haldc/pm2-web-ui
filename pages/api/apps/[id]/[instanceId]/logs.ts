import { IApiRequest, IApiResponse } from '../../../../../server/api';
import { getLogs } from '../../../../../server/pm2';
import { method, combine, RequestError } from '../../../../../server/middlewares';

const onRequest = async (req: IApiRequest, res: IApiResponse) => {
  const { query} = req;
  const { id, instanceId } = query;

  const { app, output, error } = await getLogs(instanceId);

  if (app.name != id) {
    throw new RequestError('Application name and pm2 identifier mismatch.');
  }

  res.status(200).json({ output, error });
};

export default combine(method('GET'), onRequest);