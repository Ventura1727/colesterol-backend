import mercadopago from "mercadopago";

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { plan_id, payer_email } = req.body;

  try {
    const subscription = await mercadopago.preapproval.createSubscription({
      preapproval_plan_id: plan_id,
      payer_email: payer_email,
      back_url: "https://www.seusite.com.br",
      reason: "Assinatura Teste",
    });

    return res.status(200).json(subscription.response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
