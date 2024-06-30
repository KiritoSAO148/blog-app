import { OpenAI } from "openai";
import CryptoJS from "crypto-js";
import systemModel from "../models/systemModel.js";

const messageController = {
  askAi: async (req, res) => {
    try {
      const messages = [
        {
          role: "system",
          content: `Đây là cuộc trò chuyện về my blog`,
        },
        {
          role: "system",
          content: `Chỉ trả lời câu hỏi liên quan tới blog!`,
        },

        {
          role: "user",
          content: req.body.message,
        },
      ];

      const key = await systemModel.findOne();
      if (!key?.openaiKey) {
        return res.status(200).json({
          fromSelf: false,
          message: "Invalid Open AI key",
        });
      }

      const apiKey = CryptoJS.AES.decrypt(
        key.openaiKey,
        process.env.JWT_SECRET
      ).toString(CryptoJS.enc.Utf8);

      const openai = new OpenAI({ apiKey });

      const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      });

      const aiRes = response.choices;
      return res.status(200).json({
        fromSelf: false,
        message: aiRes[0].message.content,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  getText: async (req, res) => {
    try {
      const messages = [
        {
          role: "system",
          content: "Đây là cuộc trò chuyện về internship",
        },
        {
          role: "user",
          content: req.body.message,
        },
      ];

      const key = await systemModel.findOne();
      if (!key?.openaiKey) {
        return res.status(200).json({
          fromSelf: false,
          message: "Invalid Open AI key",
        });
      }

      const apiKey = CryptoJS.AES.decrypt(
        key.openaiKey,
        process.env.JWT_SECRET
      ).toString(CryptoJS.enc.Utf8);

      const openai = new OpenAI({ apiKey });

      const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
      });

      const aiRes = response.choices;
      return res.status(200).json({
        message: aiRes[0].message.content,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  aiGener: async (req, res) => {
    try {
      const messages = [
        {
          role: "user",
          content: `tạo 1 blog với tiêu đề  ${req.body.title} và thể loại ${req.body.category}`,
        },
      ];

      const key = await systemModel.findOne();
      if (!key?.openaiKey) {
        return res.status(200).json({
          fromSelf: false,
          message: "Invalid Open AI key",
        });
      }

      const apiKey = CryptoJS.AES.decrypt(
        key.openaiKey,
        process.env.JWT_SECRET
      ).toString(CryptoJS.enc.Utf8);

      const openai = new OpenAI({ apiKey });

      const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
        temperature: 0.7,
      });

      const aiRes = response.choices;
      return res.status(200).json(aiRes[0].message.content);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

export default messageController;
