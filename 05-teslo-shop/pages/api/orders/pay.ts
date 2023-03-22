import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbOrders } from '../../../database';
import { IOrder, IPaypal } from '../../../interfaces';

type Data =
  | { message: string; }
  | IOrder;

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
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  // todo: validar session del usuario
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    console.log("No se pudo generar el token paypal.");
    return res.status(500).json({ message: 'Internal Server error.' });
  }

  const { transactionId, orderId } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${paypalBearerToken}`
    }
  });

  if (data.status !== "COMPLETED") {
    return res.status(400).json({ message: 'Orden no reconocida.' });
  }

  const dbOrder = await dbOrders.getOrderById(orderId);

  if (!dbOrder) {
    return res.status(400).json({ message: 'Orden no existe.' });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    return res.status(400).json({ message: 'Montos no corresponden.' });
  }

  const dbOrderPaied = await dbOrders.setOrderPaided(orderId, transactionId);

  if(!dbOrderPaied) {
    return res.status(400).json({ message: 'No se pudo procesar el pago consulte al administrador.' });
  }

  return res.status(200).json(dbOrderPaied);
};
