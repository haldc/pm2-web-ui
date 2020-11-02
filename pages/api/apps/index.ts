import { IApiRequest, IApiResponse } from '../../../server/api';
import { pm2, method, combine } from '../../../server/middlewares';
import { getList } from '../../../server/pm2';

const list = async (req: IApiRequest, res: IApiResponse) => {
  const list = await getList();
  const apps = list;
  
  res.status(200).json({ apps });
};

export default combine(method('GET'), pm2, list);