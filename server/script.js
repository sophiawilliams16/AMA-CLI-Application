// dependencies
require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const inquirer = require("inquirer");


const { PromptTemplate } = require("langchain/prompts");
//const { StructuredOutputParser } = require("langchain/output_parsers");

// Create and store a wrapper for the OpenAI package 
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: "gpt-3.5-turbo",
});

// Pass in prompts 
const promptFunc = async (messages) => {
    console.log(messages)
    try {
        if (!Array.isArray(messages)) {
            throw new Error("Invalid messages format");
        }
            
        const promptInput = messages.map((msg) => msg.content).join("\n");

        console.log(promptInput);
        
        const response = await model.call(promptInput);

        return response;

    } catch (err) {
        //console.error(err);
        return { error: 'Error processing request'}
    }
}

module.exports = promptFunc;
