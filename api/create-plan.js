import mercadopago from "mercadopago";

// Configura o token do Mercado Pago
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const planData = {
      reason: "Assinatura Colesterol Control",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 100,
        currency_id: "BRL",
        start_date: new Date().toISOString()
      },
      back_url: "https://seu-app.vercel.app",
      status: "active"
    };

    const plan = await mercadopago.preapproval.create(planData);
    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
