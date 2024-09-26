export async function sendContactForm(formData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar el mensaje');
    }

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message || 'Error al enviar el mensaje' };
  }
}