import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'



type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  let { order, tel, communication } = req.body
  if (order.length) {
    order = JSON.parse(order)
    let message = `<i>Заявка!</i>\n`
    message += `телефон для связи:<b>${tel} </b>\n`
    message += `способ связи:<b> ${communication}</b>\n`
    order.forEach((item) => {
      message += `\nартикул товара:<b> ${item.art}</b>\nцена товара:<b> ${item.price}</b>\nколичество товара:<b> ${item.count}</b>\n__________________`
    })
    try{
    const data = await axios.post(`${process.env.NEXT_PUBLIC_TG_URL}`, {
      chat_id: process.env.NEXT_PUBLIC_CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
    if(data.status === 200)
    return res.status(200).json({
      message:
        'Заказ успешно отправлен, в ближайшее время с Вами свяжется наш менеджер. Спасибо, что выбрали нас!',
    })
    } catch (e) {
      return res.status(500).json({ message: `Произошла ошибка на стороне сервера, подробнее в консоли!` })
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Добавьте товар в корзину перед оформлением!' })
  }
  return res.status(200).json({
    message:
      'Заказ успешно отправлен, в ближайшее время с Вами свяжется наш менеджер. Спасибо, что выбрали нас!',
  })
}
