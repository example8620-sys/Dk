
import { GoogleGenAI } from "@google/genai";
import { Student, Fee } from "../types";

export const getAIInsights = async (students: Student[], fees: Fee[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const studentSummary = students.map(s => `${s.name} (${s.class_code})`).join(', ');
  const totalFees = fees.reduce((acc, curr) => acc + curr.amount, 0);
  const paymentModes = fees.reduce((acc: Record<string, number>, curr) => {
    acc[curr.payment_mode] = (acc[curr.payment_mode] || 0) + 1;
    return acc;
  }, {});

  const prompt = `
    You are an AI ERP Analyst for SMT-ERP. 
    Current Data Overview:
    - Total Students: ${students.length}
    - Student List: ${studentSummary}
    - Total Fees Collected: ₹${totalFees}
    - Payment Mode Distribution: ${JSON.stringify(paymentModes)}
    
    Please provide:
    1. A brief summary of the school's growth and financial status based on this data.
    2. Recommendations for improving fee collection or student engagement.
    3. A highlight of any trends you see.
    
    Keep the tone professional and the response concise. Format using Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please ensure API key is valid.";
  }
};
