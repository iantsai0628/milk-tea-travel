import { GoogleGenAI, Type } from "@google/genai";
import { AIGuide, AIShortcutResponse } from './types';

export async function getAITravelGuide(location: string, title: string, fromLocation?: string): Promise<AIGuide | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const prompt = fromLocation 
      ? `目前我在「${fromLocation}」，請詳細規劃前往「${location} - ${title}」的詳細交通指南，並提供該景點的深度攻略（故事、必吃、必買）。`
      : `請提供關於「${location} - ${title}」的深度旅遊攻略（故事、必吃、必買與交通建議）。`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "你是一位精通日本與韓國旅遊的頂級專業領隊。請回傳 JSON 格式。交通指南必須極度詳盡：包含如何從上一個景點出發、搭乘什麼線、在哪個月台、哪個出口、預計走多久、票價大概多少。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            story: { type: Type.STRING },
            mustEat: { type: Type.ARRAY, items: { type: Type.STRING } },
            mustBuy: { type: Type.ARRAY, items: { type: Type.STRING } },
            transport: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  mode: { type: Type.STRING },
                  line: { type: Type.STRING },
                  stationStart: { type: Type.STRING },
                  stationEnd: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  details: { type: Type.STRING, description: "包含月台、出口、轉乘細節" }
                },
                required: ["mode", "line", "stationStart", "stationEnd", "duration", "details"]
              }
            }
          },
          required: ["story", "mustEat", "mustBuy", "transport"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as AIGuide;
  } catch (error) {
    console.error("AI Itinerary Error:", error);
    return null;
  }
}

export async function getAIShortcutInfo(type: 'words' | 'emergency' | 'tips', region: string): Promise<AIShortcutResponse | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const prompts = {
      words: `請列出 8 個在${region}旅遊時最必備的道地單字或短句。`,
      emergency: `請列出在${region}遇到緊急狀況時的聯繫電話與求救用的簡單句子。`,
      tips: `請針對${region}目前的旅遊季節與文化，列出 5 個最重要的注意事項（如禮儀、天氣、穿著）。`
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompts[type],
      config: {
        systemInstruction: "你是一位資深旅遊顧問。請回傳 JSON 格式。content 為字串陣列，tips 為一句總結性的溫馨叮嚀。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.ARRAY, items: { type: Type.STRING } },
            tips: { type: Type.STRING }
          },
          required: ["title", "content", "tips"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as AIShortcutResponse;
  } catch (error) {
    console.error("AI Shortcut Error:", error);
    return null;
  }
}