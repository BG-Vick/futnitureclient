import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


const CHAT_ID = '-1001806140703'
const TOKEN = '6526789951:AAGijwufzhK0sZRR1Mc2XfR_2623CBilahk'  
const URI = `https://api.telegram.org/bot${TOKEN}/sendMessage`

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try{
      let { order, phoneNumber, communication } = req.body
      order = JSON.parse(order)
      let message = `<i>Заявка!</i>\n`
      message += `телефон для связи:<b>${phoneNumber} </b>\n`
      message += `способ связи:<b> ${communication}</b>\n`
      order.forEach(item => {
        message += `\nартикул товара:<b> ${item.art}</b>\nцена товара:<b> ${item.price}</b>\nколичество товара:<b> ${item.count}</b>\n__________________`
      }); 
        if(order.length){
        const data = axios.post(URI, {
          chat_id: CHAT_ID,
          parse_mode: 'html',
          text: message
      }) 
       }else{
        return res.status(400).json({message:'Добавьте товар в корзину перед оформлением!'})
       }   
    return res.status(200).json({message:'Заказ успешно отправлен, в ближайшее время с Вами свяжется наш менеджер. Спасибо, что выбрали нас!'})
  }catch(e){
    return res.status(500).json({ message: 'Что-то пошло не так!' })
  }
  
}