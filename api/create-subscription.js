import mercadopago from "mercadopago";

// Configura o token do Mercado Pago
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { plan_id, payer_email } = req.body;

    if (!plan_id || !payer_email) {
      return res.status(400).json({ error: "plan_id and payer_email are required" });
    }

    const subscriptionData = {
      plan_id,
      payer_email,
      start_date: new Date().toISOString()
    };

    const subscription = await mercadopago.preapproval.create(subscriptionData);
    res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
