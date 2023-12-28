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
        const parser = StructuredOutputParser.fromNamesAndDescriptions({
            code: "Javascript code that answers the user's question",
            explanation: "detailed explanation of the example code provided",
        });

        // hold value of getFormatInstructions() to pass instructions to our template for how we want the final response to be structured
        const formatInstructions = parser.getFormatInstructions();

// console.log({ model });

// Pass in prompts 
const promptFunc = async (input) => {
    try {
        // Define parameters for each question asked using template 
        const prompt = new PromptTemplate({
            template:
                "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{format_instructions}\n{question}",
            inputVariables: ["question"],
            partialVariables: { format_instructions: formatInstructions }
        });

        // Format prompt with user input
        const promptInput = await prompt.format({
            question: input,
        });
        
        // Call the model with formatted prompt 
        const res = await model.call(input);
        console.log(await parser.parse(res));

        console.log("Response from OpenAI API:", res);

    } catch (err) {
        console.error(err);
    }
}

// Prompt the user 
const init = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Ask a coding question:',
        },
    ]).then((inquirerResponse) => {
        promptFunc(inquirerResponse.name)
    });
};

// Initialize prompt 
init();
