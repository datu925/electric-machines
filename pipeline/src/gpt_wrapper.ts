import { OpenAI } from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-g8ot2XiVsguBErYxCnBJUaQi",
});

export class GptWrapper {
  model_family: string;

  constructor(model_family: string) {
    this.model_family = model_family;
  }

  generateMessagesGpt(
    text: string,
    system: string,
    examples: [string, string][]
  ): OpenAI.ChatCompletionMessageParam[] {
    const output: OpenAI.ChatCompletionMessageParam[] = [];
    output.push({ role: "system", content: system });
    for (const [user, assistant] of examples) {
      output.push({ role: "user", content: user });
      output.push({ role: "assistant", content: assistant });
    }
    output.push({ role: "user", content: text });

    return output;
  }

  async queryGpt(
    input_text: string,
    system: string,
    examples: [string, string][]
  ): Promise<string> {
    if (input_text.trim().length === 0) {
      throw new TypeError("Input text can't be empty string");
    }
    const messages = this.generateMessagesGpt(input_text, system, examples);

    let model: string = "";
    if (this.model_family == "gpt4") {
      model = "gpt-4-1106-preview";
    } else if (this.model_family == "gpt") {
      model = "gpt-3.5-turbo-0125";
    } else {
      throw new Error(
        `Invalid model_family supplied; must be gpt or gpt4 for GPT models: ${this.model_family}`
      );
    }

    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0.0,
        seed: 0,
      });
      return completion.choices[0].message!.content!;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("This model's maximum context length is") &&
        model !== "gpt-4-1106-preview"
      ) {
        console.log(
          "Retrying request with gpt-4-1106-preview model with larger context window"
        );
        const retry = await openai.chat.completions.create({
          model: "gpt-4-0125-preview",
          messages: messages,
          temperature: 0.0,
          seed: 0,
        });
        return retry.choices[0].message!.content!;
      } else {
        throw error;
      }
    }
  }
}
