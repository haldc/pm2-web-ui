import { NextApiRequest, NextApiResponse } from 'next';

export interface IApiRequest extends NextApiRequest {
};

export interface IApiResponse extends NextApiResponse {};