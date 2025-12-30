import mercadopago from "mercadopago";

// Inicializa o SDK com o access token do Mercado Pago
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);

export default async function handler(req, res) {
  try {
    const planData = {
      reason: "Assinatura Colesterol Control",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 50,
        currency_id: "BRL",
        start_date: new Date().toISOString(),
        end_date: null
      },
      back_url: "https://seu-app.com/success",
      status: "active"
    };

    const response = await mercadopago.preapproval.create(planData);
    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
