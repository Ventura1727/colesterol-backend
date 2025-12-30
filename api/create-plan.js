import mercadopago from "mercadopago";

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { name, amount, currency, frequency } = req.body;

  try {
    const plan = await mercadopago.preapproval.createPlan({
      back_url: "https://www.seusite.com.br",
      reason: name,
      auto_recurring: {
        frequency: frequency || 1,
        frequency_type: "months",
        transaction_amount: amount,
        currency_id: currency || "BRL",
        start_date: new Date().toISOString(),
      },
    });

    return res.status(200).json(plan.response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
