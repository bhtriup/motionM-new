import { NextFunction } from 'express';
import { mInfo } from '../common/constant/constant';

const TENANT_HEADER_YKIHO = 'x-ykiho';
const TENANT_HEADER_TYPE = 'x-type';

const MOTION_M_TYPE = '5';

export function tenancyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const xYkiho = req.headers[TENANT_HEADER_YKIHO] as string;
  const xType = req.headers[TENANT_HEADER_TYPE] as string;

  const ykiho = xYkiho?.toString() || null;
  const type = xType?.toString() || MOTION_M_TYPE;

  req['ykiho'] = ykiho;
  req['type'] = type;

  mInfo.ykiho = xYkiho;

  next();
}
