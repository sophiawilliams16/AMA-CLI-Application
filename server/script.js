// dependencies
require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const inquirer = require("inquirer");

// not required for script to run, but used to format the output
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");

// Create and store a wrapper for the OpenAI package 
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: "gpt-3.5-turbo",
});

// define a schema for the output
// const parser = StructuredOutputParser.fromNamesAndDescriptions({
//     response: "Python code that answers the user's question",
//     explanation: "detailed explanation of the example code provided",
// });

// hold value of getFormatInstructions() to pass instructions to our template for how we want the final response to be structured
//const formatInstructions = parser.getFormatInstructions();

// Pass in prompts 
const promptFunc = async (input) => {
    try {
        const messages = [
            {
                role: "system",
                content: "you are a helpful assistant",
            },
            {
                role: "user",
                content: "hello!",
            },
        ];

        // Define parameters for each question asked using template
        const prompt = new PromptTemplate({
            template: "You are a helpful assistant.{question}",
            inputVariables: ["question"],
            // partialVariables: { format_instructions: formatInstructions },
        });

        // Format prompt with user input
        const promptInput = await prompt.format({
            question: input,
        });

        // Ensure promptInput is a string
        const promptString = Array.isArray(promptInput)
            ? promptInput.join("\n")
            : promptInput;

        // Call the model with formatted prompt
        const response = await model.call(promptString);
        //const responseData = await parser.parse(res);

        // Extract content from choices in the response
        // const assistantResponse =
        //     responseData.choices[0]?.message?.content || "";

        return response;

    } catch (err) {
        console.error(err);
        return { error: 'Error processing request'}
    }
}

module.exports = promptFunc;
