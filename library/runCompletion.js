// async function runCompletion(openai,message, body) {
//     message.reply(
//       `😈😈 *Please wait, while your response is being generated* \n\n *it may take time depending upon your internet speed and length of response.* 😈😈`
//     );
//     try {
//       const completion = await openai.createCompletion({
//         model: "text-davinci-003",
//         max_tokens: 1000,
//         prompt: body,
//       });
  
//       const data = completion.data.choices[0].text;
//       message.reply(
       
//         `❓) ${body}\n\nAns: 👇 Total Length: ${data.length} \n\n${data.slice(2)}`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   module.exports = runCompletion;




  async function runCompletion(openai,message, body) {
    message.reply(
      `😈😈 *Please wait, while your response is being generated* \n\n *it may take time depending upon your internet speed and length of response.* 😈😈`
    );
    try {
      const model = openai.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Hi?"

  const result = await model.generateContent(body);
  const response = await result.response;
  const text = response.text();
      message.reply(
       
        `❓) ${body}\n\nAns: 👇 Total Length: ${text.length} \n\n${text}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = runCompletion;