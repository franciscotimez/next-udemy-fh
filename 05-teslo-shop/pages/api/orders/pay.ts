import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | { message: string; };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const tokenB64 = Buffer.from(`${CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${tokenB64}`,
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      });
    return data.access_token;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    else {
      console.log(error);
    }
    return null;
  }
  // PAYPAL_ORDERS_URL
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<{ message: string; }>) => {

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    console.log("No se pudo confirmar el token.");
    return res.status(500).json({ message: 'Internal Server error.' });
  }

  return res.status(200).json({ message: 'Orden pagada!' });
};
