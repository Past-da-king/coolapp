TITLE: Node.js Quickstart with Google Gen AI SDK
DESCRIPTION: Demonstrates how to get started with the Google Gen AI SDK in a Node.js environment. It initializes the SDK with an API key and performs a content generation request using the 'gemini-2.0-flash-001' model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_1

LANGUAGE: javascript
CODE:
```
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}
main();
```

----------------------------------------

TITLE: Initialize Google Gen AI SDK with API Key (Gemini Developer API)
DESCRIPTION: This TypeScript code snippet shows how to initialize the Google Gen AI SDK using an API key obtained from Google AI Studio. This method is applicable for both server-side and browser environments, though API key security is paramount for client-side use.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_3

LANGUAGE: TypeScript
CODE:
```
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

----------------------------------------

TITLE: Install Google Gen AI SDK
DESCRIPTION: Command to install the Google Gen AI SDK using npm. Requires Node.js version 18 or later.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_0

LANGUAGE: bash
CODE:
```
npm install @google/genai
```

----------------------------------------

TITLE: APIDOC: GoogleGenAI Class
DESCRIPTION: The main class for interacting with the Google GenAI API, providing access to various API clients for different functionalities like caches, chats, files, models, operations, and tunings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_120

LANGUAGE: APIDOC
CODE:
```
GoogleGenAI:
  constructor(options: GoogleGenAIOptions)
  apiClient: ApiClient (Protected, Readonly)
  authTokens: Tokens (Readonly)
  caches: Caches (Readonly)
  chats: Chats (Readonly)
  files: Files (Readonly)
  live: Live (Readonly)
  models: Models (Readonly)
  operations: Operations (Readonly)
  tunings: Tunings (Readonly)
  vertexai: boolean (Readonly)
```

----------------------------------------

TITLE: API Class: Chat
DESCRIPTION: Manages a conversational chat session, providing methods to send messages and retrieve chat history.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_4

LANGUAGE: APIDOC
CODE:
```
class Chat:
  constructor(apiClient: ApiClient, modelsModule: Models, model: string, config?: types.GenerateContentConfig, history?: types.Content[])
  getHistory(curated?: boolean): types.Content[]
  sendMessage(params: types.SendMessageParameters): Promise<types.GenerateContentResponse>
  sendMessageStream(params: types.SendMessageParameters): Promise<AsyncGenerator<types.GenerateContentResponse>>
```

----------------------------------------

TITLE: JavaScript: Send Message with Chat Class
DESCRIPTION: Demonstrates how to create a `Chat` instance for a specific model (`gemini-2.0-flash`) and send a text message. The example then logs the text content of the model's response.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_4

LANGUAGE: JavaScript
CODE:
```
const chat = ai.chats.create({model: 'gemini-2.0-flash'});const response = await chat.sendMessage({  message: 'Why is the sky blue?'});console.log(response.text);
```

----------------------------------------

TITLE: Web Quickstart with Google Gen AI SDK
DESCRIPTION: An example of using the Google Gen AI SDK directly in a web browser via a CDN. It demonstrates initializing the SDK and performing a content generation request. Caution: Avoid exposing API keys in client-side code in production.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_2

LANGUAGE: html
CODE:
```
<!DOCTYPE html><html lang="en">  <head>    <meta charset="UTF-8" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <title>Using My Package</title>  </head>  <body>    <script type="module">
      import {GoogleGenAI} from 'https://cdn.jsdelivr.net/npm/@google/genai@latest/+esm'
          const ai = new GoogleGenAI({apiKey:"GEMINI_API_KEY"});
          async function main() {
            const response = await ai.models.generateContent({
              model: 'gemini-2.0-flash-001',
              contents: 'Why is the sky blue?',
            });
            console.log(response.text);
          }
          main();    </script>  </body></html>
```

----------------------------------------

TITLE: JavaScript Example: Streaming Responses with sendMessageStream
DESCRIPTION: Demonstrates how to use the `sendMessageStream` method to send a message to a Gemini model and iterate through the streamed content chunks, logging each part to the console. This example showcases asynchronous iteration over the generated content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_6

LANGUAGE: JavaScript
CODE:
```
const chat = ai.chats.create({model: 'gemini-2.0-flash'});
const response = await chat.sendMessageStream({  message: 'Why is the sky blue?'});
for await (const chunk of response) {  console.log(chunk.text);}
```

----------------------------------------

TITLE: Install Google Gen AI SDK via npm
DESCRIPTION: This command installs the Google Gen AI SDK package using npm, making it available for use in your TypeScript and JavaScript projects. It's the standard way to add the SDK to your development environment.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_1

LANGUAGE: Shell
CODE:
```
npm install @google/genai
```

----------------------------------------

TITLE: Authenticate Google Cloud CLI for Application Default Credentials
DESCRIPTION: This command authenticates the Google Cloud CLI to create local application default credentials for your user account. This is a crucial prerequisite for Vertex AI users to configure authentication for their Google Cloud project.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_0

LANGUAGE: Shell
CODE:
```
gcloud auth application-default login
```

----------------------------------------

TITLE: Implement Function Calling with GoogleGenAI in TypeScript
DESCRIPTION: Illustrates the four-step process for enabling Gemini models to interact with external systems via function calls. This includes declaring functions, calling `generateContent` with tool configuration, executing the function, and sending the response back to the model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_12

LANGUAGE: typescript
CODE:
```
import {GoogleGenAI, FunctionCallingConfigMode, FunctionDeclaration, Type} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  const controlLightDeclaration: FunctionDeclaration = {
    name: 'controlLight',
    parameters: {
      type: Type.OBJECT,
      description:
          'Set the brightness and color temperature of a room light.',
      properties: {
        brightness: {
          type: Type.NUMBER,
          description:
              'Light level from 0 to 100. Zero is off and 100 is full brightness.',
        },
        colorTemperature: {
          type: Type.STRING,
          description:
              'Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.',
        },
      },
      required: ['brightness', 'colorTemperature'],
    },
  };

  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      toolConfig: {
        functionCallingConfig: {
          // Force it to call any function
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        }
      },
      tools: [{functionDeclarations: [controlLightDeclaration]}]
    }
  });

  console.log(response.functionCalls);
}

main();
```

----------------------------------------

TITLE: APIDOC: GoogleGenAIOptions Interface
DESCRIPTION: Defines the configuration options for initializing the GoogleGenAI client, including API key, version, authentication options, and location settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_121

LANGUAGE: APIDOC
CODE:
```
GoogleGenAIOptions:
  apiKey?: string (Optional)
  apiVersion?: string (Optional)
  googleAuthOptions?: GoogleAuthOptions (Optional)
  httpOptions?: HttpOptions (Optional)
  location?: string (Optional)
  project?: string (Optional)
  vertexai?: boolean (Optional)
```

----------------------------------------

TITLE: Implement Function Calling with Gemini Models
DESCRIPTION: This snippet demonstrates how to enable function calling with Gemini models, allowing the model to interact with external systems. It involves declaring a function, calling `generateContent` with tool configuration, executing the returned function call, and sending the result back to the model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_7

LANGUAGE: JavaScript
CODE:
```
import {GoogleGenAI, FunctionCallingConfigMode, FunctionDeclaration, Type} from '@google/genai';const GEMINI_API_KEY = process.env.GEMINI_API_KEY;async function main() {  const controlLightDeclaration: FunctionDeclaration = {
    name: 'controlLight',
    parameters: {
      type: Type.OBJECT,
      description: 'Set the brightness and color temperature of a room light.',
      properties: {
        brightness: {
          type: Type.NUMBER,
          description:              'Light level from 0 to 100. Zero is off and 100 is full brightness.',
        },
        colorTemperature: {
          type: Type.STRING,
          description:              'Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.',
        },
      },
      required: ['brightness', 'colorTemperature'],
    },
  };
  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      toolConfig: {
        functionCallingConfig: {
          // Force it to call any function
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        }
      },
      tools: [{functionDeclarations: [controlLightDeclaration]}]
    }
  });
  console.log(response.functionCalls);}main();
```

----------------------------------------

TITLE: APIDOC: GenerationConfig Interface
DESCRIPTION: Provides comprehensive configuration options for text and media generation, covering aspects like candidate count, token limits, penalties, response formats, routing, and safety settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_105

LANGUAGE: APIDOC
CODE:
```
GenerationConfig:
  audioTimestamp?: boolean (Optional)
  candidateCount?: number (Optional)
  frequencyPenalty?: number (Optional)
  logprobs?: number (Optional)
  maxOutputTokens?: number (Optional)
  mediaResolution?: MediaResolution (Optional)
  modelSelectionConfig?: ModelSelectionConfig (Optional)
  presencePenalty?: number (Optional)
  responseLogprobs?: boolean (Optional)
  responseMimeType?: string (Optional)
  responseModalities?: Modality[] (Optional)
  responseSchema?: Schema (Optional)
  routingConfig?: GenerationConfigRoutingConfig (Optional)
  seed?: number (Optional)
  speechConfig?: SpeechConfig (Optional)
  stopSequences?: string[] (Optional)
  temperature?: number (Optional)
  thinkingConfig?: GenerationConfigThinkingConfig (Optional)
  topK?: number (Optional)
  topP?: number (Optional)
```

----------------------------------------

TITLE: temperature Parameter
DESCRIPTION: Value that controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_22

LANGUAGE: TypeScript
CODE:
```
temperature?: number
```

----------------------------------------

TITLE: Quickstart: Generate Content with Google Gen AI SDK (API Key)
DESCRIPTION: This TypeScript example demonstrates a quick start to using the Google Gen AI SDK. It initializes the SDK with an API key, sends a simple text prompt to the 'gemini-2.0-flash-001' model, and logs the generated response. This setup is suitable for server-side applications.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_2

LANGUAGE: TypeScript
CODE:
```
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
```

----------------------------------------

TITLE: Upload File to Gemini API using Google GenAI JavaScript Client
DESCRIPTION: Shows how to upload a file asynchronously to the Gemini API using `ai.files.upload`. The example specifies a file path and explicitly sets the `mimeType` in the configuration. This method supports file paths (Node.js) or Blob objects (Node.js/Browser) as input sources.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/files.Files.html#_snippet_3

LANGUAGE: typescript
CODE:
```
const file = await ai.files.upload({file: 'file.txt', config: {
  mimeType: 'text/plain',
}});
console.log(file.name);
```

----------------------------------------

TITLE: API Reference: generateContent Method
DESCRIPTION: This method makes an API request to generate content using a specified model. It supports various model ID formats for both Vertex AI and Gemini APIs, including full resource names, partial resource names, and simple model IDs. It returns a Promise resolving to a GenerateContentResponse.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_4

LANGUAGE: APIDOC
CODE:
```
generateContent(params: GenerateContentParameters): Promise<GenerateContentResponse>

Description: Makes an API request to generate content with a given model.

Parameters:
  params: GenerateContentParameters
    Description: The parameters for generating content.

Returns: Promise<GenerateContentResponse>
  Description: The response from generating content.

Model Parameter Formats (Vertex AI API):
  - Gemini model ID: 'gemini-2.0-flash'
  - Full resource name: 'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'
  - Partial resource name with 'publishers/': 'publishers/google/models/gemini-2.0-flash' or 'publishers/meta/models/llama-3.1-405b-instruct-maas'
  - '/' separated publisher and model name: 'google/gemini-2.0-flash' or 'meta/llama-3.1-405b-instruct-maas'

Model Parameter Formats (Gemini API):
  - Gemini model ID: 'gemini-2.0-flash'
  - Model name starts with 'models/': 'models/gemini-2.0-flash'
  - Tuned models: 'tunedModels/1234567890123456789'
```

LANGUAGE: typescript
CODE:
```
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'why is the sky blue?',
  config: {
    candidateCount: 2,
  }
});
console.log(response);
```

----------------------------------------

TITLE: Stream Content Generation with GoogleGenAI in TypeScript
DESCRIPTION: Shows how to use the `generateContentStream` method for real-time, chunked responses from the model. This approach improves responsiveness by yielding content as it's generated, suitable for interactive applications.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_11

LANGUAGE: typescript
CODE:
```
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: 'Write a 100-word poem.',
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
```

----------------------------------------

TITLE: Initialize GoogleGenAI for Vertex AI
DESCRIPTION: This snippet demonstrates how to initialize the GoogleGenAI client to connect to Vertex AI. It requires specifying `vertexai: true`, along with your Google Cloud `project` ID and `location`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_4

LANGUAGE: JavaScript
CODE:
```
import { GoogleGenAI } from '@google/genai';const ai = new GoogleGenAI({
    vertexai: true,
    project: 'your_project',
    location: 'your_location',
});
```

----------------------------------------

TITLE: API Reference: generateContentStream Method
DESCRIPTION: This method makes an API request to generate content with a specified model and yields the response in chunks as an asynchronous generator. It supports various model ID formats for both Vertex AI and Gemini APIs, similar to `generateContent`. It returns a Promise resolving to an AsyncGenerator of GenerateContentResponse chunks.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_5

LANGUAGE: APIDOC
CODE:
```
generateContentStream(params: GenerateContentParameters): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>

Description: Makes an API request to generate content with a given model and yields the response in chunks.

Parameters:
  params: GenerateContentParameters
    Description: The parameters for generating content with streaming response.

Returns: Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
  Description: The response from generating content.

Model Parameter Formats (Vertex AI API):
  - Gemini model ID: 'gemini-2.0-flash'
  - Full resource name: 'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'
  - Partial resource name with 'publishers/': 'publishers/google/models/gemini-2.0-flash' or 'publishers/meta/models/llama-3.1-405b-instruct-maas'
  - '/' separated publisher and model name: 'google/gemini-2.0-flash' or 'meta/llama-3.1-405b-instruct-maas'

Model Parameter Formats (Gemini API):
  - Gemini model ID: 'gemini-2.0-flash'
  - Model name starts with 'models/': 'models/gemini-2.0-flash'
  - Tuned models: 'tunedModels/1234567890123456789'
```

LANGUAGE: typescript
CODE:
```
const response = await ai.models.generateContentStream({
  model: 'gemini-2.0-flash',
  contents: 'why is the sky blue?',
  config: {
    maxOutputTokens: 200,
  }
});
for await (const chunk of response) {
  console.log(chunk);
}
```

----------------------------------------

TITLE: Set up AudioWorklet for Real-time Audio Processing and Streaming
DESCRIPTION: This JavaScript code sets up an `AudioWorklet` to capture and process audio data in real-time. It creates a Blob from the worklet code, adds it as a module to the `AudioContext`, and then establishes an `AudioWorkletNode` to receive processed audio buffers. These buffers are converted to Base64 strings and emitted via a socket for real-time input, enabling continuous audio streaming.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_9

LANGUAGE: JavaScript
CODE:
```
AudioRecordingWorklet})`
],
{
  type: "application/javascript"
},
);
const src = URL.createObjectURL(script);
await audioContext.audioWorklet.addModule(src);
const recordingWorklet = new AudioWorkletNode(audioContext, workletName);
recordingWorklet.port.onmessage = (ev) => {
  // worklet processes recording floats and messages converted buffer
  const arrayBuffer = ev.data.data.int16arrayBuffer;
  if (arrayBuffer) {
    const arrayBufferString = arrayBufferToBase64(arrayBuffer);
    socket.emit("realtimeInput", arrayBufferString);
  }
};
source.connect(recordingWorklet);
});
}
```

----------------------------------------

TITLE: Configure Environment Variables for Vertex AI (Node.js)
DESCRIPTION: These Bash commands set environment variables (`GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`) required for the Google Gen AI SDK to connect to the Gemini API on Vertex AI in Node.js environments. This enables automatic configuration without hardcoding values.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_6

LANGUAGE: Bash
CODE:
```
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT='your-project-id'
export GOOGLE_CLOUD_LOCATION='us-central1'
```

----------------------------------------

TITLE: Initialize Google Gen AI SDK for Vertex AI
DESCRIPTION: This TypeScript example demonstrates how to initialize the Google Gen AI SDK to connect with the Gemini API on Vertex AI. It requires specifying `vertexai: true`, along with your Google Cloud project ID and location, ensuring proper routing to Vertex AI services.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_4

LANGUAGE: TypeScript
CODE:
```
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'your_project',
    location: 'your_location',
});
```

----------------------------------------

TITLE: Initialize Google Gen AI SDK using Environment Variables (Node.js)
DESCRIPTION: This TypeScript code demonstrates initializing the Google Gen AI SDK without explicit parameters. It relies on previously configured environment variables (either `GOOGLE_API_KEY` or Vertex AI specific variables) to establish the connection in Node.js environments, promoting cleaner code.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_7

LANGUAGE: TypeScript
CODE:
```
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI();
```

----------------------------------------

TITLE: FunctionCallingConfig Interface
DESCRIPTION: Configuration for how the model should handle function calls. This allows specifying which functions are allowed or the overall mode of function calling.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_86

LANGUAGE: TypeScript
CODE:
```
export interface FunctionCallingConfig {
    allowedFunctionNames?: string[];
    mode?: FunctionCallingConfigMode;
}
```

LANGUAGE: APIDOC
CODE:
```
interface FunctionCallingConfig:
  allowedFunctionNames?: string[] - Optional list of function names that the model is allowed to call.
  mode?: FunctionCallingConfigMode - Optional mode for function calling (e.g., ANY, AUTO, NONE).
```

----------------------------------------

TITLE: LiveServerToolCall Interface Definition
DESCRIPTION: API documentation for the LiveServerToolCall interface, which defines the structure for requests to execute function calls on the client side and return their results. It includes details on its optional functionCalls property.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveServerToolCall.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveServerToolCall:
  description: Request for the client to execute the `function_calls` and return the responses with the matching `id`s.
  properties:
    functionCalls?: FunctionCall[]
      description: The function call to be executed.
```

----------------------------------------

TITLE: seed Parameter
DESCRIPTION: When `seed` is fixed to a specific number, the model makes a best effort to provide the same response for repeated requests. By default, a random number is used.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_18

LANGUAGE: TypeScript
CODE:
```
seed?: number
```

----------------------------------------

TITLE: Initialize Google Gen AI SDK
DESCRIPTION: Initializes the Google Gen AI SDK using an API key. This code is applicable for both server-side Node.js applications and client-side browser environments, though API key security is critical for client-side use.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_3

LANGUAGE: javascript
CODE:
```
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

----------------------------------------

TITLE: Count Tokens with @google/genai
DESCRIPTION: Illustrates how to use the `countTokens` method of the `Models` class to count the number of tokens in a given text. This method supports multimodal input for Gemini models.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_2

LANGUAGE: javascript
CODE:
```
const response = await ai.models.countTokens({ model: 'gemini-2.0-flash', contents: 'The quick brown fox jumps over the lazy dog.'});console.log(response);
```

----------------------------------------

TITLE: JavaScript Example: Iterating Through Paged API Results
DESCRIPTION: An example demonstrating how to use the `Pager` class's `hasNextPage()` and `nextPage()` methods to efficiently retrieve and process all items across multiple pages from an API, such as listing files.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/pagers.Pager.html#_snippet_4

LANGUAGE: JavaScript
CODE:
```
const pager = await ai.files.list({config: {pageSize: 10}});
let page = pager.page;
while (true) {  for (const file of page) {    console.log(file.name);  }  if (!pager.hasNextPage()) {    break;  }  page = await pager.nextPage();}
```

----------------------------------------

TITLE: API Interface: GenerateImagesConfig
DESCRIPTION: Defines the configuration options for generating images, including settings for watermarks, aspect ratio, prompt enhancement, and safety filters. This interface is part of the @google/genai library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateImagesConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface GenerateImagesConfig
  Description: The config for generating images.

  interface GenerateImagesConfig {
    addWatermark?: boolean;
    aspectRatio?: string;
    enhancePrompt?: boolean;
    guidanceScale?: number;
    httpOptions?: HttpOptions;
    includeRaiReason?: boolean;
    includeSafetyAttributes?: boolean;
    language?: ImagePromptLanguage;
    negativePrompt?: string;
    numberOfImages?: number;
    outputCompressionQuality?: number;
    outputGcsUri?: string;
    outputMimeType?: string;
    personGeneration?: PersonGeneration;
    safetyFilterLevel?: SafetyFilterLevel;
    seed?: number;
  }

  Properties:
    addWatermark?: boolean
      Description: Whether to add a watermark to the generated images.
      Defined in: types.ts:1378

    aspectRatio?: string
      Description: Aspect ratio of the generated images.
      Defined in: types.ts:1343

    enhancePrompt?: boolean
      Description: Whether to use the prompt rewriting logic.
      Defined in: types.ts:1381

    guidanceScale?: number
      Description: Controls how much the model adheres to the text prompt. Large values increase output and prompt alignment, but may compromise image quality.
      Defined in: types.ts:1348

    httpOptions?: HttpOptions
      Description: Used to override HTTP request options.
      Defined in: types.ts:1331

    includeRaiReason?: boolean
      Description: Whether to include the Responsible AI filter reason if the image is filtered out of the response.
      Defined in: types.ts:1365

    includeSafetyAttributes?: boolean
      Description: Whether to report the safety scores of each image in the response.
      Defined in: types.ts:1361

    language?: ImagePromptLanguage
      Description: Language of the text in the prompt.
      Defined in: types.ts:1368

    negativePrompt?: string
      Description: Description of what to discourage in the generated images.
      Defined in: types.ts:1337

    numberOfImages?: number
      Description: Number of images to generate.
      Defined in: types.ts:1340
```

----------------------------------------

TITLE: FunctionCallingConfigMode Enum
DESCRIPTION: Defines the modes for function calling configuration, controlling how the model can use declared functions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_87

LANGUAGE: TypeScript
CODE:
```
export enum FunctionCallingConfigMode {
    ANY = "ANY",
    AUTO = "AUTO",
    MODE_UNSPECIFIED = "MODE_UNSPECIFIED",
    NONE = "NONE"
}
```

LANGUAGE: APIDOC
CODE:
```
enum FunctionCallingConfigMode:
  ANY: The model can call any function.
  AUTO: The model automatically decides whether to call a function.
  MODE_UNSPECIFIED: Default value, unspecified mode.
  NONE: The model is not allowed to call any functions.
```

----------------------------------------

TITLE: Stream Content Generation with GoogleGenAI
DESCRIPTION: This example shows how to use the `generateContentStream` method to receive content in chunks as it's generated. This approach provides a more responsive user experience for long content generation tasks. It requires an API key and specifies a model and initial content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_6

LANGUAGE: JavaScript
CODE:
```
import {GoogleGenAI} from '@google/genai';const GEMINI_API_KEY = process.env.GEMINI_API_KEY;const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});async function main() {  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: 'Write a 100-word poem.',
  });  for await (const chunk of response) {
    console.log(chunk.text);
  }}main();
```

----------------------------------------

TITLE: Interface: GenerateContentParameters
DESCRIPTION: Defines the configuration parameters for the `models.generate_content` method, including content, model ID, and optional generation settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: GenerateContentParameters
Description: Config for models.generate_content parameters.

interface GenerateContentParameters {
  config?: GenerateContentConfig;
  contents: ContentListUnion;
  model: string;
}

Properties:
  config:
    Type: GenerateContentConfig (Optional)
    Description: Configuration that contains optional model parameters.
  contents:
    Type: ContentListUnion
    Description: Content of the request.
  model:
    Type: string
    Description: ID of the model to use. For a list of models, see `Google models <https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models>`.
```

----------------------------------------

TITLE: sendRealtimeInput: Send Real-time Media Input
DESCRIPTION: Sends a real-time message over an established connection, optimized for responsiveness. This method is used for streaming audio chunks and video frames, with the API automatically responding based on voice activity detection (VAD). It expects a `Blob` object, but only a subset of audio and image mimetypes are allowed.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Session.html#_snippet_4

LANGUAGE: APIDOC
CODE:
```
sendRealtimeInput(params: LiveSendRealtimeInputParameters): void
Experimental

Parameters:
  params: LiveSendRealtimeInputParameters
    Contains one property, `media`.
    `media` will be converted to a `Blob`

Returns: void

Remarks:
  Use `sendRealtimeInput` for realtime audio chunks and video frames (images).
  With `sendRealtimeInput` the api will respond to audio automatically based on voice activity detection (VAD).
  `sendRealtimeInput` is optimized for responsivness at the expense of deterministic ordering guarantees. Audio and video tokens are to the context when they become available.
  Note: The Call signature expects a `Blob` object, but only a subset of audio and image mimetypes are allowed.
Defined in live.ts:386
```

----------------------------------------

TITLE: Configure Environment Variable for Gemini Developer API Key (Node.js)
DESCRIPTION: This Bash command sets the `GOOGLE_API_KEY` environment variable, allowing the Google Gen AI SDK to automatically pick up the API key for the Gemini Developer API in Node.js environments without explicit initialization in code.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_5

LANGUAGE: Bash
CODE:
```
export GOOGLE_API_KEY='your-api-key'
```

----------------------------------------

TITLE: Initialize Theme and Display Body
DESCRIPTION: This JavaScript snippet initializes the theme based on local storage or OS preference, hides the body initially, and then shows it after a short delay, potentially invoking an 'app.showPage()' function if 'app' exists.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/types/types.ToolListUnion.html#_snippet_0

LANGUAGE: JavaScript
CODE:
```
document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)
```

----------------------------------------

TITLE: Initialize GoogleGenAI SDK for Gemini or Vertex AI API
DESCRIPTION: Demonstrates how to initialize the GoogleGenAI SDK instance. It shows two configurations: one for connecting to the Gemini API using an API key, and another for connecting to the Vertex AI API requiring project ID and location.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/client.GoogleGenAI.html#_snippet_0

LANGUAGE: TypeScript
CODE:
```
import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

LANGUAGE: TypeScript
CODE:
```
import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({
  vertexai: true,
  project: 'PROJECT_ID',
  location: 'PROJECT_LOCATION'
});
```

----------------------------------------

TITLE: Access Function Calls from GenAI Model Response
DESCRIPTION: This accessor retrieves an array of `FunctionCall` objects from the first candidate in a GenAI model response. It is useful for processing tool calls made by the model. If no function calls are present or if there are multiple candidates, it returns `undefined` or the calls from the first candidate, respectively.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponse.html#_snippet_3

LANGUAGE: APIDOC
CODE:
```
get functionCalls(): undefined | FunctionCall[]

Returns the function calls from the first candidate in the response.

Returns: undefined | FunctionCall[]

Remarks:
If there are multiple candidates in the response, the function calls from the first one will be returned. If there are no function calls in the response, undefined will be returned.
```

LANGUAGE: JavaScript
CODE:
```
const controlLightFunctionDeclaration = {
  name: 'controlLight',
  parameters: {
    type: Type.OBJECT,
    description: 'Set the brightness and color temperature of a room light.',
    properties: {
      brightness: {
        type: Type.NUMBER,
        description: 'Light level from 0 to 100. Zero is off and 100 is full brightness.'
      },
      colorTemperature: {
        type: Type.STRING,
        description: 'Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.'
      }
    },
    required: ['brightness', 'colorTemperature']
  }
};
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Dim the lights so the room feels cozy and warm.',
  config: {
    tools: [{functionDeclarations: [controlLightFunctionDeclaration]}],
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingConfigMode.ANY,
        allowedFunctionNames: ['controlLight']
      }
    }
  }
});
console.debug(JSON.stringify(response.functionCalls));
```

----------------------------------------

TITLE: GoogleSearchRetrieval Interface API Reference
DESCRIPTION: Comprehensive API documentation for the `GoogleSearchRetrieval` interface, a tool designed to retrieve public web data for grounding purposes using Google's search capabilities. It details the available configuration options for dynamic retrieval.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GoogleSearchRetrieval.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface GoogleSearchRetrieval
  Description: Tool to retrieve public web data for grounding, powered by Google.
  Properties:
    dynamicRetrievalConfig:
      Type: DynamicRetrievalConfig
      Optional: Yes
      Description: Specifies the dynamic retrieval configuration for the given source.
```

----------------------------------------

TITLE: API Interface: Candidate
DESCRIPTION: Represents a candidate response from a generative model, including content, safety ratings, and metadata.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_3

LANGUAGE: APIDOC
CODE:
```
interface Candidate:
  avgLogprobs?: number
  citationMetadata?: CitationMetadata
  content?: Content
  finishMessage?: string
  finishReason?: FinishReason
  groundingMetadata?: GroundingMetadata
  index?: number
  logprobsResult?: LogprobsResult
  safetyRatings?: SafetyRating[]
  tokenCount?: number
  urlContextMetadata?: UrlContextMetadata
```

----------------------------------------

TITLE: APIDOC: Chat.sendMessage Method
DESCRIPTION: Sends a message to the generative model within the chat session. This method is asynchronous and returns a `Promise` that resolves with the model's response. It ensures sequential processing of messages.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_3

LANGUAGE: APIDOC
CODE:
```
sendMessage
*   sendMessage(params: SendMessageParameters): Promise<GenerateContentResponse>

Sends a message to the model and returns the response.

Parameters:
*   params: SendMessageParameters
        parameters for sending messages within a chat session.

Returns: Promise<GenerateContentResponse>
The model's response.

Remarks:
This method will wait for the previous message to be processed before sending the next message.

See:
Chat#sendMessageStream for streaming method.

Defined in chats.ts:194
```

----------------------------------------

TITLE: Iterating through Pager results asynchronously
DESCRIPTION: Demonstrates how to use the Pager class with an async iterator to fetch and process paginated items from an API, automatically handling subsequent page requests.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/pagers.Pager.html#_snippet_0

LANGUAGE: JavaScript
CODE:
```
const pager = await ai.files.list({config: {pageSize: 10}});
for await (const file of pager) {
  console.log(file.name);
}
```

----------------------------------------

TITLE: Google GenAI SDK: Overview and Comparison
DESCRIPTION: This section provides an overview of the `@google/genai` SDK, highlighting its role as Google Deepmind's 'vanilla' SDK for generative AI, where new features are added. It clarifies that models on Vertex AI and Gemini Developer platforms are accessible through this SDK and differentiates it from older SDKs like `@google/generative_language` and `@google-cloud/vertexai`, which are no longer receiving new Gemini 2.0+ features.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_15

LANGUAGE: APIDOC
CODE:
```
SDK: `@google/genai`
  - Role: Google Deepmind's "vanilla" SDK for generative AI.
  - Feature Development: Primary SDK for new AI features.
  - Supported Platforms:
    - Vertex AI platform: `https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview`
    - Gemini Developer platform: `https://ai.google.dev/gemini-api/docs`

Comparison with Other Google AI SDKs:
  - `@google/generative_language`:
    - Status: Previous iteration.
    - Feature Updates: No longer receiving new Gemini 2.0+ features.
  - `@google-cloud/vertexai`:
    - Status: Previous iteration.
    - Feature Updates: No longer receiving new Gemini 2.0+ features.
  - Other SDKs (General):
    - Purpose: May offer additional AI frameworks or target specific project environments (e.g., Firebase).
```

----------------------------------------

TITLE: GoogleGenAIOptions Interface Definition and Properties
DESCRIPTION: Defines the configuration options for the Google Gen AI SDK, including parameters for API key, version, authentication, HTTP settings, and API endpoint selection (Vertex AI or Gemini).
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/client.GoogleGenAIOptions.html#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface GoogleGenAIOptions {
    apiKey?: string;
    apiVersion?: string;
    googleAuthOptions?: GoogleAuthOptions<JSONClient>;
    httpOptions?: HttpOptions;
    location?: string;
    project?: string;
    vertexai?: boolean;
}
```

LANGUAGE: APIDOC
CODE:
```
Interface GoogleGenAIOptions:
  description: Google Gen AI SDK's configuration options.
  properties:
    apiKey?: string
      description: The API Key, required for Gemini API clients.
      remarks: Required on browser runtimes.
    apiVersion?: string
      description: Optional. The API version to use.
      remarks: If unset, the default API version will be used.
    googleAuthOptions?: GoogleAuthOptions<JSONClient>
      description: Optional. Authentication options defined by the by google-auth-library for Vertex AI clients.
      remarks: Only supported on Node runtimes, ignored on browser runtimes.
      see: GoogleAuthOptions interface in google-auth-library-nodejs (https://github.com/googleapis/google-auth-library-nodejs/blob/v9.15.0/src/auth/googleauth.ts).
    httpOptions?: HttpOptions
      description: Optional. A set of customizable configuration for HTTP requests.
    location?: string
      description: Optional. The Google Cloud project region for Vertex AI clients.
      remarks: Only supported on Node runtimes, ignored on browser runtimes.
    project?: string
      description: Optional. The Google Cloud project ID for Vertex AI clients.
      remarks: Only supported on Node runtimes, ignored on browser runtimes.
    vertexai?: boolean
      description: Optional. Determines whether to use the Vertex AI or the Gemini API.
      remarks: When true, the Vertex AI API will used. When false, the Gemini API will be used. If unset, default SDK behavior is to use the Gemini API service.
```

----------------------------------------

TITLE: Configure GoogleGenAI for Gemini Developer API Version
DESCRIPTION: Illustrates how to set a specific API version, like `v1alpha`, for the Gemini Developer API when creating a `GoogleGenAI` instance. This allows access to preview features or specific API releases.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_9

LANGUAGE: typescript
CODE:
```
const ai = new GoogleGenAI({
    apiKey: 'GEMINI_API_KEY',
    apiVersion: 'v1alpha'
});
```

----------------------------------------

TITLE: GenerationConfig Interface Definition
DESCRIPTION: Defines configuration options for AI model generation, including parameters like token limits, penalties, and response formats. This interface is used to control the behavior of generative models by setting various constraints and preferences for the output.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerationConfig.html#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface GenerationConfig {
  /**
   * Optional. If enabled, audio timestamp will be included in the request to the model.
   */
  audioTimestamp?: boolean;
  /**
   * Optional. Number of candidates to generate.
   */
  candidateCount?: number;
  /**
   * Optional. Frequency penalties.
   */
  frequencyPenalty?: number;
  /**
   * Optional. Logit probabilities.
   */
  logprobs?: number;
  /**
   * Optional. The maximum number of output tokens to generate per message.
   */
  maxOutputTokens?: number;
  /**
   * Optional. Positive penalties.
   */
  presencePenalty?: number;
  /**
   * Optional. If true, export the logprobs results in response.
   */
  responseLogprobs?: boolean;
  /**
   * Optional. Output response mimetype of the generated candidate text. Supported mimetype:
   * - `text/plain`: (default) Text output.
   * - `application/json`: JSON response in the candidates. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. This is a preview feature.
   */
  responseMimeType?: string;
  /**
   * Optional. The `Schema` object allows the definition of input and output data types. These types can be objects, but also primitives and arrays. Represents a select subset of an [OpenAPI 3.0 schema object](https://spec.openapis.org/oas/v3.0.3#schema). If set, a compatible response_mime_type must also be set. Compatible mimetypes: `application/json`: Schema for JSON response.
   */
  responseSchema?: Schema;
  /**
   * Optional. Routing configuration.
   */
  routingConfig?: GenerationConfigRoutingConfig;
  seed?: number;
  stopSequences?: string[];
  temperature?: number;
  topK?: number;
  topP?: number;
}
```

----------------------------------------

TITLE: List All Project Files with Pagination using Google GenAI JavaScript Client
DESCRIPTION: Illustrates how to list all files associated with the current project using `ai.files.list`. The example shows how to iterate through paginated results, setting a page size of 10 for efficient retrieval.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/files.Files.html#_snippet_2

LANGUAGE: typescript
CODE:
```
const listResponse = await ai.files.list({config: {'pageSize': 10}});
for await (const file of listResponse) {
  console.log(file.name);
}
```

----------------------------------------

TITLE: API Reference: @google/genai Schema Interface Definition
DESCRIPTION: Defines the `Schema` interface, representing a subset of an OpenAPI 3.0 schema object, used for specifying the format of input and output data in the `@google/genai` library. Each property is optional and includes a description of its purpose and expected values.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface Schema {
  anyOf?: Schema[]; // Optional. The value should be validated against any (one or more) of the subschemas in the list.
  default?: unknown; // Optional. Default value of the data.
  description?: string; // Optional. The description of the data.
  enum?: string[]; // Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as : {type:STRING, format:enum, enum:["EAST", "NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as : {type:INTEGER, format:enum, enum:["101", "201", "301"]}
  example?: unknown; // Optional. Example of the object. Will only populated when the object is the root.
  format?: string; // Optional. The format of the data. Supported formats: for NUMBER type: "float", "double" for INTEGER type: "int32", "int64" for STRING type: "email", "byte", etc
  items?: Schema; // Optional. SCHEMA FIELDS FOR TYPE ARRAY Schema of the elements of Type.ARRAY.
  maximum?: number; // Optional. Maximum value of the Type.INTEGER and Type.NUMBER
  maxItems?: string; // Optional. Maximum number of the elements for Type.ARRAY.
  maxLength?: string; // Optional. Maximum length of the Type.STRING
  maxProperties?: string; // Optional. Maximum number of the properties for Type.OBJECT.
  minimum?: number; // Optional. Minimum value of the Type.INTEGER and Type.NUMBER
  minItems?: string; // Optional. Minimum number of the elements for Type.ARRAY.
  minLength?: string; // Optional. Minimum length of the Type.STRING
  minProperties?: string; // Optional. Minimum number of the properties for Type.OBJECT.
  nullable?: boolean; // Optional. Indicates if the value can be null.
  pattern?: string; // Optional. Regular expression pattern for string validation.
  properties?: Record<string, Schema>; // Optional. SCHEMA FIELDS FOR TYPE OBJECT Schema of the properties of Type.OBJECT.
  propertyOrdering?: string[]; // Optional. Defines the order of properties.
  required?: string[]; // Optional. List of required properties.
  title?: string; // Optional. The title of the schema.
  type?: Type; // Optional. The data type of the schema.
}
```

----------------------------------------

TITLE: FunctionDeclaration Interface
DESCRIPTION: Represents a declaration of a function that can be called by the model. This includes its name, description, parameters, and expected response schema.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_88

LANGUAGE: TypeScript
CODE:
```
export interface FunctionDeclaration {
    behavior?: Behavior;
    description?: string;
    name?: string;
    parameters?: Schema;
    response?: Schema;
}
```

LANGUAGE: APIDOC
CODE:
```
interface FunctionDeclaration:
  behavior?: Behavior - Optional behavior configuration for the function.
  description?: string - Optional description of the function's purpose.
  name?: string - The name of the function.
  parameters?: Schema - Optional schema defining the function's input parameters.
  response?: Schema - Optional schema defining the function's expected response.
```

----------------------------------------

TITLE: Building Google GenAI Node.js SDK and Samples (Shell)
DESCRIPTION: This snippet provides shell commands to build the Google GenAI Node.js SDK and its associated samples. It's a prerequisite step to ensure all necessary dependencies are installed and the code is compiled before running any examples.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
npm install
npm run build

cd sdk-samples
npm install
npm run build
```

----------------------------------------

TITLE: JavaScript Example: Calling generateImages API
DESCRIPTION: Demonstrates how to call the `generateImages` API using the `ai.models` object, specifying the model, prompt, and configuration options like `numberOfImages` and `includeRaiReason`. It logs the `imageBytes` from the first generated image.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_7

LANGUAGE: JavaScript
CODE:
```
const response = await ai.models.generateImages({ model: 'imagen-3.0-generate-002', prompt: 'Robot holding a red skateboard', config: {   numberOfImages: 1,   includeRaiReason: true, },});console.log(response?.generatedImages?.[0]?.image?.imageBytes);
```

----------------------------------------

TITLE: Example: Connecting to a Live Session
DESCRIPTION: This example demonstrates how to use the `ai.live.connect` method to establish a live session with a generative model (e.g., 'gemini-2.0-flash-exp'). It includes configuration for response modalities and defines callback functions to handle connection events such as opening, receiving messages, errors, and closing.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Live.html#_snippet_2

LANGUAGE: TypeScript
CODE:
```
const session = await ai.live.connect({
  model: 'gemini-2.0-flash-exp',
  config: {
    responseModalities: [Modality.AUDIO],
  },
  callbacks: {
    onopen: () => {
      console.log('Connected to the socket.');
    },
    onmessage: (e: MessageEvent) => {
      console.log('Received message from the server: %s\n', debug(e.data));
    },
    onerror: (e: ErrorEvent) => {
      console.log('Error occurred: %s\n', debug(e.error));
    },
    onclose: (e: CloseEvent) => {
      console.log('Connection closed.');
    }
  }
});
```

----------------------------------------

TITLE: toolConfig Parameter
DESCRIPTION: Associates model output to a specific function call.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_24

LANGUAGE: TypeScript
CODE:
```
toolConfig?: ToolConfig
```

----------------------------------------

TITLE: Define GenerateImagesParameters Interface
DESCRIPTION: Defines the `GenerateImagesParameters` interface, which specifies the required and optional parameters for an image generation request. This includes the model to use, the text prompt, and optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateImagesParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface GenerateImagesParameters:
  description: The parameters for generating images.
  properties:
    config:
      type: GenerateImagesConfig
      optional: true
      description: Configuration for generating images.
    model:
      type: string
      description: ID of the model to use. For a list of models, see Google models (https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models).
    prompt:
      type: string
      description: Text prompt that typically describes the images to output.
```

----------------------------------------

TITLE: Extract Concatenated Text from GenAI Model Response
DESCRIPTION: This accessor returns a concatenated string of all text parts from the first candidate in a GenAI model response. It simplifies retrieving the primary text output from the model. It handles cases with multiple candidates, non-text parts, and thought parts by returning the relevant text and logging warnings if necessary.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponse.html#_snippet_4

LANGUAGE: APIDOC
CODE:
```
get text(): undefined | string

Returns the concatenation of all text parts from the first candidate in the response.

Returns: undefined | string

Remarks:
If there are multiple candidates in the response, the text from the first one will be returned. If there are non-text parts in the response, the concatenation of all text parts will be returned, and a warning will be logged. If there are thought parts in the response, the concatenation of all text parts excluding the thought parts will be returned.
```

LANGUAGE: JavaScript
CODE:
```
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Why is the sky blue?'
});
console.debug(response.text);
```

----------------------------------------

TITLE: API Class: LiveClientToolResponse
DESCRIPTION: Represents a tool response from the client in a live session, containing a list of function responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_165

LANGUAGE: APIDOC
CODE:
```
Class LiveClientToolResponse:
  functionResponses?: FunctionResponse[]
```

----------------------------------------

TITLE: Schema Property: properties
DESCRIPTION: Defines the properties for Type.OBJECT schema fields, mapping string keys to Schema objects.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_8

LANGUAGE: APIDOC
CODE:
```
properties?: Record<string, Schema>
Optional. SCHEMA FIELDS FOR TYPE OBJECT Properties of Type.OBJECT.
```

----------------------------------------

TITLE: Define Type Enumeration Members for @google/genai
DESCRIPTION: This API documentation defines the `Type` enumeration, which specifies various data types as string literals. It lists all available members, including `ARRAY`, `BOOLEAN`, `INTEGER`, `NUMBER`, `OBJECT`, `STRING`, and `TYPE_UNSPECIFIED`, along with their corresponding string values and source file locations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.Type.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration Type
  Defined in types.ts:21

  Members:
    ARRAY: "ARRAY" (Defined in types.ts:27)
    BOOLEAN: "BOOLEAN" (Defined in types.ts:26)
    INTEGER: "INTEGER" (Defined in types.ts:25)
    NUMBER: "NUMBER" (Defined in types.ts:24)
    OBJECT: "OBJECT" (Defined in types.ts:28)
    STRING: "STRING" (Defined in types.ts:23)
    TYPE_UNSPECIFIED: "TYPE_UNSPECIFIED" (Defined in types.ts:22)
```

----------------------------------------

TITLE: Google GenAI SDK: Part and Content Handling
DESCRIPTION: This API documentation describes how the `@google/genai` SDK processes different 'Part' types (string, Part, arrays of these) by wrapping them into a `Content` instance with the 'user' role. It also specifies that `FunctionCall` and `FunctionResponse` parts require an explicit `Content[]` structure to avoid exceptions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_14

LANGUAGE: APIDOC
CODE:
```
Concept: Part Handling
Description: How the SDK processes various 'Part' types into 'Content' instances.

Input Types:
  - Type: `Part | string`
    Processing: Wrapped in a `Content` instance with `role: 'user'`.

  - Type: `Part[] | string[]`
    Processing: The full list is wrapped into a single `Content` instance with `role: 'user'`.

Special Cases:
  - Types: `FunctionCall`, `FunctionResponse`
    Requirement: Must explicitly provide the full `Content[]` structure.
    Reason: To explicitly define which Parts are 'spoken' by the model or the user.
    SDK Behavior: Throws an exception if explicit `Content[]` structure is not provided for these types.
```

----------------------------------------

TITLE: createUserContent API Reference
DESCRIPTION: Documents the `createUserContent` function from the `@google/genai` library. This function is used to create a `Content` object with a user role, accepting a `PartListUnion` object or a string as input and returning an array of `Content` objects.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createUserContent.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Function: createUserContent
Signature: createUserContent(partOrString: PartListUnion): Content[]

Description: Creates a `Content` object with a user role from a `PartListUnion` object or `string`.

Parameters:
  partOrString:
    Type: PartListUnion
    Description: The input to create the content, which can be a `PartListUnion` object or a string.

Returns:
  Type: Content[]
  Description: An array of `Content` objects with a user role.
```

----------------------------------------

TITLE: GenerateContentConfig Interface
DESCRIPTION: Configuration options for generating content, including settings for safety, token limits, response format, and tool usage.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_91

LANGUAGE: TypeScript
CODE:
```
export interface GenerateContentConfig {
    abortSignal?: AbortSignal;
    audioTimestamp?: boolean;
    automaticFunctionCalling?: AutomaticFunctionCallingConfig;
    cachedContent?: string;
    candidateCount?: number;
    frequencyPenalty?: number;
    httpOptions?: HttpOptions;
    labels?: Record<string, string>;
    logprobs?: number;
    maxOutputTokens?: number;
    mediaResolution?: MediaResolution;
    modelSelectionConfig?: ModelSelectionConfig;
    presencePenalty?: number;
    responseLogprobs?: boolean;
    responseMimeType?: string;
    responseModalities?: string[];
    responseSchema?: SchemaUnion;
    routingConfig?: GenerationConfigRoutingConfig;
    safetySettings?: SafetySetting[];
    seed?: number;
    speechConfig?: SpeechConfigUnion;
    stopSequences?: string[];
    systemInstruction?: ContentUnion;
    temperature?: number;
    thinkingConfig?: ThinkingConfig;
    toolConfig?: ToolConfig;
    tools?: ToolListUnion;
    topK?: number;
    topP?: number;
}
```

LANGUAGE: APIDOC
CODE:
```
interface GenerateContentConfig:
  abortSignal?: AbortSignal - Optional signal to abort the request.
  audioTimestamp?: boolean - Optional flag to include audio timestamps.
  automaticFunctionCalling?: AutomaticFunctionCallingConfig - Optional configuration for automatic function calling.
  cachedContent?: string - Optional cached content identifier.
  candidateCount?: number - Optional number of candidates to generate.
  frequencyPenalty?: number - Optional penalty for frequent tokens.
  httpOptions?: HttpOptions - Optional HTTP request options.
  labels?: Record<string, string> - Optional labels for the request.
  logprobs?: number - Optional number of log probabilities to return.
  maxOutputTokens?: number - Optional maximum number of output tokens.
  mediaResolution?: MediaResolution - Optional media resolution setting.
  modelSelectionConfig?: ModelSelectionConfig - Optional model selection configuration.
  presencePenalty?: number - Optional penalty for present tokens.
  responseLogprobs?: boolean - Optional flag to include response log probabilities.
  responseMimeType?: string - Optional MIME type for the response.
  responseModalities?: string[] - Optional list of modalities for the response.
  responseSchema?: SchemaUnion - Optional schema for the response.
  routingConfig?: GenerationConfigRoutingConfig - Optional routing configuration.
  safetySettings?: SafetySetting[] - Optional safety settings for content generation.
  seed?: number - Optional seed for reproducible generation.
  speechConfig?: SpeechConfigUnion - Optional speech configuration.
  stopSequences?: string[] - Optional list of stop sequences.
  systemInstruction?: ContentUnion - Optional system instruction content.
  temperature?: number - Optional temperature for sampling.
  thinkingConfig?: ThinkingConfig - Optional thinking process configuration.
  toolConfig?: ToolConfig - Optional tool configuration.
  tools?: ToolListUnion - Optional list of tools available to the model.
  topK?: number - Optional top-k sampling parameter.
  topP?: number - Optional top-p sampling parameter.
```

----------------------------------------

TITLE: API Documentation for createModelContent Function
DESCRIPTION: Detailed API documentation for the `createModelContent` function from the `@google/genai` library. It describes the function's purpose, its parameters, and the type of object it returns.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createModelContent.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Function createModelContent
  Signature: createModelContent(partOrString: PartListUnion): Content
  Description: Creates a Content object with a model role from a PartListUnion object or string.
  Parameters:
    partOrString: PartListUnion
  Returns: Content
```

----------------------------------------

TITLE: Example: Prefilling Conversation Context with sendClientContent
DESCRIPTION: Illustrates how to use `sendClientContent` to prefill a conversation context with multiple turns, demonstrating its use for structured content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Session.html#_snippet_3

LANGUAGE: JavaScript
CODE:
```
sendClientContent({
    turns: [
      Content({role:user, parts:...}),
      Content({role:user, parts:...}),
      ...
    ]
})
```

----------------------------------------

TITLE: Handle Text Input for Content Update (Node.js SDK)
DESCRIPTION: This snippet demonstrates how to send text input from a form to a WebSocket server for content updates, likely triggering an audio response. It prevents default form submission and emits the input value.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_0

LANGUAGE: JavaScript
CODE:
```
form.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior.
  event.preventDefault();
  if (input.value.trim() !== "") {
    socket.emit("contentUpdateText", input.value);
  }
  form.reset();
});
```

----------------------------------------

TITLE: Embed Content with @google/genai
DESCRIPTION: Shows how to use the `embedContent` method of the `Models` class to calculate embeddings for text content. This method currently only supports text input.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_3

LANGUAGE: javascript
CODE:
```
const response = await ai.models.embedContent({ model: 'text-embedding-004', contents: [   'What is your name?',   ''What is your favorite color?', ], config: {   outputDimensionality: 64, },});console.log(response);
```

----------------------------------------

TITLE: APIDOC: Chat Class Constructor
DESCRIPTION: Initializes a new `Chat` session. It requires an `ApiClient`, `Models` module, and the `model` name. Optional parameters include `GenerateContentConfig` for model behavior and an initial `history` array.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
constructor
*   new Chat(
        apiClient: ApiClient,
        modelsModule: Models,
        model: string,
        config?: GenerateContentConfig,
        history?: Content[]
    ): Chat

Parameters:
*   apiClient: ApiClient
*   modelsModule: Models
*   model: string
*   config: GenerateContentConfig = {}
*   history: Content[] = []

Returns: Chat

Defined in chats.ts:164
```

----------------------------------------

TITLE: Usage Metadata Interface
DESCRIPTION: Provides detailed metadata about token usage, including counts for cached content, prompts, responses, thoughts, and tool use, along with traffic type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_306

LANGUAGE: APIDOC
CODE:
```
UsageMetadata:
  cachedContentTokenCount?: number
  cacheTokensDetails?: ModalityTokenCount[]
  promptTokenCount?: number
  promptTokensDetails?: ModalityTokenCount[]
  responseTokenCount?: number
  responseTokensDetails?: ModalityTokenCount[]
  thoughtsTokenCount?: number
  toolUsePromptTokenCount?: number
  toolUsePromptTokensDetails?: ModalityTokenCount[]
  totalTokenCount?: number
  trafficType?: TrafficType
```

----------------------------------------

TITLE: GenerateContentParameters Interface
DESCRIPTION: Parameters required for a content generation request, including the model to use and the input content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_92

LANGUAGE: TypeScript
CODE:
```
export interface GenerateContentParameters {
    config?: GenerateContentConfig;
    contents: ContentListUnion;
    model: string;
}
```

LANGUAGE: APIDOC
CODE:
```
interface GenerateContentParameters:
  config?: GenerateContentConfig - Optional configuration for content generation.
  contents: ContentListUnion - Required input content for generation.
  model: string - Required name of the model to use for generation.
```

----------------------------------------

TITLE: Creating a new chat session with specific model and config
DESCRIPTION: Demonstrates how to initialize a new chat session using the `create` method, specifying the model and configuration parameters like temperature and max output tokens.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chats.html#_snippet_1

LANGUAGE: TypeScript
CODE:
```
const chat = ai.chats.create({
  model: 'gemini-2.0-flash',
  config: {
    temperature: 0.5,
    maxOutputTokens: 1024
  }
});
```

----------------------------------------

TITLE: Interface: ModelSelectionConfig
DESCRIPTION: Configuration for model selection, including feature selection preferences.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_210

LANGUAGE: APIDOC
CODE:
```
interface ModelSelectionConfig {
  featureSelectionPreference?: FeatureSelectionPreference;
}
```

----------------------------------------

TITLE: Enum: MediaModality
DESCRIPTION: Specifies different types of media modalities supported, such as audio, document, image, text, and video.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_203

LANGUAGE: APIDOC
CODE:
```
enum MediaModality {
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",
  IMAGE = "IMAGE",
  MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED",
  TEXT = "TEXT",
  VIDEO = "VIDEO"
}
```

----------------------------------------

TITLE: API Interface: Content
DESCRIPTION: Represents a piece of content, composed of multiple parts and an optional role.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_13

LANGUAGE: APIDOC
CODE:
```
interface Content:
  parts?: Part[]
  role?: string
```

----------------------------------------

TITLE: API Reference: Citation Interface
DESCRIPTION: Documents the `Citation` interface, which provides details about source attributions for content. It includes optional properties such as `endIndex`, `license`, `publicationDate`, `startIndex`, `title`, and `uri`, detailing the origin and context of cited information.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Citation.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface Citation {
  endIndex?: number;
  license?: string;
  publicationDate?: GoogleTypeDate;
  startIndex?: number;
  title?: string;
  uri?: string;
}

Properties:
- endIndex?: number
  Output only. End index into the content.
- license?: string
  Output only. License of the attribution.
- publicationDate?: GoogleTypeDate
  Output only. Publication date of the attribution.
- startIndex?: number
  Output only. Start index into the content.
- title?: string
  Output only. Title of the attribution.
- uri?: string
  Output only. Url reference of the attribution.
```

----------------------------------------

TITLE: Interface: CreateTuningJobConfig
DESCRIPTION: Defines configuration options for creating a model tuning job. This includes various hyperparameters like learning rate, epoch count, and dataset-related settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_41

LANGUAGE: APIDOC
CODE:
```
interface CreateTuningJobConfig
  abortSignal?: AbortSignal
  adapterSize?: AdapterSize
  batchSize?: number
  description?: string
  epochCount?: number
  exportLastCheckpointOnly?: boolean
  httpOptions?: HttpOptions
  learningRate?: number
  learningRateMultiplier?: number
  tunedModelDisplayName?: string
  validationDataset?: TuningValidationDataset
```

----------------------------------------

TITLE: Start Real-time Audio Recording (JavaScript)
DESCRIPTION: This function initiates the audio recording process by calling `recordAudio()`, sets the recording state to true, and updates the "record" button's text to "Stop Realtime".
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_6

LANGUAGE: JavaScript
CODE:
```
async function recordStart() {
  await recordAudio();
  isRecording = true;
  document.getElementById("record").textContent = "Stop Realtime";
}
```

----------------------------------------

TITLE: Vertex RAG Store Interface
DESCRIPTION: Defines parameters for a Vertex Retrieval Augmented Generation (RAG) store, including corpora, resources, retrieval configuration, similarity top K, context storage, and vector distance threshold.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_309

LANGUAGE: APIDOC
CODE:
```
VertexRagStore:
  ragCorpora?: string[]
  ragResources?: VertexRagStoreRagResource[]
  ragRetrievalConfig?: RagRetrievalConfig
  similarityTopK?: number
  storeContext?: boolean
  vectorDistanceThreshold?: number
```

----------------------------------------

TITLE: safetySettings Parameter
DESCRIPTION: Safety settings in the request to block unsafe content in the response.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_17

LANGUAGE: TypeScript
CODE:
```
safetySettings?: SafetySetting[]
```

----------------------------------------

TITLE: Function: createPartFromText
DESCRIPTION: A straightforward function to create a content part from a simple text string. This is commonly used for basic text inputs.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_39

LANGUAGE: APIDOC
CODE:
```
function createPartFromText(text: string): Part
```

----------------------------------------

TITLE: Define GroundingChunkRetrievedContext Interface
DESCRIPTION: Defines the structure for the GroundingChunkRetrievedContext object, detailing the context retrieved for a grounding chunk, including RAG chunk, text, title, and URI.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_128

LANGUAGE: APIDOC
CODE:
```
GroundingChunkRetrievedContext:
  ragChunk?: RagChunk
  text?: string
  title?: string
  uri?: string
```

----------------------------------------

TITLE: Define GroundingChunkWeb Interface
DESCRIPTION: Defines the structure for the GroundingChunkWeb object, providing details about a web-based grounding chunk, such as its domain, title, and URI.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_129

LANGUAGE: APIDOC
CODE:
```
GroundingChunkWeb:
  domain?: string
  title?: string
  uri?: string
```

----------------------------------------

TITLE: APIDOC: Chat.getHistory Method
DESCRIPTION: Returns the conversation history of the chat session. It can return either a `curated` history (valid turns for subsequent requests) or a `comprehensive` history (all turns, including invalid ones). By default, the comprehensive history is returned.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_2

LANGUAGE: APIDOC
CODE:
```
getHistory
*   getHistory(curated?: boolean): Content[]

Returns the chat history.

Parameters:
*   curated: boolean = false
        whether to return the curated history or the comprehensive history.

Returns: Content[]
History contents alternating between user and model for the entire chat session.

Remarks:
The history is a list of contents alternating between user and model.
There are two types of history:
*   The `curated history` contains only the valid turns between user and model, which will be included in the subsequent requests sent to the model.
*   The `comprehensive history` contains all turns, including invalid or empty model outputs, providing a complete record of the history.

The history is updated after receiving the response from the model, for streaming response, it means receiving the last chunk of the response.
The `comprehensive history` is returned by default. To get the `curated history`, set the `curated` parameter to `true`.

Defined in chats.ts:276
```

----------------------------------------

TITLE: Define HarmProbability Enum
DESCRIPTION: Defines the probability levels of harmful content, from negligible to high.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_135

LANGUAGE: APIDOC
CODE:
```
HarmProbability:
  HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED"
  HIGH = "HIGH"
  LOW = "LOW"
  MEDIUM = "MEDIUM"
  NEGLIGIBLE = "NEGLIGIBLE"
```

----------------------------------------

TITLE: Pager.nextPage() API Reference
DESCRIPTION: API documentation for the `nextPage` method of the Pager class. This method fetches the subsequent page of items from the API, making a new request. It throws an error if no more pages are available.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/pagers.Pager.html#_snippet_3

LANGUAGE: APIDOC
CODE:
```
Pager.nextPage(): Promise<T[]>
  Fetches the next page of items. This makes a new API request.
  Throws: If there are no more pages to fetch.
```

----------------------------------------

TITLE: APIDOC: GenerateVideosResponse Class
DESCRIPTION: Defines the response structure for a video generation request, containing a list of generated videos and information about any media filtered due to safety attributes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_104

LANGUAGE: APIDOC
CODE:
```
GenerateVideosResponse:
  generatedVideos?: GeneratedVideo[] (Optional)
  raiMediaFilteredCount?: number (Optional)
  raiMediaFilteredReasons?: string[] (Optional)
```

----------------------------------------

TITLE: Structure of `contents` Argument for `generateContent` Method
DESCRIPTION: Details how the `contents` argument should be structured when calling the `generateContent` method. It explains the SDK's behavior when receiving a single `Content` instance versus an array of `Content` instances.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_13

LANGUAGE: APIDOC
CODE:
```
generateContent(contents: Content | Content[]):
  contents:
    Content: The SDK will wrap the singular Content instance in an array which contains only the given content instance
    Content[]: No transformation happens
```

----------------------------------------

TITLE: Function: createPartFromFunctionResponse
DESCRIPTION: Creates a content part encapsulating a function's response. It requires the ID, name of the function, and the response data as a record.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_38

LANGUAGE: APIDOC
CODE:
```
function createPartFromFunctionResponse(id: string, name: string, response: Record<string, unknown>): Part
```

----------------------------------------

TITLE: Process and Play Audio Stream from WebSocket (JavaScript)
DESCRIPTION: This code listens for incoming "audioStream" messages from a WebSocket, converts the base64 audio data, queues it, and initiates playback if no audio is currently processing. It uses a message queue to ensure sequential playback.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_2

LANGUAGE: JavaScript
CODE:
```
socket.on("audioStream", async function (msg) {
  messageQueue.push(base64ToFloat32AudioData(msg));
  if (!queueProcessing) {
    playAudioData();
  }
});
```

----------------------------------------

TITLE: Define HarmBlockThreshold Enum
DESCRIPTION: Defines the thresholds for blocking harmful content, ranging from no blocking to blocking high severity content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_133

LANGUAGE: APIDOC
CODE:
```
HarmBlockThreshold:
  BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE"
  BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE"
  BLOCK_NONE = "BLOCK_NONE"
  BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH"
  HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
  OFF = "OFF"
```

----------------------------------------

TITLE: GoogleGenAI Class Submodules Overview
DESCRIPTION: Provides an overview of the `GoogleGenAI` class and its key submodules, detailing their primary functionalities for interacting with generative AI models, caches, chats, files, and live sessions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_10

LANGUAGE: APIDOC
CODE:
```
GoogleGenAI:
  Submodules:
    ai.models: Query models (generateContent, generateImages, ...), or examine their metadata.
    ai.caches: Create and manage caches to reduce costs when repeatedly using the same large prompt prefix.
    ai.chats: Create local stateful chat objects to simplify multi turn interactions.
    ai.files: Upload files to the API and reference them in your prompts. This reduces bandwidth if you use a file many times, and handles files too large to fit inline with your prompt.
    ai.live: Start a live session for real time interaction, allows text + audio + video input, and text or audio output.
```

----------------------------------------

TITLE: GoogleGenAI Class and Submodules API Overview
DESCRIPTION: This section provides an overview of the `GoogleGenAI` class and its primary submodules, detailing their purpose and the types of API methods they expose for interacting with Google's generative AI services.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/index.html#_snippet_5

LANGUAGE: APIDOC
CODE:
```
GoogleGenAI Class:
  Submodules:
    - ai.models: Used to query models (e.g., generateContent, generateImages) or examine their metadata.
    - ai.caches: Used to create and manage caches, reducing costs for repeated large prompt prefixes.
    - ai.chats: Used to create local stateful chat objects for simplified multi-turn interactions.
    - ai.files: Used to upload files to the API and reference them in prompts, reducing bandwidth and handling large files.
    - ai.live: Used to start a live session for real-time interaction, supporting text, audio, and video input, with text or audio output.
```

----------------------------------------

TITLE: Interface VertexRagStoreRagResource Definition
DESCRIPTION: Defines the structure for a Rag resource, including optional references to a rag corpus and specific rag file IDs. This interface is used to specify retrieval augmented generation resources within the @google/genai library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.VertexRagStoreRagResource.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface VertexRagStoreRagResource:
  Description: The definition of the Rag resource.
  Properties:
    ragCorpus:
      Type: string
      Optional: true
      Description: RagCorpora resource name. Format: `projects/{project}/locations/{location}/ragCorpora/{rag_corpus}`
    ragFileIds:
      Type: string[]
      Optional: true
      Description: rag_file_id. The files should be in the same rag_corpus set in rag_corpus field.
```

----------------------------------------

TITLE: API Definition: SendMessageParameters Interface in TypeScript
DESCRIPTION: Defines parameters required for sending a message, including configuration and the message content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_252

LANGUAGE: APIDOC
CODE:
```
SendMessageParameters:
  config: GenerateContentConfig (optional)
  message: PartListUnion
```

----------------------------------------

TITLE: TypeScript Interface: ToolConfig
DESCRIPTION: Configuration settings for tools, including specific configurations for function calling and retrieval mechanisms.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_278

LANGUAGE: TypeScript
CODE:
```
export interface ToolConfig {
    functionCallingConfig?: FunctionCallingConfig;
    retrievalConfig?: RetrievalConfig;
}
```

----------------------------------------

TITLE: Example: Create Cached Content with Caches API
DESCRIPTION: Demonstrates how to use the `ai.caches.create` method to create a new cached content resource, specifying the model, content, display name, system instruction, and time-to-live (TTL). This operation adds new content to the cache.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/caches.Caches.html#_snippet_2

LANGUAGE: JavaScript
CODE:
```
const contents = ...; // Initialize the content to cache.
const response = await ai.caches.create({
  model: 'gemini-2.0-flash',
  config: {
   'contents': contents,
   'displayName': 'test cache',
   'systemInstruction': 'What is the sum of the two pdfs?',
   'ttl': '86400s'
 }});
```

----------------------------------------

TITLE: APIDOC Interface: LiveServerToolCall
DESCRIPTION: Represents a tool call initiated by the live server, containing a list of function calls to be executed.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_193

LANGUAGE: APIDOC
CODE:
```
LiveServerToolCall:
  functionCalls?: FunctionCall[]
```

----------------------------------------

TITLE: Get First Code Execution Result from GenerateContentResponse
DESCRIPTION: Demonstrates how to access the `codeExecutionResult` accessor on a `GenerateContentResponse` object. This accessor returns the first code execution result from the first candidate, or undefined if not present. Useful for extracting results from models that generate and execute code.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponse.html#_snippet_1

LANGUAGE: JavaScript
CODE:
```
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents:    'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.',
  config: {
    tools: [{codeExecution: {}}]
  }
});
console.debug(response.codeExecutionResult);
```

----------------------------------------

TITLE: APIDOC: Interface ExecutableCode Definition
DESCRIPTION: This API documentation describes the `ExecutableCode` interface, which represents code generated by a model for execution. It is typically used when the `FunctionDeclaration` tool is employed and `FunctionCallingConfig` mode is set to `Mode.CODE`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ExecutableCode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface ExecutableCode
  Description: Code generated by the model that is meant to be executed, and the result returned to the model. Generated when using the [FunctionDeclaration] tool and [FunctionCallingConfig] mode is set to [Mode.CODE].
  Defined in: types.ts:203

  Properties:
    code?: string
      Description: Required. The code to be executed.
      Defined in: types.ts:205

    language?: Language
      Description: Required. Programming language of the `code`.
      Defined in: types.ts:207
```

----------------------------------------

TITLE: API Interface: Citation
DESCRIPTION: Details a citation, including its range, license, publication date, title, and URI.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_7

LANGUAGE: APIDOC
CODE:
```
interface Citation:
  endIndex?: number
  license?: string
  publicationDate?: GoogleTypeDate
  startIndex?: number
  title?: string
  uri?: string
```

----------------------------------------

TITLE: APIDOC: Interface RagRetrievalConfigRankingLlmRanker
DESCRIPTION: Configuration for an LLM-based ranker in RAG retrieval, typically specifying the model name to be used for ranking.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_231

LANGUAGE: typescript
CODE:
```
export interface RagRetrievalConfigRankingLlmRanker {
    modelName?: string;
}
```

----------------------------------------

TITLE: Get First Executable Code from GenerateContentResponse
DESCRIPTION: Illustrates how to retrieve the `executableCode` accessor from a `GenerateContentResponse` object. This accessor provides the first piece of executable code generated by the model from the first candidate, or undefined. Useful for inspecting code generated by models.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponse.html#_snippet_2

LANGUAGE: JavaScript
CODE:
```
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents:    'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.',
  config: {
    tools: [{codeExecution: {}}]
  }
});
console.debug(response.executableCode);
```

----------------------------------------

TITLE: TypeScript Type Alias: ToolUnion
DESCRIPTION: A type alias representing a union of `Tool` and `CallableTool` types, allowing for flexibility in tool definitions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_280

LANGUAGE: TypeScript
CODE:
```
export type ToolUnion = Tool | CallableTool;
```

----------------------------------------

TITLE: Setting Environment Variables for Google GenAI Samples (Shell)
DESCRIPTION: This snippet demonstrates how to set crucial environment variables required by the Google GenAI samples. These variables, including the API key, Google Cloud project ID, and location, are essential for authentication and proper execution of the sample applications.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
export GEMINI_API_KEY=<GEMINI_KEY>
export GOOGLE_CLOUD_PROJECT=<GOOGLE_CLOUD_PROJECT>
export GOOGLE_CLOUD_LOCATION=<GCP_REGION>
```

----------------------------------------

TITLE: APIDOC: Google GenAI JavaScript Client Files Class
DESCRIPTION: Detailed API documentation for the `Files` class in the `@google/genai` library, outlining its hierarchy, constructor, and methods for file management (get, list, upload).
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/files.Files.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class Files
  Hierarchy: BaseModule -> Files
  Defined in: files.ts:16

  Constructor:
    new Files(apiClient: ApiClient): Files
      Parameters:
        apiClient: ApiClient
      Returns: Files
      Overrides: BaseModule.constructor
      Defined in: files.ts:17

  Methods:
    get:
      Signature: get(params: GetFileParameters): Promise<File>
      Description: Retrieves the file information from the service.
      Parameters:
        params: GetFileParameters - The parameters for the get request
      Returns: Promise<File> - The Promise that resolves to the types.File object requested.
      Defined in: files.ts:214

    list:
      Signature: list(params?: ListFilesParameters): Promise<Pager<File>>
      Description: Lists all current project files from the service.
      Parameters:
        params: ListFilesParameters = {} - The parameters for the list request
      Returns: Promise<Pager<File>> - The paginated results of the list of files
      Defined in: files.ts:38

    upload:
      Signature: upload(params: UploadFileParameters): Promise<File>
      Description: Uploads a file asynchronously to the Gemini API. This method is not available in Vertex AI. Supported upload sources: Node.js: File path (string) or Blob object. Browser: Blob object (e.g., File).
      Parameters:
        params: UploadFileParameters - Optional parameters specified in the `common.UploadFileParameters` interface. Optional
      Returns: Promise<File> - A promise that resolves to a `types.File` object.
      Remarks: The `mimeType` can be specified in the `config` parameter. If omitted: For file path (string) inputs, the `mimeType` will be inferred from the file extension. For Blob object inputs, the `mimeType` will be set to the Blob's `type` property. Some examples for file extension to mimeType mapping: .txt -> text/plain .json -> application/json .jpg -> image/jpeg .png -> image/png .mp3 -> audio/mpeg .mp4 -> video/mp4
      Throws:
        - An error if called on a Vertex AI client.
        - An error if the `mimeType` is not provided and can not be inferred, the `mimeType` can be provided in the `params.config` parameter.
        - An error occurs if a suitable upload location cannot be established.
      Defined in: files.ts:91
```

----------------------------------------

TITLE: LiveClientContent Interface API Reference
DESCRIPTION: API documentation for the `LiveClientContent` interface, which facilitates incremental updates to a conversation delivered from the client. All content provided through this interface is appended to the conversation history and used as part of the prompt, interrupting any ongoing model generation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveClientContent.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveClientContent {
  // Description: Incremental update of the current conversation delivered from the client.
  // All the content here will unconditionally be appended to the conversation history and used as part of the prompt to the model to generate content.
  // A message here will interrupt any current model generation.

  turnComplete?: boolean;
    // Description: If true, indicates that the server content generation should start with the currently accumulated prompt. Otherwise, the server will await additional messages before starting generation.

  turns?: Content[];
    // Description: The content appended to the current conversation with the model.
    // For single-turn queries, this is a single instance. For multi-turn queries, this is a repeated field that contains conversation history and latest request.
}
```

----------------------------------------

TITLE: Tool Interface API Definition
DESCRIPTION: Defines the `Tool` interface, which specifies the details of a tool that a model can use to generate a response. It includes optional properties for various tool types like code execution, function declarations, and Google Search capabilities.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Tool.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface Tool:
  Description: Tool details of a tool that the model may use to generate a response.
  Properties:
    codeExecution?: ToolCodeExecution
      Description: Optional. CodeExecution tool type. Enables the model to execute code as part of generation. This field is only used by the Gemini Developer API services.
    functionDeclarations?: FunctionDeclaration[]
      Description: List of function declarations that the tool supports.
    googleSearch?: GoogleSearch
      Description: Optional. Google Search tool type. Specialized retrieval tool that is powered by Google Search.
    googleSearchRetrieval?: GoogleSearchRetrieval
      Description: Optional. GoogleSearchRetrieval tool type. Specialized retrieval tool that is powered by Google search.
    retrieval?: Retrieval
      Description: Optional. Retrieval tool type. System will always execute the provided retrieval tool(s) to get external knowledge to answer the prompt. Retrieval results are presented to the model for generation.
```

----------------------------------------

TITLE: Define Image Interface
DESCRIPTION: Defines the structure for the Image object, representing an image either by GCS URI, base64 encoded bytes, or MIME type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_141

LANGUAGE: APIDOC
CODE:
```
Image:
  gcsUri?: string
  imageBytes?: string
  mimeType?: string
```

----------------------------------------

TITLE: APIDOC: @google/genai Interface Blob
DESCRIPTION: Defines the `Blob` interface used in the `@google/genai` library, representing content blobs with optional raw data and MIME type properties.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Blob.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface Blob {
  description: "Content blob."
  properties: {
    data?: {
      type: "string",
      description: "Required. Raw bytes."
    },
    mimeType?: {
      type: "string",
      description: "Required. The IANA standard MIME type of the source data."
    }
  }
}
```

----------------------------------------

TITLE: SendMessageParameters Interface Definition and Details
DESCRIPTION: Defines the structure for parameters used when sending a message in a chat session via the `chat.sendMessage()` method, including its optional configuration and required message content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SendMessageParameters.html#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface SendMessageParameters {
    config?: GenerateContentConfig;
    message: PartListUnion;
}
```

LANGUAGE: APIDOC
CODE:
```
Interface: SendMessageParameters
  Description: Parameters for sending a message within a chat session. These parameters are used with the `chat.sendMessage()` method.

  Properties:
    config (Optional):
      Type: GenerateContentConfig
      Description: Config for this specific request. Please note that the per-request config does not change the chat level config, nor inherit from it. If you intend to use some values from the chat's default config, you must explicitly copy them into this per-request config.
      Defined in: types.ts:2287

    message:
      Type: PartListUnion
      Description: The message to send to the model. The SDK will combine all parts into a single 'user' content to send to the model.
      Defined in: types.ts:2279
```

----------------------------------------

TITLE: API Class: Files Module
DESCRIPTION: Provides methods for file management operations such as deleting, downloading, getting, listing, and uploading files.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_79

LANGUAGE: APIDOC
CODE:
```
// @public
export class Files extends BaseModule {
    constructor(apiClient: ApiClient);
    delete(params: types.DeleteFileParameters): Promise<types.DeleteFileResponse>;
    download(params: types.DownloadFileParameters): Promise<void>;
    get(params: types.GetFileParameters): Promise<types.File>;
    list: (params?: types.ListFilesParameters) => Promise<Pager<types.File>>;
    upload(params: types.UploadFileParameters): Promise<types.File>;
}
```

----------------------------------------

TITLE: HarmBlockThreshold Enumeration Definition
DESCRIPTION: Defines the HarmBlockThreshold enumeration, which specifies the sensitivity levels for blocking harmful content. Each member represents a different threshold for content moderation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.HarmBlockThreshold.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Enumeration HarmBlockThreshold
  Defined in types.ts:46

  Members:
    BLOCK_LOW_AND_ABOVE: "BLOCK_LOW_AND_ABOVE"
      Defined in types.ts:48
    BLOCK_MEDIUM_AND_ABOVE: "BLOCK_MEDIUM_AND_ABOVE"
      Defined in types.ts:49
    BLOCK_NONE: "BLOCK_NONE"
      Defined in types.ts:51
    BLOCK_ONLY_HIGH: "BLOCK_ONLY_HIGH"
      Defined in types.ts:50
    HARM_BLOCK_THRESHOLD_UNSPECIFIED: "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
      Defined in types.ts:47
    OFF: "OFF"
      Defined in types.ts:52
```

----------------------------------------

TITLE: APIDOC: Interface SafetyRating
DESCRIPTION: Represents a safety rating for content, indicating if it's blocked, its harm category, probability, probability score, and severity.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_245

LANGUAGE: typescript
CODE:
```
export interface SafetyRating {
    blocked?: boolean;
    category?: HarmCategory;
    probability?: HarmProbability;
    probabilityScore?: number;
    severity?: HarmSeverity;
}
```

----------------------------------------

TITLE: Upload File Parameters Interface
DESCRIPTION: Defines the parameters for uploading a file, including configuration options and the file content itself (string or Blob).
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_298

LANGUAGE: APIDOC
CODE:
```
UploadFileParameters:
  config?: UploadFileConfig
  file: string | globalThis.Blob
```

----------------------------------------

TITLE: Get File Information using Google GenAI JavaScript Client
DESCRIPTION: Demonstrates how to retrieve information for a specific file using the `ai.files.get` method. This requires a `GetFileParameters` object specifying the file's name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/files.Files.html#_snippet_1

LANGUAGE: typescript
CODE:
```
const config: GetFileParameters = {  name: fileName,};
file = await ai.files.get(config);
console.log(file.name);
```

----------------------------------------

TITLE: APIDOC: FunctionDeclaration Interface Definition
DESCRIPTION: Defines the `FunctionDeclaration` interface, which specifies a function for which an AI model can generate JSON inputs. It adheres to OpenAPI 3.0 specifications and includes properties for function description, name, input parameters, and expected response schema.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.FunctionDeclaration.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface FunctionDeclaration {
  description?: string;
  name?: string;
  parameters?: Schema;
  response?: Schema;
}

Properties:
  description?: string
    Optional. Description and purpose of the function. Model uses it to decide how and whether to call the function.
  name?: string
    Required. The name of the function to call. Must start with a letter or an underscore. Must be a-z, A-Z, 0-9, or contain underscores, dots and dashes, with a maximum length of 64.
  parameters?: Schema
    Optional. Describes the parameters to this function in JSON Schema Object format. Reflects the Open API 3.03 Parameter Object. string Key: the name of the parameter. Parameter names are case sensitive. Schema Value: the Schema defining the type used for the parameter. For function with no parameters, this can be left unset. Parameter names must start with a letter or an underscore and must only contain chars a-z, A-Z, 0-9, or underscores with a maximum length of 64. Example with 1 required and 1 optional parameter: type: OBJECT properties: param1: type: STRING param2: type: INTEGER required: - param1
  response?: Schema
    Describes the output from the function in the OpenAPI JSON Schema Object format.
```

----------------------------------------

TITLE: API Interface: ListModelsParameters
DESCRIPTION: Specifies the parameters for a model listing request, primarily containing the configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_154

LANGUAGE: APIDOC
CODE:
```
Interface ListModelsParameters:
  config?: ListModelsConfig // (undocumented)
```

----------------------------------------

TITLE: GeneratedVideo Interface
DESCRIPTION: Represents a single generated video, containing the video data.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_97

LANGUAGE: TypeScript
CODE:
```
export interface GeneratedVideo {
    video?: Video;
}
```

LANGUAGE: APIDOC
CODE:
```
interface GeneratedVideo:
  video?: Video - Optional generated video data.
```

----------------------------------------

TITLE: Google GenAI Caches Module API Reference
DESCRIPTION: API documentation for the `caches` module within the `@google/genai` library, detailing the available classes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/caches.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Module: caches
  Classes:
    Caches
```

----------------------------------------

TITLE: APIDOC: GetModelConfig Interface
DESCRIPTION: Configuration options for retrieving model information, including support for abort signals and HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_114

LANGUAGE: APIDOC
CODE:
```
GetModelConfig:
  abortSignal?: AbortSignal (Optional)
  httpOptions?: HttpOptions (Optional)
```

----------------------------------------

TITLE: Configure GoogleGenAI for Vertex AI API Version
DESCRIPTION: Demonstrates how to initialize the `GoogleGenAI` client to use a specific API version, such as `v1`, for Vertex AI, overriding the default beta endpoints. This is useful for accessing stable features.
SOURCE: https://github.com/googleapis/js-genai/blob/main/README.md#_snippet_8

LANGUAGE: typescript
CODE:
```
const ai = new GoogleGenAI({
    vertexai: true,
    project: 'your_project',
    location: 'your_location',
    apiVersion: 'v1'
});
```

----------------------------------------

TITLE: API Reference: generateImages Function
DESCRIPTION: Documents the `generateImages` function, which generates images based on a text description and configuration. It accepts `GenerateImagesParameters` and returns a `Promise` resolving to `GenerateImagesResponse`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_6

LANGUAGE: APIDOC
CODE:
```
generateImages(
  params: GenerateImagesParameters
): Promise<GenerateImagesResponse>

Description: Generates an image based on a text description and configuration.

Parameters:
- params: GenerateImagesParameters
    The parameters for generating images.

Returns: Promise<GenerateImagesResponse>
    The response from the API.
```

----------------------------------------

TITLE: API Reference: sendMessageStream Method (Google GenAI)
DESCRIPTION: Documents the `sendMessageStream` method, which sends a message to a model and receives responses in an asynchronous stream. It details parameters, return types, and important remarks regarding its behavior and relationship to other methods.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_5

LANGUAGE: APIDOC
CODE:
```
sendMessageStream(params: SendMessageParameters): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
  Description: Sends a message to the model and returns the response in chunks.
  Parameters:
    params: SendMessageParameters
      description: parameters for sending the message.
  Returns: Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
    description: The model's response.
  Remarks: This method will wait for the previous message to be processed before sending the next message.
  See: Chat#sendMessage for non-streaming method.
```

----------------------------------------

TITLE: GenerateContentResponse Class
DESCRIPTION: Represents the response from a content generation request, including generated candidates, prompt feedback, and usage metadata.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_93

LANGUAGE: TypeScript
CODE:
```
export class GenerateContentResponse {
    automaticFunctionCallingHistory?: Content[];
    candidates?: Candidate[];
    get codeExecutionResult(): string | undefined;
    createTime?: string;
    get data(): string | undefined;
    get executableCode(): string | undefined;
    get functionCalls(): FunctionCall[] | undefined;
    modelVersion?: string;
    promptFeedback?: GenerateContentResponsePromptFeedback;
    responseId?: string;
    get text(): string | undefined;
    usageMetadata?: GenerateContentResponseUsageMetadata;
}
```

LANGUAGE: APIDOC
CODE:
```
class GenerateContentResponse:
  automaticFunctionCallingHistory?: Content[] - Optional history of automatic function calls.
  candidates?: Candidate[] - Optional list of generated content candidates.
  codeExecutionResult: string | undefined - Getter for code execution result.
  createTime?: string - Optional creation timestamp of the response.
  data: string | undefined - Getter for raw data from the response.
  executableCode: string | undefined - Getter for executable code from the response.
  functionCalls: FunctionCall[] | undefined - Getter for function calls made by the model.
  modelVersion?: string - Optional version of the model used.
  promptFeedback?: GenerateContentResponsePromptFeedback - Optional feedback on the prompt.
  responseId?: string - Optional unique identifier for the response.
  text: string | undefined - Getter for the generated text content.
  usageMetadata?: GenerateContentResponseUsageMetadata - Optional metadata about token usage.
```

----------------------------------------

TITLE: Interface: CreateChatParameters
DESCRIPTION: Defines the parameters required for initiating a chat session. This includes configuration settings, historical chat content, and the specific model to be used for the conversation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_29

LANGUAGE: APIDOC
CODE:
```
interface CreateChatParameters
  config?: GenerateContentConfig
  history?: Content[]
  model: string
```

----------------------------------------

TITLE: Function: createPartFromUri
DESCRIPTION: Constructs a content part from a URI. This is useful for referencing external content, requiring both the URI and its MIME type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_40

LANGUAGE: APIDOC
CODE:
```
function createPartFromUri(uri: string, mimeType: string): Part
```

----------------------------------------

TITLE: GroundingChunkRetrievedContext Interface API Documentation
DESCRIPTION: API documentation for the `GroundingChunkRetrievedContext` interface, which represents a chunk of context retrieved by retrieval tools. It outlines the optional properties available for such a chunk, including text content, a title, and a URI reference.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GroundingChunkRetrievedContext.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface GroundingChunkRetrievedContext
Description: Chunk from context retrieved by the retrieval tools.

Properties:
  text?: string
    Description: Text of the attribution.
    Defined in: types.ts:826
  title?: string
    Description: Title of the attribution.
    Defined in: types.ts:828
  uri?: string
    Description: URI reference of the attribution.
    Defined in: types.ts:830
```

----------------------------------------

TITLE: APIDOC: Interface RetrievalConfig
DESCRIPTION: Configuration for retrieval operations, including language code and geographical coordinates.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_241

LANGUAGE: typescript
CODE:
```
export interface RetrievalConfig {
    languageCode?: string;
    latLng?: LatLng;
}
```

----------------------------------------

TITLE: Setting Up and Running GenAI TypeScript Web Sample
DESCRIPTION: These commands are used to initialize and run the GenAI TypeScript web sample application. `npm install` fetches all project dependencies, and `npm run dev` starts the development server as configured in the project's `package.json`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/web/README.md#_snippet_0

LANGUAGE: Shell
CODE:
```
npm install
npm run dev
```

----------------------------------------

TITLE: Session Class API Reference
DESCRIPTION: Comprehensive API documentation for the `Session` class, representing a connection to the API. It includes details on its constructor, properties, and methods for interaction.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Session.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class Session (Experimental)
  Description: Represents a connection to the API.

  Constructors:
    constructor(conn: WebSocket, apiClient: ApiClient): Session
      Parameters:
        conn: WebSocket
        apiClient: ApiClient
      Returns: Session

  Properties:
    conn: WebSocket (Readonly, Experimental)

  Methods:
    close(): void (Experimental)
      Description: Terminates the WebSocket connection.
      Returns: void

    sendClientContent(params: LiveSendClientContentParameters): void (Experimental)
      Description: Send a message over the established connection.
      Parameters:
        params: LiveSendClientContentParameters
          Contains two optional properties, `turns` and `turnComplete`.
          `turns` will be converted to a `Content[]`.
          `turnComplete: true` [default] indicates that you are done sending content and expect a response.
          If `turnComplete: false`, the server will wait for additional messages before starting generation.
      Returns: void
      Remarks:
        There are two ways to send messages to the live API: `sendClientContent` and `sendRealtimeInput`.
        `sendClientContent` messages are added to the model context in order.
        Having a conversation using `sendClientContent` messages is roughly equivalent to using the `Chat.sendMessageStream`, except that the state of the `chat` history is stored on the API server instead of locally.
        Because of `sendClientContent`'s order guarantee, the model cannot respond as quickly to `sendClientContent` messages as to `sendRealtimeInput` messages. This makes the biggest difference when sending objects that have significant preprocessing time (typically images).
        The `sendClientContent` message sends a `Content[]` which has more options than the `Blob` sent by `sendRealtimeInput`.
        Main use-cases for `sendClientContent` over `sendRealtimeInput` are:
          - Sending anything that can't be represented as a `Blob` (text, `sendClientContent({turns="Hello?"})`).
          - Managing turns when not using audio input and voice activity detection (`sendClientContent({turnComplete:true})` or the short form `sendClientContent()`).
          - Prefilling a conversation context.
```

----------------------------------------

TITLE: Convert ArrayBuffer to Base64 String (JavaScript)
DESCRIPTION: This utility function converts an ArrayBuffer into a base64 encoded string. It iterates through the bytes of the Uint8Array and uses `window.btoa` for encoding.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_7

LANGUAGE: JavaScript
CODE:
```
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
```

----------------------------------------

TITLE: APIDOC: ControlReferenceImage Interface Definition
DESCRIPTION: Defines the `ControlReferenceImage` interface, used to represent an image for control reference in generative AI. It can be a direct control image or a regular image processed by the backend. This interface specifies optional properties for configuration, unique identification, the image data, and its type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ControlReferenceImage.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface ControlReferenceImage:
  Description: A control reference image. The image of the control reference image is either a control image provided by the user, or a regular image which the backend will use to generate a control image of. In the case of the latter, the enable_control_image_computation field in the config should be set to True. A control image is an image that represents a sketch image of areas for the model to fill in based on the prompt.

  Properties:
    config?: ControlReferenceConfig
      Description: Configuration for the control reference image.
      Defined in: types.ts:2007
    referenceId?: number
      Description: The id of the reference image.
      Defined in: types.ts:2003
    referenceImage?: Image
      Description: The reference image for the editing operation.
      Defined in: types.ts:2001
    referenceType?: string
      Description: The type of the reference image. Only set by the SDK.
      Defined in: types.ts:2005
```

----------------------------------------

TITLE: TypeScript Interface: TokensInfo
DESCRIPTION: Provides information about tokens, including their role, IDs, and actual token strings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_275

LANGUAGE: TypeScript
CODE:
```
export interface TokensInfo {
    role?: string;
    tokenIds?: string[];
    tokens?: string[];
}
```

----------------------------------------

TITLE: API Definition: SpeakerVoiceConfig Interface in TypeScript
DESCRIPTION: Configures speaker and voice settings for audio output.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_257

LANGUAGE: APIDOC
CODE:
```
SpeakerVoiceConfig:
  speaker: string (optional)
  voiceConfig: VoiceConfig (optional)
```

----------------------------------------

TITLE: API Interface: LiveConnectConstraints
DESCRIPTION: Specifies constraints for a live connection, including the configuration and the model to be used.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_167

LANGUAGE: APIDOC
CODE:
```
Interface LiveConnectConstraints:
  config?: LiveConnectConfig
  model?: string
```

----------------------------------------

TITLE: Pager Class API Reference
DESCRIPTION: Comprehensive API documentation for the Pager<T> class, detailing its constructor, accessors, and methods for managing paginated data.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/pagers.Pager.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class Pager<T>
  Description: Pager class for iterating through paginated results.
  Type Parameters: T
  Implements: AsyncIterable<T>
  Defined in: pagers.ts:38

  Constructors:
    constructor(name: PagedItem, request: (params: PagedItemConfig) => Promise<PagedItemResponse<T>>, response: PagedItemResponse<T>, params: PagedItemConfig): Pager<T>
      Type Parameters: T
      Parameters:
        name: PagedItem
        request: (params: PagedItemConfig) => Promise<PagedItemResponse<T>>
        response: PagedItemResponse<T>
        params: PagedItemConfig
      Returns: Pager<T>
      Defined in: pagers.ts:48

  Accessors:
    name: get name(): PagedItem
      Description: Returns the type of paged item (for example, `batch_jobs`).
      Returns: PagedItem
      Defined in: pagers.ts:100

    page: get page(): T[]
      Description: Returns the current page, which is a list of items.
      Remarks: The first page is retrieved when the pager is created. The returned list of items could be a subset of the entire list.
      Returns: T[]
      Defined in: pagers.ts:93

    pageLength: get pageLength(): number
      Description: Returns the total number of items in the current page.
      Returns: number
      Defined in: pagers.ts:129

    pageSize: get pageSize(): number
      Description: Returns the length of the page fetched each time by this pager.
      Remarks: The number of items in the page is less than or equal to the page length.
      Returns: number
      Defined in: pagers.ts:110

    params: get params(): PagedItemConfig
      Description: Returns the parameters when making the API request for the next page.
      Remarks: Parameters contain a set of optional configs that can be used to customize the API request. For example, the `pageToken` parameter contains the token to request the next page.
      Returns: PagedItemConfig
      Defined in: pagers.ts:122

  Methods:
    [asyncIterator]: "[asyncIterator]"(): AsyncIterator<T>
      Description: Returns an async iterator that support iterating through all items retrieved from the API.
      Remarks: The iterator will automatically fetch the next page if there are more items to fetch from the API.
      Returns: AsyncIterator<T>
      Implementation of AsyncIterable.[asyncIterator]
      Defined in: pagers.ts:157

    getItem: getItem(index: number): T
      Description: Returns the item at the given index.
      Parameters:
        index: number
      Returns: T
      Defined in: pagers.ts:136
```

----------------------------------------

TITLE: GenerateContentResponsePromptFeedback Class API Reference
DESCRIPTION: Detailed API documentation for the `GenerateContentResponsePromptFeedback` class, including its constructor and properties related to content filtering and safety ratings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponsePromptFeedback.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class GenerateContentResponsePromptFeedback:
  Description: Content filter results for a prompt sent in the request.
  Source: types.ts:972

  Constructors:
    constructor(): GenerateContentResponsePromptFeedback
      Returns: GenerateContentResponsePromptFeedback

  Properties:
    blockReason?: BlockedReason
      Description: Output only. Blocked reason.
      Type: BlockedReason
      Source: types.ts:974
    blockReasonMessage?: string
      Description: Output only. A readable block reason message.
      Type: string
      Source: types.ts:976
    safetyRatings?: SafetyRating[]
      Description: Output only. Safety ratings.
      Type: SafetyRating[]
      Source: types.ts:978
```

----------------------------------------

TITLE: API Definition: SafetySetting Interface in TypeScript
DESCRIPTION: Defines the structure for safety settings, including category, method, and threshold for harm blocking.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_246

LANGUAGE: APIDOC
CODE:
```
SafetySetting:
  category: HarmCategory (optional)
  method: HarmBlockMethod (optional)
  threshold: HarmBlockThreshold (optional)
```

----------------------------------------

TITLE: Toggle Audio Recording State (JavaScript)
DESCRIPTION: This snippet defines the click handler for a "record" button, toggling between starting and stopping the real-time audio recording process. It updates the button's text to reflect the current state.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_4

LANGUAGE: JavaScript
CODE:
```
document.getElementById("record").onclick = async function (evt) {
  if (isRecording) {
    recordStop();
  } else {
    await recordStart();
  }
};
```

----------------------------------------

TITLE: Interface: CreateTuningJobParameters
DESCRIPTION: Specifies the parameters required to initiate a model tuning job. It includes the base model to be tuned, an optional configuration, and the training dataset.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_42

LANGUAGE: APIDOC
CODE:
```
interface CreateTuningJobParameters
  baseModel: string
  config?: CreateTuningJobConfig
  trainingDataset: TuningDataset
```

----------------------------------------

TITLE: API Class: Chats
DESCRIPTION: Provides methods for creating and managing chat instances.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_5

LANGUAGE: APIDOC
CODE:
```
class Chats:
  constructor(modelsModule: Models, apiClient: ApiClient)
  create(params: types.CreateChatParameters): Chat
```

----------------------------------------

TITLE: Example: Delete Cached Content by Name
DESCRIPTION: Illustrates how to delete a previously cached content resource using the `ai.caches.delete` method. The content is identified by its unique name, and the method returns an empty response upon successful deletion.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/caches.Caches.html#_snippet_3

LANGUAGE: JavaScript
CODE:
```
await ai.caches.delete({name: 'gemini-1.5-flash'});
```

----------------------------------------

TITLE: Example: List Cached Content Configurations
DESCRIPTION: Demonstrates how to retrieve a paginated list of cached content configurations using `ai.caches.list`. The example shows how to iterate through the results, optionally specifying a page size for pagination.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/caches.Caches.html#_snippet_5

LANGUAGE: JavaScript
CODE:
```
const cachedContents = await ai.caches.list({config: {'pageSize': 2}});
for (const cachedContent of cachedContents) {
  console.log(cachedContent);
}
```

----------------------------------------

TITLE: APIDOC: LiveSendToolResponseParameters Class Definition
DESCRIPTION: Defines the structure and members of the LiveSendToolResponseParameters class, used for encapsulating parameters when sending tool responses to the live API.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.LiveSendToolResponseParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class LiveSendToolResponseParameters
  Description: Parameters for sending tool responses to the live API.
  Defined in: types.ts:2307

  Constructors:
    constructor()
      Returns: LiveSendToolResponseParameters

  Properties:
    functionResponses: FunctionResponse | FunctionResponse[] = []
      Description: Tool responses to send to the session.
      Defined in: types.ts:2309
```

----------------------------------------

TITLE: TypeScript Interface: SupervisedTuningSpec
DESCRIPTION: Defines parameters for supervised model tuning, including options for exporting checkpoints and specifying training/validation datasets.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_270

LANGUAGE: TypeScript
CODE:
```
export interface SupervisedTuningSpec {
    exportLastCheckpointOnly?: boolean;
    hyperParameters?: SupervisedHyperParameters;
    trainingDatasetUri?: string;
    validationDatasetUri?: string;
}
```

----------------------------------------

TITLE: API Definition: SpeechConfig Interface in TypeScript
DESCRIPTION: Defines speech configuration settings, including language code, multi-speaker, and single voice configurations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_258

LANGUAGE: APIDOC
CODE:
```
SpeechConfig:
  languageCode: string (optional)
  multiSpeakerVoiceConfig: MultiSpeakerVoiceConfig (optional)
  voiceConfig: VoiceConfig (optional)
```

----------------------------------------

TITLE: FileState Enumeration API Reference
DESCRIPTION: API documentation for the `FileState` enumeration, which defines the possible states of a file. This enumeration is defined in `types.ts` and includes states such as unspecified, processing, active, and failed.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.FileState.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration FileState
  Defined in types.ts:151

  Members:
    STATE_UNSPECIFIED: "STATE_UNSPECIFIED"
      Defined in types.ts:152
    PROCESSING: "PROCESSING"
      Defined in types.ts:153
    ACTIVE: "ACTIVE"
      Defined in types.ts:154
    FAILED: "FAILED"
      Defined in types.ts:155
```

----------------------------------------

TITLE: API Reference for SafetySetting Interface
DESCRIPTION: Defines the structure for safety settings, including properties for harm category, block method, and block threshold. This interface is part of the `@google/genai` library, used for configuring content safety in generative AI models.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SafetySetting.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface SafetySetting {
  Description: Safety settings.
  Properties:
    category?: HarmCategory
      Description: Required. Harm category.
      Defined in: types.ts:504
    method?: HarmBlockMethod
      Description: Determines if the harm block method uses probability or probability and severity scores.
      Defined in: types.ts:502
    threshold?: HarmBlockThreshold
      Description: Required. The harm block threshold.
      Defined in: types.ts:506
}
```

----------------------------------------

TITLE: FinishReason Enum
DESCRIPTION: Defines the possible reasons why a content generation operation might finish. These reasons indicate whether the generation completed successfully, was stopped, or encountered a safety or other issue.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_84

LANGUAGE: TypeScript
CODE:
```
export enum FinishReason {
    FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED",
    IMAGE_SAFETY = "IMAGE_SAFETY",
    LANGUAGE = "LANGUAGE",
    MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL",
    MAX_TOKENS = "MAX_TOKENS",
    OTHER = "OTHER",
    PROHIBITED_CONTENT = "PROHIBITED_CONTENT",
    RECITATION = "RECITATION",
    SAFETY = "SAFETY",
    SPII = "SPII",
    STOP = "STOP",
    UNEXPECTED_TOOL_CALL = "UNEXPECTED_TOOL_CALL"
}
```

LANGUAGE: APIDOC
CODE:
```
enum FinishReason:
  FINISH_REASON_UNSPECIFIED: Default value, unspecified finish reason.
  IMAGE_SAFETY: Generation stopped due to image safety concerns.
  LANGUAGE: Generation stopped due to language-related issues.
  MALFORMED_FUNCTION_CALL: Generation stopped due to a malformed function call.
  MAX_TOKENS: Generation stopped because the maximum number of tokens was reached.
  OTHER: Other unspecified reason.
  PROHIBITED_CONTENT: Generation stopped due to prohibited content.
  RECITATION: Generation stopped due to recitation of copyrighted material.
  SAFETY: Generation stopped due to general safety concerns.
  SPII: Generation stopped due to Personally Identifiable Information (PII).
  STOP: Generation stopped by a stop sequence.
  UNEXPECTED_TOOL_CALL: Generation stopped due to an unexpected tool call.
```

----------------------------------------

TITLE: API Documentation for FinishReason Enumeration
DESCRIPTION: This section provides the API documentation for the `FinishReason` enumeration from the `@google/genai` library. It defines various reasons for the completion or termination of a text generation operation, including specific safety reasons, token limits, and other conditions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.FinishReason.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration FinishReason
  Defined in types.ts:60

  Members:
    BLOCKLIST: "BLOCKLIST" (Defined in types.ts:67)
    FINISH_REASON_UNSPECIFIED: "FINISH_REASON_UNSPECIFIED" (Defined in types.ts:61)
    IMAGE_SAFETY: "IMAGE_SAFETY" (Defined in types.ts:71)
    MALFORMED_FUNCTION_CALL: "MALFORMED_FUNCTION_CALL" (Defined in types.ts:70)
    MAX_TOKENS: "MAX_TOKENS" (Defined in types.ts:63)
    OTHER: "OTHER" (Defined in types.ts:66)
    PROHIBITED_CONTENT: "PROHIBITED_CONTENT" (Defined in types.ts:68)
    RECITATION: "RECITATION" (Defined in types.ts:65)
    SAFETY: "SAFETY" (Defined in types.ts:64)
    SPII: "SPII" (Defined in types.ts:69)
    STOP: "STOP" (Defined in types.ts:62)
```

----------------------------------------

TITLE: Convert Base64 Audio to Float32Array (JavaScript)
DESCRIPTION: This function converts a base64 encoded string representing 16-bit PCM audio data into a Float32Array, suitable for Web Audio API processing. It handles byte-to-sample conversion and normalization.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_1

LANGUAGE: JavaScript
CODE:
```
function base64ToFloat32AudioData(base64String) {
  const byteCharacters = atob(base64String);
  const byteArray = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray.push(byteCharacters.charCodeAt(i));
  }
  const audioChunks = new Uint8Array(byteArray);
  // Convert Uint8Array (which contains 16-bit PCM) to Float32Array
  const length = audioChunks.length / 2; // 16-bit audio, so 2 bytes per sample
  const float32AudioData = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    // Combine two bytes into one 16-bit signed integer (little-endian)
    let sample = audioChunks[i * 2] | (audioChunks[i * 2 + 1] << 8);
    // Convert from 16-bit PCM to Float32 (range -1 to 1)
    if (sample >= 32768) sample -= 65536;
    float32AudioData[i] = sample / 32768;
  }
  return float32AudioData;
}
```

----------------------------------------

TITLE: FunctionCall Interface API Reference
DESCRIPTION: Comprehensive API documentation for the `FunctionCall` interface, detailing its structure and the purpose of each property.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.FunctionCall.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface FunctionCall:
  Description: A function call.
  Defined in: types.ts:219
  Properties:
    args?: Record<string, unknown>
      Description: Optional. Required. The function parameters and values in JSON object format. See [FunctionDeclaration.parameters] for parameter details.
      Defined in: types.ts:224
    id?: string
      Description: The unique id of the function call. If populated, the client to execute the function_call and return the response with the matching id.
      Defined in: types.ts:222
    name?: string
      Description: Required. The name of the function to call. Matches [FunctionDeclaration.name].
      Defined in: types.ts:226
```

----------------------------------------

TITLE: Weighted Prompt Interface
DESCRIPTION: Defines a prompt with an associated weight, allowing for weighted contributions in multi-prompt scenarios.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_314

LANGUAGE: APIDOC
CODE:
```
WeightedPrompt:
  text?: string
  weight?: number
```

----------------------------------------

TITLE: TypeScript Interface: UpdateCachedContentConfig
DESCRIPTION: Configuration for updating cached content, including options for abort signals, expiration times, and HTTP settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_293

LANGUAGE: TypeScript
CODE:
```
export interface UpdateCachedContentConfig {
    abortSignal?: AbortSignal;
    expireTime?: string;
    httpOptions?: HttpOptions;
    ttl?: string;
}
```

----------------------------------------

TITLE: LiveClientSetup Interface API Reference
DESCRIPTION: Defines the `LiveClientSetup` interface, which encapsulates configuration parameters for a streaming session. These parameters control aspects like generation behavior, model selection, system instructions, and available tools.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveClientSetup.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveClientSetup:
  Description: Message contains configuration that will apply for the duration of the streaming session.
  Properties:
    generationConfig?: GenerationConfig
      Description: The generation configuration for the session.
      Supported Fields: response_logprobs, response_mime_type, logprobs, response_schema, stop_sequence, routing_config, audio_timestamp
    model?: string
      Description: The fully qualified name of the publisher model or tuned model endpoint to use.
    systemInstruction?: Content
      Description: The user provided system instructions for the model. Note: only text should be used in parts and content in each part will be in a separate paragraph.
    tools?: ToolListUnion
      Description: A list of `Tools` the model may use to generate the next response. A `Tool` is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the model.
```

----------------------------------------

TITLE: responseModalities Parameter
DESCRIPTION: The requested modalities of the response. Represents the set of modalities that the model can return.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_14

LANGUAGE: TypeScript
CODE:
```
responseModalities?: string[]
```

----------------------------------------

TITLE: responseMimeType Parameter
DESCRIPTION: Output response media type of the generated candidate text.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_13

LANGUAGE: TypeScript
CODE:
```
responseMimeType?: string
```

----------------------------------------

TITLE: Compute Tokens with @google/genai
DESCRIPTION: Demonstrates how to use the `computeTokens` method of the `Models` class to get token information for a given content string. Note that this method is not supported by the Gemini Developer API.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_1

LANGUAGE: javascript
CODE:
```
const response = await ai.models.computeTokens({ model: 'gemini-2.0-flash', contents: 'What is your name?'});console.log(response);
```

----------------------------------------

TITLE: tools Parameter
DESCRIPTION: Code that enables the system to interact with external systems to perform an action outside of the knowledge and scope of the model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_25

LANGUAGE: TypeScript
CODE:
```
tools?: ToolListUnion
```

----------------------------------------

TITLE: API Definition: StyleReferenceImage Class in TypeScript
DESCRIPTION: Represents a style reference image with configuration, ID, image data, and type, including a method to convert to an internal API format.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_262

LANGUAGE: APIDOC
CODE:
```
StyleReferenceImage Class:
  Properties:
    config: StyleReferenceConfig (optional)
    referenceId: number (optional)
    referenceImage: Image_2 (optional)
    referenceType: string (optional)
  Methods:
    toReferenceImageAPI(): ReferenceImageAPIInternal
```

----------------------------------------

TITLE: Define HarmCategory Enum
DESCRIPTION: Defines the categories of potential harm, such as dangerous content, hate speech, or sexually explicit material.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_134

LANGUAGE: APIDOC
CODE:
```
HarmCategory:
  HARM_CATEGORY_CIVIC_INTEGRITY = "HARM_CATEGORY_CIVIC_INTEGRITY"
  HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT"
  HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT"
  HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH"
  HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT"
  HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED"
```

----------------------------------------

TITLE: TypeScript Interface: TuningJob
DESCRIPTION: Describes a job for tuning a model, encompassing various configurations, states, and associated models.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_289

LANGUAGE: TypeScript
CODE:
```
export interface TuningJob {
    baseModel?: string;
    createTime?: string;
    description?: string;
    distillationSpec?: DistillationSpec;
    encryptionSpec?: EncryptionSpec;
    endTime?: string;
    error?: GoogleRpcStatus;
    experiment?: string;
    labels?: Record<string, string>;
    name?: string;
    partnerModelTuningSpec?: PartnerModelTuningSpec;
    pipelineJob?: string;
    serviceAccount?: string;
    startTime?: string;
    state?: JobState;
    supervisedTuningSpec?: SupervisedTuningSpec;
    tunedModel?: TunedModel;
    tunedModelDisplayName?: string;
    tuningDataStats?: TuningDataStats;
    updateTime?: string;
}
```

----------------------------------------

TITLE: EmbedContentMetadata Interface Definition
DESCRIPTION: Defines the `EmbedContentMetadata` interface, which provides request-level metadata specifically for the Vertex Embed Content API. It includes properties like `billableCharacterCount` to track usage.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.EmbedContentMetadata.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface EmbedContentMetadata
Description: Request-level metadata for the Vertex Embed Content API.

Properties:
  billableCharacterCount?: number
    Description: Vertex API only. The total number of billable characters included in the request.
    Defined in: types.ts:1314
```

----------------------------------------

TITLE: APIDOC: GetOperationParameters Interface
DESCRIPTION: Parameters for retrieving the status of a specific long-running operation by its name, along with optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_117

LANGUAGE: APIDOC
CODE:
```
GetOperationParameters:
  config?: GetOperationConfig (Optional)
  operationName: string (Required)
```

----------------------------------------

TITLE: API Interface: EmbedContentMetadata
DESCRIPTION: Provides metadata about content embedding operations, such as the billable character count.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_66

LANGUAGE: APIDOC
CODE:
```
// @public
export interface EmbedContentMetadata {
    billableCharacterCount?: number;
}
```

----------------------------------------

TITLE: API Interface: LiveClientRealtimeInput
DESCRIPTION: Specifies real-time input data from the client during a live session, such as audio, video, text, and activity markers.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_163

LANGUAGE: APIDOC
CODE:
```
Interface LiveClientRealtimeInput:
  activityEnd?: ActivityEnd
  activityStart?: ActivityStart
  audio?: Blob_2
  audioStreamEnd?: boolean
  mediaChunks?: Blob_2[]
  text?: string
  video?: Blob_2
```

----------------------------------------

TITLE: APIDOC: Interface EmbedContentParameters for Content Embedding
DESCRIPTION: Defines the parameters required for the `embed_content` method in the `@google/genai` library. It specifies the content to be embedded, the model to use, and optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.EmbedContentParameters.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface EmbedContentParameters:
  Description: Parameters for the embed_content method.
  Properties:
    config?: EmbedContentConfig
      Description: Configuration that contains optional parameters.
      Defined in: types.ts:1284
    contents: ContentListUnion
      Description: The content to embed. Only the `parts.text` fields will be counted.
      Defined in: types.ts:1281
    model: string
      Description: ID of the model to use. For a list of models, see Google models (https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models).
      Defined in: types.ts:1278
```

----------------------------------------

TITLE: API Interface: FileData
DESCRIPTION: Defines basic file data, including display name, file URI, and MIME type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_78

LANGUAGE: APIDOC
CODE:
```
// @public
export interface FileData {
    displayName?: string;
    fileUri?: string;
    mimeType?: string;
}
```

----------------------------------------

TITLE: APIDOC Class: MaskReferenceImage
DESCRIPTION: Represents an image used for mask referencing, including its configuration, reference ID, and a method to convert it to an API-internal format.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_199

LANGUAGE: APIDOC
CODE:
```
MaskReferenceImage:
  config?: MaskReferenceConfig
  referenceId?: number
  referenceImage?: Image_2
  referenceType?: string
  toReferenceImageAPI(): ReferenceImageAPIInternal
```

----------------------------------------

TITLE: maxOutputTokens Parameter
DESCRIPTION: Maximum number of tokens that can be generated in the response.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_9

LANGUAGE: TypeScript
CODE:
```
maxOutputTokens?: number
```

----------------------------------------

TITLE: APIDOC Class: LiveSendToolResponseParameters
DESCRIPTION: Defines the parameters for sending responses from tools, which can be a single function response or an array of responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_187

LANGUAGE: APIDOC
CODE:
```
LiveSendToolResponseParameters:
  functionResponses: FunctionResponse[] | FunctionResponse
```

----------------------------------------

TITLE: Interface ComputeTokensParameters Definition
DESCRIPTION: Defines the structure and properties required for computing tokens using the `@google/genai` library. This interface specifies optional configuration, the input content, and the model ID.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ComputeTokensParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface ComputeTokensParameters {
  config?: ComputeTokensConfig;
  contents: ContentListUnion;
  model: string;
}

Properties:
  config?: ComputeTokensConfig
    Optional parameters for the request.
  contents: ContentListUnion
    Input content.
  model: string
    ID of the model to use. For a list of models, see `Google models <https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models>`.
```

----------------------------------------

TITLE: APIDOC: FileData Interface Definition
DESCRIPTION: Documentation for the `FileData` interface, which represents URI-based data. It defines optional properties for the file URI and its MIME type, crucial for identifying and categorizing data sources.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.FileData.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface FileData
  Description: URI based data.
  Definition:
    interface FileData {
      fileUri?: string;
      mimeType?: string;
    }
  Properties:
    fileUri:
      Type: string
      Optional: true
      Description: Required. URI.
    mimeType:
      Type: string
      Optional: true
      Description: Required. The IANA standard MIME type of the source data.
```

----------------------------------------

TITLE: VoiceConfig Interface Definition
DESCRIPTION: Defines the `VoiceConfig` interface, which specifies parameters for voice configuration, including an optional `prebuiltVoiceConfig` property for pre-defined voice settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.VoiceConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface VoiceConfig
  Description: The configuration for the voice to use.
  Properties:
    prebuiltVoiceConfig?: PrebuiltVoiceConfig
      Description: The configuration for the speaker to use.
      Defined in: types.ts:625
```

----------------------------------------

TITLE: ToolConfig Interface Definition
DESCRIPTION: Defines the structure for tool configuration, shared across all tools provided in the request. It includes an optional property for function calling configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ToolConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface ToolConfig
  Description: Tool config. This config is shared for all tools provided in the request.
  Defined in: types.ts:609
  Properties:
    functionCallingConfig?: FunctionCallingConfig
      Description: Optional. Function calling config.
      Defined in: types.ts:611
```

----------------------------------------

TITLE: Example: Retrieve Cached Content by Name
DESCRIPTION: Shows how to fetch a specific cached content configuration using the `ai.caches.get` method. The content is retrieved by providing its unique name, returning the `CachedContent` object if found.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/caches.Caches.html#_snippet_4

LANGUAGE: JavaScript
CODE:
```
await ai.caches.get({name: 'gemini-1.5-flash'});
```

----------------------------------------

TITLE: Function: createModelContent
DESCRIPTION: A utility function to create content suitable for model input. It accepts either a union of part lists or a simple string as input.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_33

LANGUAGE: APIDOC
CODE:
```
function createModelContent(partOrString: PartListUnion | string): Content
```

----------------------------------------

TITLE: Caches Module for Cached Content Management
DESCRIPTION: The Caches class provides an interface for managing cached content within the @google/genai API. It allows for creating, retrieving, updating, listing, and deleting cached content entries.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_1

LANGUAGE: APIDOC
CODE:
```
// Warning: (ae-forgotten-export) The symbol "BaseModule" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export class Caches extends BaseModule {
    // Warning: (ae-forgotten-export) The symbol "ApiClient" needs to be exported by the entry point index.d.ts
    constructor(apiClient: ApiClient);
    create(params: types.CreateCachedContentParameters): Promise<types.CachedContent>;
    delete(params: types.DeleteCachedContentParameters): Promise<types.DeleteCachedContentResponse>;
    get(params: types.GetCachedContentParameters): Promise<types.CachedContent>;
    // Warning: (ae-forgotten-export) The symbol "types" needs to be exported by the entry point index.d.ts
    list: (params?: types.ListCachedContentsParameters) => Promise<Pager<types.CachedContent>>;
    update(params: types.UpdateCachedContentParameters): Promise<types.CachedContent>;
}
```

----------------------------------------

TITLE: Google GenAI API Utility Functions
DESCRIPTION: Provides a list of utility functions available in the @google/genai library, primarily for creating and manipulating content parts.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/types.html#_snippet_10

LANGUAGE: APIDOC
CODE:
```
createModelContent
createPartFromBase64
createPartFromCodeExecutionResult
createPartFromExecutableCode
createPartFromFunctionCall
createPartFromFunctionResponse
createPartFromText
createPartFromUri
createUserContent
```

----------------------------------------

TITLE: API Interface: CountTokensConfig
DESCRIPTION: Configuration options for counting tokens, including abort signal, generation config, and tools.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_22

LANGUAGE: APIDOC
CODE:
```
interface CountTokensConfig:
  abortSignal?: AbortSignal
  generationConfig?: GenerationConfig
  httpOptions?: HttpOptions
  systemInstruction?: ContentUnion
  tools?: Tool[]
```

----------------------------------------

TITLE: API Interface: LiveCallbacks
DESCRIPTION: Defines callback functions for handling events during a live session, such as connection close, errors, messages, and connection open.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_160

LANGUAGE: APIDOC
CODE:
```
Interface LiveCallbacks:
  onclose?: ((e: CloseEvent) => void) | null
  onerror?: ((e: ErrorEvent) => void) | null
  onmessage: (e: LiveServerMessage) => void
  onopen?: (() => void) | null
```

----------------------------------------

TITLE: API Class: EmbedContentResponse
DESCRIPTION: Represents the response from a content embedding operation, containing the embeddings and metadata.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_68

LANGUAGE: APIDOC
CODE:
```
// @public
export class EmbedContentResponse {
    embeddings?: ContentEmbedding[];
    metadata?: EmbedContentMetadata;
}
```

----------------------------------------

TITLE: Function: createUserContent
DESCRIPTION: A utility function to create user-specific content. Similar to createModelContent, it accepts a union of part lists or a string.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_43

LANGUAGE: APIDOC
CODE:
```
function createUserContent(partOrString: PartListUnion | string): Content
```

----------------------------------------

TITLE: Update Model Configuration Interface
DESCRIPTION: Specifies configuration options for updating a generative model, such as abort signals, checkpoint IDs, display names, and HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_295

LANGUAGE: APIDOC
CODE:
```
UpdateModelConfig:
  abortSignal?: AbortSignal
  defaultCheckpointId?: string
  description?: string
  displayName?: string
  httpOptions?: HttpOptions
```

----------------------------------------

TITLE: Play Queued Audio Chunks with Web Audio API (JavaScript)
DESCRIPTION: This asynchronous function processes and plays audio data from a queue using the Web Audio API. It creates an AudioContext, AudioBuffer, and AudioBufferSourceNode, scheduling playback sequentially to ensure smooth audio output.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_3

LANGUAGE: JavaScript
CODE:
```
async function playAudioData() {
  queueProcessing = true;
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new AudioContext();
    nextStartTime = audioCtx.currentTime;
  }
  while (messageQueue.length > 0) {
    const audioChunks = messageQueue.shift();
    // Create an AudioBuffer (Assuming 1 channel and 24k sample rate)
    const audioBuffer = audioCtx.createBuffer(1, audioChunks.length, 24000);
    audioBuffer.copyToChannel(audioChunks, 0);
    // Create an AudioBufferSourceNode
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    // Connect the source to the destination (speakers)
    source.connect(audioCtx.destination);
    // Schedule the audio to play
    if (nextStartTime < audioCtx.currentTime) {
      nextStartTime = audioCtx.currentTime;
    }
    source.start(nextStartTime);
    // Advance the next start time by the duration of the current buffer
    nextStartTime += audioBuffer.duration;
  }
  queueProcessing = false;
}
```

----------------------------------------

TITLE: TypeScript Enum: Type (Schema)
DESCRIPTION: Defines common data types for schema definitions, such as array, boolean, integer, string, and object.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_292

LANGUAGE: TypeScript
CODE:
```
export enum Type {
    ARRAY = "ARRAY",
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    NULL = "NULL",
    NUMBER = "NUMBER",
    OBJECT = "OBJECT",
    STRING = "STRING",
    TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED"
}
```

----------------------------------------

TITLE: TypeScript Interface: ThinkingConfig
DESCRIPTION: Configuration for enabling and managing 'thinking' processes in a model, such as including internal thoughts and setting a budget.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_273

LANGUAGE: TypeScript
CODE:
```
export interface ThinkingConfig {
    includeThoughts?: boolean;
    thinkingBudget?: number;
}
```

----------------------------------------

TITLE: TypeScript Class: Tokens Module
DESCRIPTION: Represents a module for managing authentication tokens, providing methods to create new tokens.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_274

LANGUAGE: TypeScript
CODE:
```
export class Tokens extends BaseModule {
    constructor(apiClient: ApiClient);
    create(params: types.CreateAuthTokenParameters): Promise<types.AuthToken>;
}
```

----------------------------------------

TITLE: Live Class API Reference
DESCRIPTION: API documentation for the `Live` class, detailing its constructor and the `connect` method for establishing live interactions with generative models. This class is marked as experimental.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Live.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class Live (Experimental)
  Description: Encapsulates the configuration for live interaction with the Generative Language API. It embeds ApiClient for general API settings.

  Constructors:
    constructor(apiClient: ApiClient, auth: Auth, webSocketFactory: WebSocketFactory): Live
      Parameters:
        apiClient: ApiClient
        auth: Auth
        webSocketFactory: WebSocketFactory
      Returns: Live

  Methods:
    connect(params: LiveConnectParameters): Promise<Session>
      Description: Establishes a connection to the specified model with the given configuration and returns a Session object representing that connection.
      Parameters:
        params: LiveConnectParameters - The parameters for establishing a connection to the model.
      Returns: Promise<Session> - A live session.
      Remarks: If using the Gemini API, Live is currently only supported behind API version `v1alpha`. Ensure that the API version is set to `v1alpha` when initializing the SDK if relying on the Gemini API.
```

----------------------------------------

TITLE: GoogleGenAI Client Module API Reference
DESCRIPTION: API documentation for the @google/genai client module, detailing its main components: the GoogleGenAI class and the GoogleGenAIOptions interface.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/client.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Module: client
  Classes:
    - GoogleGenAI
  Interfaces:
    - GoogleGenAIOptions
```

----------------------------------------

TITLE: Image Generation Configuration Properties
DESCRIPTION: These are optional parameters that can be used to customize the behavior of image generation requests. They control aspects like output format, storage location, content filtering, and deterministic generation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateImagesConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
outputCompressionQuality?: number
  Compression quality of the generated image (for image/jpeg only).
```

LANGUAGE: APIDOC
CODE:
```
outputGcsUri?: string
  Cloud Storage URI used to store the generated images.
```

LANGUAGE: APIDOC
CODE:
```
outputMimeType?: string
  MIME type of the generated image.
```

LANGUAGE: APIDOC
CODE:
```
personGeneration?: PersonGeneration enum
  Allows generation of people by the model.
```

LANGUAGE: APIDOC
CODE:
```
safetyFilterLevel?: SafetyFilterLevel enum
  Filter level for safety filtering.
```

LANGUAGE: APIDOC
CODE:
```
seed?: number
  Random seed for image generation. This is not available when add_watermark is set to true.
```

----------------------------------------

TITLE: API Interface: EncryptionSpec
DESCRIPTION: Defines encryption specifications, typically for KMS key names.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_69

LANGUAGE: APIDOC
CODE:
```
// @public
export interface EncryptionSpec {
    kmsKeyName?: string;
}
```

----------------------------------------

TITLE: Google GenAI API Types
DESCRIPTION: Lists the various data structures and interfaces defined within the @google/genai library, used for configuring requests and interpreting responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/types.html#_snippet_8

LANGUAGE: APIDOC
CODE:
```
LogprobsResultCandidate
LogprobsResultTopCandidates
MaskReferenceConfig
MaskReferenceImage
ModalityTokenCount
Part
PrebuiltVoiceConfig
RawReferenceImage
ReplayFile
ReplayInteraction
ReplayRequest
Retrieval
RetrievalMetadata
SafetyAttributes
SafetyRating
SafetySetting
Schema
SearchEntryPoint
Segment
SendMessageParameters
SpeechConfig
StyleReferenceConfig
StyleReferenceImage
SubjectReferenceConfig
SubjectReferenceImage
TestTableFile
TestTableItem
ThinkingConfig
TokensInfo
Tool
ToolCodeExecution
ToolConfig
UpdateCachedContentConfig
UpdateCachedContentParameters
UploadFileConfig
UpscaleImageConfig
UpscaleImageParameters
VertexAISearch
VertexRagStore
VertexRagStoreRagResource
VideoMetadata
VoiceConfig
```

----------------------------------------

TITLE: Interface: CreateFileParameters
DESCRIPTION: Defines the parameters necessary for creating a file. This includes an optional configuration object and the file content itself, represented by File_2.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_31

LANGUAGE: APIDOC
CODE:
```
interface CreateFileParameters
  config?: CreateFileConfig
  file: File_2
```

----------------------------------------

TITLE: JavaScript: Example of Updating Cached Content Configuration
DESCRIPTION: An example demonstrating how to use the `update` method of the `caches` API in JavaScript to modify cached content configurations, specifically setting a Time-To-Live (TTL) for a named cache.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/caches.Caches.html#_snippet_7

LANGUAGE: JavaScript
CODE:
```
const response = await ai.caches.update({  name: 'gemini-1.5-flash',  config: {'ttl': '7600s'}});
```

----------------------------------------

TITLE: API Interface: LiveClientSetup
DESCRIPTION: Defines the initial setup configuration for a live client session, including model, generation, and input/output settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_164

LANGUAGE: APIDOC
CODE:
```
Interface LiveClientSetup:
  contextWindowCompression?: ContextWindowCompressionConfig
  generationConfig?: GenerationConfig
  inputAudioTranscription?: AudioTranscriptionConfig
  model?: string
  outputAudioTranscription?: AudioTranscriptionConfig
  proactivity?: ProactivityConfig
  realtimeInputConfig?: RealtimeInputConfig
  sessionResumption?: SessionResumptionConfig
  systemInstruction?: ContentUnion
  tools?: ToolListUnion
```

----------------------------------------

TITLE: sendToolResponse: Send Function Response
DESCRIPTION: Sends a function response message over the established connection. This method is used to reply to `LiveServerToolCall` messages received from the server. Callable functions can be configured using `types.LiveConnectConfig#tools`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Session.html#_snippet_5

LANGUAGE: APIDOC
CODE:
```
sendToolResponse(params: LiveSendToolResponseParameters): void
Experimental

Parameters:
  params: LiveSendToolResponseParameters
    Contains property `functionResponses`.
    `functionResponses` will be converted to a `functionResponses[]`

Returns: void

Remarks:
  Use `sendFunctionResponse` to reply to `LiveServerToolCall` from the server.
  Use [types.LiveConnectConfig#tools](../interfaces/types.LiveConnectConfig.html#tools) to configure the callable functions.
Defined in live.ts:410
```

----------------------------------------

TITLE: APIDOC Interface: LogprobsResultCandidate
DESCRIPTION: Represents a single candidate in log probability results, detailing its log probability, token, and token ID.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_196

LANGUAGE: APIDOC
CODE:
```
LogprobsResultCandidate:
  logProbability?: number
  token?: string
  tokenId?: number
```

----------------------------------------

TITLE: Function: createPartFromBase64
DESCRIPTION: Generates a content part from base64 encoded data. Requires the base64 string and the corresponding MIME type to correctly interpret the data.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_34

LANGUAGE: APIDOC
CODE:
```
function createPartFromBase64(data: string, mimeType: string): Part
```

----------------------------------------

TITLE: Interface LiveClientRealtimeInput Definition
DESCRIPTION: Defines the structure for real-time user input, distinct from `ClientContentUpdate`. It allows continuous data transmission without interrupting model generation, processes data incrementally for fast responses, and is exclusively for user input.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveClientRealtimeInput.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface LiveClientRealtimeInput:
  Description: User input that is sent in real time.
    - Can be sent continuously without interruption to model generation.
    - If there is a need to mix data interleaved across the ClientContentUpdate and the RealtimeUpdate, server attempts to optimize for best response, but there are no guarantees.
    - End of turn is not explicitly specified, but is rather derived from user activity (for example, end of speech).
    - Even before the end of turn, the data is processed incrementally to optimize for a fast start of the response from the model.
    - Is always assumed to be the user's input (cannot be used to populate conversation history).

  Definition:
    interface LiveClientRealtimeInput {
        mediaChunks?: Blob[];
    }

  Properties:
    mediaChunks?: Blob[]
      Description: Inlined bytes data for media input.
      Defined in: types.ts:2177
```

----------------------------------------

TITLE: Function: createPartFromFunctionCall
DESCRIPTION: Generates a content part that represents a function call. It includes the name of the function to be called and a record of its arguments.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_37

LANGUAGE: APIDOC
CODE:
```
function createPartFromFunctionCall(name: string, args: Record<string, unknown>): Part
```

----------------------------------------

TITLE: GoogleGenAI Class API Reference
DESCRIPTION: Detailed API documentation for the GoogleGenAI class, including its constructor and properties. This class serves as the primary interface for Google's Generative AI SDK, allowing interaction with various GenAI features.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/client.GoogleGenAI.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class GoogleGenAI
  Description: The Google GenAI SDK. Provides access to the GenAI features through either the Gemini API or the Vertex AI API. The GoogleGenAIOptions.vertexai value determines which of the API services to use. When using the Gemini API, a GoogleGenAIOptions.apiKey must also be set, when using Vertex AI GoogleGenAIOptions.project and GoogleGenAIOptions.location must also be set.

  Constructors:
    constructor(options: GoogleGenAIOptions): GoogleGenAI
      Parameters:
        options: GoogleGenAIOptions
      Returns: GoogleGenAI

  Properties:
    Readonly caches: Caches
    Readonly chats: Chats
    Readonly files: Files
    Readonly live: Live
    Readonly models: Models
    Readonly vertexai: boolean
```

----------------------------------------

TITLE: Example: Closing a Session Connection
DESCRIPTION: Demonstrates how to terminate an established WebSocket connection using the `close()` method of the `Session` class.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/live.Session.html#_snippet_2

LANGUAGE: JavaScript
CODE:
```
const session = await ai.live.connect({
  model: 'gemini-2.0-flash-exp',
  config: {
    responseModalities: [Modality.AUDIO]
  }
});session.close();
```

----------------------------------------

TITLE: APIDOC: Interface Part
DESCRIPTION: Defines a generic content part, which can represent various types of data such as code execution results, executable code, file data, function calls/responses, inline data, text, or thought metadata.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_218

LANGUAGE: typescript
CODE:
```
export interface Part {
    codeExecutionResult?: CodeExecutionResult;
    executableCode?: ExecutableCode;
    fileData?: FileData;
    functionCall?: FunctionCall;
    functionResponse?: FunctionResponse;
    inlineData?: Blob_2;
    text?: string;
    thought?: boolean;
    thoughtSignature?: string;
    videoMetadata?: VideoMetadata;
}
```

----------------------------------------

TITLE: Interface: DistillationSpec
DESCRIPTION: Specifies the configuration for a model distillation process. It includes details about the base teacher model, hyperparameters, and dataset URIs.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_58

LANGUAGE: APIDOC
CODE:
```
interface DistillationSpec
  baseTeacherModel?: string
  hyperParameters?: DistillationHyperParameters
  pipelineRootDirectory?: string
  studentModel?: string
  trainingDatasetUri?: string
  tunedTeacherModelSource?: string
  validationDatasetUri?: string
```

----------------------------------------

TITLE: Enum: Mode
DESCRIPTION: Specifies operational modes, such as dynamic or unspecified.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_207

LANGUAGE: APIDOC
CODE:
```
enum Mode {
  MODE_DYNAMIC = "MODE_DYNAMIC",
  MODE_UNSPECIFIED = "MODE_UNSPECIFIED"
}
```

----------------------------------------

TITLE: Record Audio using Web Audio API and AudioWorklet (JavaScript)
DESCRIPTION: This function sets up audio recording using `navigator.mediaDevices.getUserMedia` and prepares to process the audio stream with a custom `AudioWorkletProcessor`. It creates an `AudioContext` with a specific sample rate and defines an `AudioWorklet` for real-time audio processing and chunking. Note: The provided code snippet for the `AudioWorklet` registration is incomplete.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_8

LANGUAGE: JavaScript
CODE:
```
async function recordAudio() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
    mediaStream = stream;
    const audioContext = new AudioContext({ sampleRate: 16000 });
    source = audioContext.createMediaStreamSource(stream);
    const workletName = "audio-recorder-worklet";
    const AudioRecordingWorklet = ` class AudioProcessingWorklet extends AudioWorkletProcessor { // send and clear buffer every 2048 samples, // which at 16khz is about 8 times a second buffer = new Int16Array(2048); // current write index bufferWriteIndex = 0; constructor() { super(); this.hasAudio = false; } /** * @param inputs Float32Array[][] [input#][channel#][sample#] so to access first inputs 1st channel inputs[0][0] * @param outputs Float32Array[][] */ process(inputs) { if (inputs[0].length) { const channel0 = inputs[0][0]; this.processChunk(channel0); } return true; } sendAndClearBuffer(){ this.port.postMessage({ event: "chunk", data: { int16arrayBuffer: this.buffer.slice(0, this.bufferWriteIndex).buffer, }, }); this.bufferWriteIndex = 0; } processChunk(float32Array) { const l = float32Array.length; for (let i = 0; i < l; i++) { // convert float32 -1 to 1 to int16 -32768 to 32767 const int16Value = float32Array[i] * 32768; this.buffer[this.bufferWriteIndex++] = int
```

----------------------------------------

TITLE: APIDOC: Chat Class Overview
DESCRIPTION: The `Chat` class in `@google/genai` provides a session-based interface for interacting with generative AI models, maintaining conversation context. It includes methods for managing history and sending messages.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chat.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class Chat
==========
Chat session that enables sending messages to the model with previous conversation context.

Remarks:
The session maintains all the turns between user and model.

Defined in chats.ts:159

Index:
Constructors:
  constructor

Methods:
  getHistory
  sendMessage
  sendMessageStream
```

----------------------------------------

TITLE: Define HarmBlockMethod Enum
DESCRIPTION: Defines the possible methods for blocking harmful content, such as by probability or severity.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_132

LANGUAGE: APIDOC
CODE:
```
HarmBlockMethod:
  HARM_BLOCK_METHOD_UNSPECIFIED = "HARM_BLOCK_METHOD_UNSPECIFIED"
  PROBABILITY = "PROBABILITY"
  SEVERITY = "SEVERITY"
```

----------------------------------------

TITLE: Core @google/genai API Interfaces and Enums
DESCRIPTION: Defines fundamental data structures and enumerated types used across the @google/genai API, including activity handling, authentication configurations, and various content and metadata types.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_0

LANGUAGE: APIDOC
CODE:
```
import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { GoogleAuthOptions } from 'google-auth-library';

// @public
export interface ActivityEnd {
}

// @public
export enum ActivityHandling {
    ACTIVITY_HANDLING_UNSPECIFIED = "ACTIVITY_HANDLING_UNSPECIFIED",
    NO_INTERRUPTION = "NO_INTERRUPTION",
    START_OF_ACTIVITY_INTERRUPTS = "START_OF_ACTIVITY_INTERRUPTS"
}

// @public
export interface ActivityStart {
}

// @public
export enum AdapterSize {
    ADAPTER_SIZE_EIGHT = "ADAPTER_SIZE_EIGHT",
    ADAPTER_SIZE_FOUR = "ADAPTER_SIZE_FOUR",
    ADAPTER_SIZE_ONE = "ADAPTER_SIZE_ONE",
    ADAPTER_SIZE_SIXTEEN = "ADAPTER_SIZE_SIXTEEN",
    ADAPTER_SIZE_THIRTY_TWO = "ADAPTER_SIZE_THIRTY_TWO",
    ADAPTER_SIZE_TWO = "ADAPTER_SIZE_TWO",
    ADAPTER_SIZE_UNSPECIFIED = "ADAPTER_SIZE_UNSPECIFIED"
}

// @public
export interface ApiKeyConfig {
    apiKeyString?: string;
}

// @public
export interface AudioChunk {
    data?: string;
    mimeType?: string;
    sourceMetadata?: LiveMusicSourceMetadata;
}

// @public
export interface AudioTranscriptionConfig {
}

// @public
export interface AuthConfig {
    apiKeyConfig?: ApiKeyConfig;
    authType?: AuthType;
    googleServiceAccountConfig?: AuthConfigGoogleServiceAccountConfig;
    httpBasicAuthConfig?: AuthConfigHttpBasicAuthConfig;
    oauthConfig?: AuthConfigOauthConfig;
    oidcConfig?: AuthConfigOidcConfig;
}

// @public
export interface AuthConfigGoogleServiceAccountConfig {
    serviceAccount?: string;
}

// @public
export interface AuthConfigHttpBasicAuthConfig {
    credentialSecret?: string;
}

// @public
export interface AuthConfigOauthConfig {
    accessToken?: string;
    serviceAccount?: string;
}

// @public
export interface AuthConfigOidcConfig {
    idToken?: string;
    serviceAccount?: string;
}

// @public
export interface AuthToken {
    name?: string;
}

// @public
export enum AuthType {
    API_KEY_AUTH = "API_KEY_AUTH",
    // (undocumented)
    AUTH_TYPE_UNSPECIFIED = "AUTH_TYPE_UNSPECIFIED",
    GOOGLE_SERVICE_ACCOUNT_AUTH = "GOOGLE_SERVICE_ACCOUNT_AUTH",
    HTTP_BASIC_AUTH = "HTTP_BASIC_AUTH",
    NO_AUTH = "NO_AUTH",
    OAUTH = "OAUTH",
    OIDC_AUTH = "OIDC_AUTH"
}

// @public
export interface AutomaticActivityDetection {
    disabled?: boolean;
    endOfSpeechSensitivity?: EndSensitivity;
    prefixPaddingMs?: number;
    silenceDurationMs?: number;
    startOfSpeechSensitivity?: StartSensitivity;
}

// @public
export interface AutomaticFunctionCallingConfig {
    disable?: boolean;
    ignoreCallHistory?: boolean;
    maximumRemoteCalls?: number;
}

// @public
export interface BaseUrlParameters {
    // (undocumented)
    geminiUrl?: string;
    // (undocumented)
    vertexUrl?: string;
}

// @public
export enum Behavior {
    BLOCKING = "BLOCKING",
    NON_BLOCKING = "NON_BLOCKING",
    UNSPECIFIED = "UNSPECIFIED"
}

// @public
interface Blob_2 {
    data?: string;
    displayName?: string;
    mimeType?: string;
}
export { Blob_2 as Blob }

// @public (undocumented)
export type BlobImageUnion = Blob_2;

// @public
export enum BlockedReason {
    BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED",
    BLOCKLIST = "BLOCKLIST",
    OTHER = "OTHER",
    PROHIBITED_CONTENT = "PROHIBITED_CONTENT",
    SAFETY = "SAFETY"
}

// @public
export interface CachedContent {
    createTime?: string;
    displayName?: string;
    expireTime?: string;
    model?: string;
    name?: string;
    updateTime?: string;
    usageMetadata?: CachedContentUsageMetadata;
}

// @public
export interface CachedContentUsageMetadata {
    audioDurationSeconds?: number;
    imageCount?: number;
    textCount?: number;
    totalTokenCount?: number;
    videoDurationSeconds?: number;
}

// @public
export interface CallableTool {
}
```

----------------------------------------

TITLE: FunctionCall Interface
DESCRIPTION: Represents a function call that the model wants to make. This includes the function's name and any arguments to pass to it.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_85

LANGUAGE: TypeScript
CODE:
```
export interface FunctionCall {
    args?: Record<string, unknown>;
    id?: string;
    name?: string;
}
```

LANGUAGE: APIDOC
CODE:
```
interface FunctionCall:
  args?: Record<string, unknown> - Optional arguments to pass to the function, as a key-value pair object.
  id?: string - Optional unique identifier for the function call.
  name?: string - The name of the function to call.
```

----------------------------------------

TITLE: createPartFromUri Function API Reference
DESCRIPTION: Documents the `createPartFromUri` function, which creates a `Part` object from a URI string and its MIME type. This function is part of the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromUri.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Function: createPartFromUri
Description: Creates a `Part` object from a `URI` string.
Signature: createPartFromUri(uri: string, mimeType: string): Part
Parameters:
  uri: string
  mimeType: string
Returns: Part
Defined in: types.ts:277
```

----------------------------------------

TITLE: Function: mcpToTool
DESCRIPTION: Converts client and tool configurations into a CallableTool. This function is publicly exposed.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_202

LANGUAGE: APIDOC
CODE:
```
function mcpToTool(...args: [...Client[], CallableToolConfig | Client]): CallableTool
```

----------------------------------------

TITLE: APIDOC: GenerateVideosConfig Interface
DESCRIPTION: Defines configuration options for generating videos, including settings for aspect ratio, duration, frame rate, audio generation, and prompt enhancements. It also supports HTTP options and signals for abortion.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_101

LANGUAGE: APIDOC
CODE:
```
GenerateVideosConfig:
  abortSignal?: AbortSignal (Optional)
  aspectRatio?: string (Optional)
  durationSeconds?: number (Optional)
  enhancePrompt?: boolean (Optional)
  fps?: number (Optional)
  generateAudio?: boolean (Optional)
  httpOptions?: HttpOptions (Optional)
  lastFrame?: Image_2 (Optional)
  negativePrompt?: string (Optional)
  numberOfVideos?: number (Optional)
  outputGcsUri?: string (Optional)
  personGeneration?: string (Optional)
  pubsubTopic?: string (Optional)
  resolution?: string (Optional)
  seed?: number (Optional)
```

----------------------------------------

TITLE: ToolCodeExecution Interface Definition
DESCRIPTION: Defines the ToolCodeExecution interface, a tool designed to execute code generated by a model and automatically return the results. It is closely related to ExecutableCode (input) and CodeExecutionResult (output).
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ToolCodeExecution.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface ToolCodeExecution
  Description: Tool that executes code generated by the model, and automatically returns the result to the model. See also [ExecutableCode] and [CodeExecutionResult] which are input and output to this tool.
  Defined in: types.ts:580
```

----------------------------------------

TITLE: Interface: DistillationHyperParameters
DESCRIPTION: Defines hyperparameters specific to the distillation process. This includes adapter size, epoch count, and learning rate multiplier.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_57

LANGUAGE: APIDOC
CODE:
```
interface DistillationHyperParameters
  adapterSize?: AdapterSize
  epochCount?: string
  learningRateMultiplier?: number
```

----------------------------------------

TITLE: SafetyRating Interface Definition and Properties
DESCRIPTION: Defines the `SafetyRating` interface, used to provide detailed safety assessments for generated content, including various harm categories, probability levels, and scores.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SafetyRating.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface SafetyRating {
  Description: Safety rating corresponding to the generated content.
  Properties:
    blocked?: boolean
      Description: Output only. Indicates whether the content was filtered out because of this rating.
    category?: HarmCategory
      Description: Output only. Harm category.
    probability?: HarmProbability
      Description: Output only. Harm probability levels in the content.
    probabilityScore?: number
      Description: Output only. Harm probability score.
    severity?: HarmSeverity
      Description: Output only. Harm severity levels in the content.
    severityScore?: number
      Description: Output only. Harm severity score.
}
```

----------------------------------------

TITLE: APIDOC: Interface RagChunk
DESCRIPTION: Represents a chunk of information retrieved from a Retrieval Augmented Generation (RAG) source, including its page span and text content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_225

LANGUAGE: typescript
CODE:
```
export interface RagChunk {
    pageSpan?: RagChunkPageSpan;
    text?: string;
}
```

----------------------------------------

TITLE: APIDOC: SafetyAttributes Interface Definition
DESCRIPTION: Defines the structure for safety attributes associated with generated images or user prompts, including categories and their corresponding scores.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SafetyAttributes.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: SafetyAttributes
Description: Safety attributes of a GeneratedImage or the user-provided prompt.

Properties:
  categories?: string[]
    Description: List of RAI categories.
  scores?: number[]
    Description: List of scores of each categories.
```

----------------------------------------

TITLE: API Interface: ExecutableCode
DESCRIPTION: Defines a structure for executable code, including the code string and its language.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_73

LANGUAGE: APIDOC
CODE:
```
// @public
export interface ExecutableCode {
    code?: string;
    language?: Language;
}
```

----------------------------------------

TITLE: GroundingMetadata Interface Definition
DESCRIPTION: Defines the structure of the `GroundingMetadata` interface, which provides metadata when grounding is enabled in the `@google/genai` library. It includes properties for grounding chunks, supports, retrieval metadata, and search queries.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GroundingMetadata.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface GroundingMetadata {
  Description: Metadata returned to client when grounding is enabled.
  Properties:
    groundingChunks?: GroundingChunk[]
      Description: List of supporting references retrieved from specified grounding source.
    groundingSupports?: GroundingSupport[]
      Description: Optional. List of grounding support.
    retrievalMetadata?: RetrievalMetadata
      Description: Optional. Output only. Retrieval metadata.
    retrievalQueries?: string[]
      Description: Optional. Queries executed by the retrieval tools.
    searchEntryPoint?: SearchEntryPoint
      Description: Optional. Google search entry for the following-up web searches.
    webSearchQueries?: string[]
      Description: Optional. Web search queries for the following-up web search.
}
```

----------------------------------------

TITLE: Upscale Image Configuration Interface
DESCRIPTION: Specifies configuration options for image upscaling operations, such as abort signals, HTTP options, RAI reason inclusion, output quality, and MIME type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_299

LANGUAGE: APIDOC
CODE:
```
UpscaleImageConfig:
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
  includeRaiReason?: boolean
  outputCompressionQuality?: number
  outputMimeType?: string
```

----------------------------------------

TITLE: API Reference: createPartFromFunctionCall Function
DESCRIPTION: Detailed API documentation for the `createPartFromFunctionCall` function, which converts a function call's name and arguments into a `Part` object. This function is defined in `types.ts`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromFunctionCall.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Function: createPartFromFunctionCall
  Signature: createPartFromFunctionCall(name: string, args: Record<string, unknown>): Part
  Description: Creates a Part object from a FunctionCall object.
  Parameters:
    name: string
    args: Record<string, unknown>
  Returns: Part
  Defined in: types.ts:296
```

----------------------------------------

TITLE: HarmCategory Enumeration Definition
DESCRIPTION: This API documentation defines the `HarmCategory` enumeration, which is used to specify different types of content that may be considered harmful. Each member represents a distinct category of harm, such as hate speech or sexually explicit content, and is typically used in content moderation or safety settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.HarmCategory.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Enumeration HarmCategory
  Defined in types.ts:31

  Members:
    HARM_CATEGORY_CIVIC_INTEGRITY: "HARM_CATEGORY_CIVIC_INTEGRITY"
      Defined in types.ts:37
    HARM_CATEGORY_DANGEROUS_CONTENT: "HARM_CATEGORY_DANGEROUS_CONTENT"
      Defined in types.ts:34
    HARM_CATEGORY_HARASSMENT: "HARM_CATEGORY_HARASSMENT"
      Defined in types.ts:35
    HARM_CATEGORY_HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH"
      Defined in types.ts:33
    HARM_CATEGORY_SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT"
      Defined in types.ts:36
    HARM_CATEGORY_UNSPECIFIED: "HARM_CATEGORY_UNSPECIFIED"
      Defined in types.ts:32
```

----------------------------------------

TITLE: HarmProbability Enumeration API Definition
DESCRIPTION: Defines the `HarmProbability` enumeration, used to categorize the likelihood of harmful content. Each member represents a specific level of probability, from unspecified to high.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.HarmProbability.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Enumeration HarmProbability:
  Defined in: types.ts:74
  Members:
    HARM_PROBABILITY_UNSPECIFIED: "HARM_PROBABILITY_UNSPECIFIED"
      Defined in: types.ts:75
    HIGH: "HIGH"
      Defined in: types.ts:79
    LOW: "LOW"
      Defined in: types.ts:77
    MEDIUM: "MEDIUM"
      Defined in: types.ts:78
    NEGLIGIBLE: "NEGLIGIBLE"
      Defined in: types.ts:76
```

----------------------------------------

TITLE: TypeScript Interface: TuningValidationDataset
DESCRIPTION: Defines a dataset specifically for validating model tuning, typically referenced by a GCS URI.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_290

LANGUAGE: TypeScript
CODE:
```
export interface TuningValidationDataset {
    gcsUri?: string;
}
```

----------------------------------------

TITLE: Enum: Outcome
DESCRIPTION: Defines possible outcomes for an operation, such as success, failure, or deadline exceeded.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_215

LANGUAGE: APIDOC
CODE:
```
enum Outcome {
  OUTCOME_DEADLINE_EXCEEDED = "OUTCOME_DEADLINE_EXCEEDED",
  OUTCOME_FAILED = "OUTCOME_FAILED",
  OUTCOME_OK = "OUTCOME_OK",
  OUTCOME_UNSPECIFIED = "OUTCOME_UNSPECIFIED"
}
```

----------------------------------------

TITLE: API Definition: GenerationConfigRoutingConfigAutoRoutingMode Interface
DESCRIPTION: Detailed API documentation for the `GenerationConfigRoutingConfigAutoRoutingMode` interface, outlining its structure and the `modelRoutingPreference` property with its allowed string literal values for routing configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerationConfigRoutingConfigAutoRoutingMode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface GenerationConfigRoutingConfigAutoRoutingMode {
  Description: When automated routing is specified, the routing will be determined by the pretrained routing model and customer provided model routing preference.
  Properties:
    modelRoutingPreference?: 
      Type: "UNKNOWN" | "PRIORITIZE_QUALITY" | "BALANCED" | "PRIORITIZE_COST"
      Description: The model routing preference.
      Defined in: types.ts:645
}
```

----------------------------------------

TITLE: Google GenAI Chats Module API Reference
DESCRIPTION: API documentation for the `chats` module in the `@google/genai` library, outlining the main classes available for interaction within this module.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/chats.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Module: chats
  Classes:
    - Chat
    - Chats
```

----------------------------------------

TITLE: API Documentation for Outcome Enumeration
DESCRIPTION: This section provides API documentation for the `Outcome` enumeration within the `@google/genai` library. It lists all defined members of the enumeration, specifying their string values and the file location where they are defined.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.Outcome.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration Outcome
  Defined in types.ts:9

  Members:
    OUTCOME_DEADLINE_EXCEEDED: "OUTCOME_DEADLINE_EXCEEDED"
      Defined in types.ts:13
    OUTCOME_FAILED: "OUTCOME_FAILED"
      Defined in types.ts:12
    OUTCOME_OK: "OUTCOME_OK"
      Defined in types.ts:11
    OUTCOME_UNSPECIFIED: "OUTCOME_UNSPECIFIED"
      Defined in types.ts:10
```

----------------------------------------

TITLE: APIDOC: createPartFromCodeExecutionResult Function
DESCRIPTION: Documents the `createPartFromCodeExecutionResult` function, which creates a `Part` object from the `outcome` and `output` of a `CodeExecutionResult`. It details the function signature, parameters, and return type as defined in `types.ts`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromCodeExecutionResult.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Function: createPartFromCodeExecutionResult
  Signature: createPartFromCodeExecutionResult(outcome: Outcome, output: string): Part
  Description: Creates a Part object from the outcome and output of a CodeExecutionResult object.
  Parameters:
    outcome: Outcome
    output: string
  Returns: Part
  Source: types.ts:337
```

----------------------------------------

TITLE: GenerateImagesParameters Interface
DESCRIPTION: Parameters required for an image generation request, including the model to use, the prompt, and optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_99

LANGUAGE: TypeScript
CODE:
```
export interface GenerateImagesParameters {
    config?: GenerateImagesConfig;
    model: string;
    prompt: string;
}
```

LANGUAGE: APIDOC
CODE:
```
interface GenerateImagesParameters:
  config?: GenerateImagesConfig - Optional configuration for image generation.
  model: string - Required name of the model to use for image generation.
  prompt: string - Required text prompt for image generation.
```

----------------------------------------

TITLE: APIDOC: Interface RagRetrievalConfig
DESCRIPTION: Configuration for Retrieval Augmented Generation (RAG) retrieval, including options for filtering, hybrid search, ranking, and the number of top results to retrieve.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_227

LANGUAGE: typescript
CODE:
```
export interface RagRetrievalConfig {
    filter?: RagRetrievalConfigFilter;
    hybridSearch?: RagRetrievalConfigHybridSearch;
    ranking?: RagRetrievalConfigRanking;
    topK?: number;
}
```

----------------------------------------

TITLE: API Reference for createPartFromExecutableCode Function
DESCRIPTION: Documents the `createPartFromExecutableCode` function, which creates a `Part` object from executable code and its language.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromExecutableCode.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Function: createPartFromExecutableCode
Description: Creates a Part object from the code and language of an ExecutableCode object.
Signature: createPartFromExecutableCode(code: string, language: Language): Part[]

Parameters:
  - code: string
    Description: The code string.
  - language: Language
    Description: The language of the code (e.g., from types.Language enum).

Returns:
  - Type: Part[]
    Description: An array of Part objects.

Defined In: types.ts:351
```

----------------------------------------

TITLE: APIDOC: Interface RagRetrievalConfigRanking
DESCRIPTION: Specifies ranking configurations for RAG retrieval, allowing the use of an LLM-based ranker or a dedicated ranking service.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_230

LANGUAGE: typescript
CODE:
```
export interface RagRetrievalConfigRanking {
    llmRanker?: RagRetrievalConfigRankingLlmRanker;
    rankService?: RagRetrievalConfigRankingRankService;
}
```

----------------------------------------

TITLE: Stop Real-time Audio Recording (JavaScript)
DESCRIPTION: This function stops the audio recording by disconnecting the audio source, stopping all media stream tracks, and resetting the recording state. It also updates the "record" button's text.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/index.html#_snippet_5

LANGUAGE: JavaScript
CODE:
```
function recordStop() {
  source?.disconnect();
  mediaStream?.getTracks().forEach((track) => track.stop());
  isRecording = false;
  document.getElementById("record").textContent = "Start Realtime";
}
```

----------------------------------------

TITLE: GenerateContentResponsePromptFeedback Class
DESCRIPTION: Provides feedback on the prompt used in a content generation request, including any blocking reasons or safety ratings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_94

LANGUAGE: TypeScript
CODE:
```
export class GenerateContentResponsePromptFeedback {
    blockReason?: BlockedReason;
    blockReasonMessage?: string;
    safetyRatings?: SafetyRating[];
}
```

LANGUAGE: APIDOC
CODE:
```
class GenerateContentResponsePromptFeedback:
  blockReason?: BlockedReason - Optional reason if the prompt was blocked.
  blockReasonMessage?: string - Optional detailed message for the block reason.
  safetyRatings?: SafetyRating[] - Optional list of safety ratings for the prompt.
```

----------------------------------------

TITLE: Interface: Model
DESCRIPTION: Defines the structure of a generative AI model, including its checkpoints, display name, token limits, and supported actions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_208

LANGUAGE: APIDOC
CODE:
```
interface Model {
  checkpoints?: Checkpoint[];
  defaultCheckpointId?: string;
  description?: string;
  displayName?: string;
  endpoints?: Endpoint[];
  inputTokenLimit?: number;
  labels?: Record<string, string>;
  name?: string;
  outputTokenLimit?: number;
  supportedActions?: string[];
  tunedModelInfo?: TunedModelInfo;
  version?: string;
}
```

----------------------------------------

TITLE: Class: Operations
DESCRIPTION: Provides methods for managing and retrieving long-running operations, specifically for video generation operations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_214

LANGUAGE: APIDOC
CODE:
```
class Operations extends BaseModule {
  constructor(apiClient: ApiClient);
  getVideosOperation(parameters: types.OperationGetParameters): Promise<types.GenerateVideosOperation>;
}
```

----------------------------------------

TITLE: HarmSeverity Enumeration Members
DESCRIPTION: This snippet provides the definition and members of the `HarmSeverity` enumeration, which specifies different levels of harm severity.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.HarmSeverity.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Enumeration HarmSeverity
  Defined in types.ts:82

  Members:
    HARM_SEVERITY_HIGH: "HARM_SEVERITY_HIGH"
      Defined in types.ts:87
    HARM_SEVERITY_LOW: "HARM_SEVERITY_LOW"
      Defined in types.ts:85
    HARM_SEVERITY_MEDIUM: "HARM_SEVERITY_MEDIUM"
      Defined in types.ts:86
    HARM_SEVERITY_NEGLIGIBLE: "HARM_SEVERITY_NEGLIGIBLE"
      Defined in types.ts:84
    HARM_SEVERITY_UNSPECIFIED: "HARM_SEVERITY_UNSPECIFIED"
      Defined in types.ts:83
```

----------------------------------------

TITLE: API Reference: FunctionCallingConfig Interface
DESCRIPTION: Detailed API documentation for the `FunctionCallingConfig` interface, including its properties, types, and descriptions. This interface is used to configure how functions are called within the generative AI model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.FunctionCallingConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface FunctionCallingConfig:
  Description: Function calling config.
  Properties:
    - Name: allowedFunctionNames
      Type: string[]
      Optional: true
      Description: Optional. Function names to call. Only set when the Mode is ANY. Function names should match FunctionDeclaration.name. With mode set to ANY, model will predict a function call from the set of function names provided.
    - Name: mode
      Type: FunctionCallingConfigMode
      Optional: true
      Description: Optional. Function calling mode.
```

----------------------------------------

TITLE: APIDOC: @google/genai ContentUnion Type Alias Definition
DESCRIPTION: Defines the `ContentUnion` type alias, which can be a `Content` interface, an array of `PartUnion` types, or a single `PartUnion` type. This type is crucial for representing various content structures within the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/types/types.ContentUnion.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Type Alias: ContentUnion
  Definition: Content | PartUnion[] | PartUnion
  Source: types.ts:2316
```

----------------------------------------

TITLE: SafetyFilterLevel Enumeration API Definition
DESCRIPTION: Defines the `SafetyFilterLevel` enumeration, which specifies different thresholds for content safety filtering. Each member represents a distinct level at which content should be blocked based on its safety score.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.SafetyFilterLevel.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Enumeration SafetyFilterLevel
  Defined in types.ts:130

  Members:
    BLOCK_LOW_AND_ABOVE: "BLOCK_LOW_AND_ABOVE"
      Defined in types.ts:131
    BLOCK_MEDIUM_AND_ABOVE: "BLOCK_MEDIUM_AND_ABOVE"
      Defined in types.ts:132
    BLOCK_NONE: "BLOCK_NONE"
      Defined in types.ts:134
    BLOCK_ONLY_HIGH: "BLOCK_ONLY_HIGH"
      Defined in types.ts:133
```

----------------------------------------

TITLE: Interface: Operation
DESCRIPTION: Represents a long-running operation, including its completion status, error details, metadata, and name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_212

LANGUAGE: APIDOC
CODE:
```
interface Operation {
  done?: boolean;
  error?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  name?: string;
}
```

----------------------------------------

TITLE: API Reference: LiveConnectConfig Interface
DESCRIPTION: Defines the configuration options for a session with the API connection, including settings for content generation, response modalities, speech, system instructions, and external tools.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveConnectConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface LiveConnectConfig {
  generationConfig?: GenerationConfig;
  responseModalities?: Modality[];
  speechConfig?: SpeechConfig;
  systemInstruction?: Content;
  tools?: ToolListUnion;
}

Properties:

- generationConfig?: GenerationConfig
  Description: The generation configuration for the session.

- responseModalities?: Modality[]
  Description: The requested modalities of the response. Represents the set of modalities that the model can return. Defaults to AUDIO if not specified.

- speechConfig?: SpeechConfig
  Description: The speech generation configuration.

- systemInstruction?: Content
  Description: The user provided system instructions for the model. Note: only text should be used in parts and content in each part will be in a separate paragraph.

- tools?: ToolListUnion
  Description: A list of `Tools` the model may use to generate the next response. A `Tool` is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the model.
```

----------------------------------------

TITLE: API Class: Live
DESCRIPTION: Provides functionality for live interactions, including connecting to a session and accessing live music features. Requires API client, authentication, and a WebSocket factory for instantiation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_159

LANGUAGE: APIDOC
CODE:
```
Class Live:
  constructor(apiClient: ApiClient, auth: Auth, webSocketFactory: WebSocketFactory)
  connect(params: types.LiveConnectParameters): Promise<Session>
  music: LiveMusic // readonly, (undocumented)
```

----------------------------------------

TITLE: LogprobsResultCandidate Interface API Reference
DESCRIPTION: Detailed API documentation for the LogprobsResultCandidate interface, outlining its optional properties: logProbability (number), token (string), and tokenId (number), which represent a candidate token and its associated log probability score.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LogprobsResultCandidate.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: LogprobsResultCandidate
Description: Candidate for the logprobs token and score.

Properties:
  - logProbability?: number
    Description: The candidate's log probability.
  - token?: string
    Description: The candidate's token string value.
  - tokenId?: number
    Description: The candidate's token id value.
```

----------------------------------------

TITLE: Voice Configuration Interface
DESCRIPTION: Specifies configuration for voice synthesis, including prebuilt voice options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_313

LANGUAGE: APIDOC
CODE:
```
VoiceConfig:
  prebuiltVoiceConfig?: PrebuiltVoiceConfig
```

----------------------------------------

TITLE: BlockedReason Enumeration API Definition
DESCRIPTION: Defines the `BlockedReason` enumeration, which specifies the possible reasons for content being blocked in the `@google/genai` library. Each member represents a distinct blocking category with a corresponding string value.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.BlockedReason.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration BlockedReason
  Defined in types.ts:90

  Members:
  BLOCKED_REASON_UNSPECIFIED: "BLOCKED_REASON_UNSPECIFIED"
    Defined in types.ts:91
  BLOCKLIST: "BLOCKLIST"
    Defined in types.ts:94
  OTHER: "OTHER"
    Defined in types.ts:93
  PROHIBITED_CONTENT: "PROHIBITED_CONTENT"
    Defined in types.ts:95
  SAFETY: "SAFETY"
    Defined in types.ts:92
```

----------------------------------------

TITLE: GenerateContentResponseUsageMetadata Class
DESCRIPTION: Provides metadata about token usage for a content generation response, including counts for prompt, candidates, and total tokens.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_95

LANGUAGE: TypeScript
CODE:
```
export class GenerateContentResponseUsageMetadata {
    cachedContentTokenCount?: number;
    cacheTokensDetails?: ModalityTokenCount[];
    candidatesTokenCount?: number;
    candidatesTokensDetails?: ModalityTokenCount[];
    promptTokenCount?: number;
    promptTokensDetails?: ModalityTokenCount[];
    thoughtsTokenCount?: number;
    toolUsePromptTokenCount?: number;
    toolUsePromptTokensDetails?: ModalityTokenCount[];
    totalTokenCount?: number;
    trafficType?: TrafficType;
}
```

LANGUAGE: APIDOC
CODE:
```
class GenerateContentResponseUsageMetadata:
  cachedContentTokenCount?: number - Optional token count for cached content.
  cacheTokensDetails?: ModalityTokenCount[] - Optional detailed token counts for cached content by modality.
  candidatesTokenCount?: number - Optional token count for generated candidates.
  candidatesTokensDetails?: ModalityTokenCount[] - Optional detailed token counts for candidates by modality.
  promptTokenCount?: number - Optional token count for the prompt.
  promptTokensDetails?: ModalityTokenCount[] - Optional detailed token counts for the prompt by modality.
  thoughtsTokenCount?: number - Optional token count for internal thoughts.
  toolUsePromptTokenCount?: number - Optional token count for tool use prompts.
  toolUsePromptTokensDetails?: ModalityTokenCount[] - Optional detailed token counts for tool use prompts by modality.
  totalTokenCount?: number - Optional total token count for the request and response.
  trafficType?: TrafficType - Optional type of traffic associated with the usage.
```

----------------------------------------

TITLE: API Interface: ComputeTokensParameters
DESCRIPTION: Parameters required for computing token counts for a given model and content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_11

LANGUAGE: APIDOC
CODE:
```
interface ComputeTokensParameters:
  config?: ComputeTokensConfig
  contents: ContentListUnion
  model: string
```

----------------------------------------

TITLE: APIDOC: Interface RetrievalMetadata
DESCRIPTION: Metadata associated with a retrieval operation, such as a dynamic retrieval score from Google Search.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_242

LANGUAGE: typescript
CODE:
```
export interface RetrievalMetadata {
    googleSearchDynamicRetrievalScore?: number;
}
```

----------------------------------------

TITLE: SubjectReferenceImage Interface API Definition
DESCRIPTION: Defines the `SubjectReferenceImage` interface, which encapsulates a user-provided subject reference image along with optional configuration parameters. It supports providing a raw reference image as a destination for subject application.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SubjectReferenceImage.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface SubjectReferenceImage
  Description: A subject reference image. This encapsulates a subject reference image provided by the user, and additionally optional config parameters for the subject reference image. A raw reference image can also be provided as a destination for the subject to be applied to.
  Properties:
    config?: SubjectReferenceConfig
      Description: Configuration for the subject reference image.
    referenceId?: number
      Description: The id of the reference image.
    referenceImage?: Image
      Description: The reference image for the editing operation.
    referenceType?: string
      Description: The type of the reference image. Only set by the SDK.
```

----------------------------------------

TITLE: Chats Class API Reference
DESCRIPTION: Detailed API documentation for the `Chats` class, including its constructor and the `create` method for initiating chat sessions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/chats.Chats.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class Chats:
  A utility class to create a chat session.

  Defined in chats.ts:110

  Constructors:
    constructor(modelsModule: Models, apiClient: ApiClient): Chats
      Parameters:
        modelsModule: Models
        apiClient: ApiClient
      Returns: Chats
      Defined in chats.ts:114

  Methods:
    create(params: CreateChatParameters): Chat
      Description: Creates a new chat session.
      Parameters:
        params: CreateChatParameters
          Parameters for creating a chat session.
      Returns: Chat
        A new chat session.
      Remarks: The config in the params will be used for all requests within the chat session unless overridden by a per-request `config` in types.SendMessageParameters#config.
      See: types.SendMessageParameters#config
      Defined in chats.ts:141
```

----------------------------------------

TITLE: Function: createPartFromExecutableCode
DESCRIPTION: Creates a content part containing executable code. This function requires the code string itself and the programming language it is written in.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_36

LANGUAGE: APIDOC
CODE:
```
function createPartFromExecutableCode(code: string, language: Language): Part
```

----------------------------------------

TITLE: Running a Google GenAI Node.js Sample (Shell)
DESCRIPTION: This snippet shows a shell command to execute a compiled Node.js sample from the Google GenAI SDK. It illustrates how to run a specific sample, such as 'generate_content_with_text.js', after the SDK and samples have been built and environment variables are configured.
SOURCE: https://github.com/googleapis/js-genai/blob/main/sdk-samples/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
node build/generate_content_with_text.js
```

----------------------------------------

TITLE: @google/genai Part Interface API Reference
DESCRIPTION: Defines the `Part` interface, a core data type in the `@google/genai` library for representing various types of media content. It specifies that exactly one field within a `Part` instance should be set to indicate the content type. This documentation details all optional properties of the `Part` interface, including their types and descriptions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Part.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: Part
  Description: A datatype containing media content. Exactly one field within a Part should be set, representing the specific type of content being conveyed. Using multiple fields within the same Part instance is considered invalid.
  Defined in: types.ts:254

  Properties:
    codeExecutionResult?: CodeExecutionResult
      Description: Optional. Result of executing the ExecutableCode.
      Defined in: types.ts:260

    executableCode?: ExecutableCode
      Description: Optional. Code generated by the model that is meant to be executed.
      Defined in: types.ts:262

    fileData?: FileData
      Description: Optional. URI based data.
      Defined in: types.ts:264

    functionCall?: FunctionCall
      Description: Optional. A predicted FunctionCall returned from the model that contains a string representing the FunctionDeclaration.name with the parameters and their values.
      Defined in: types.ts:266

    functionResponse?: FunctionResponse
      Description: Optional. The result output of a FunctionCall that contains a string representing the FunctionDeclaration.name and a structured JSON object containing any output from the function call. It is used as context to the model.
      Defined in: types.ts:268

    inlineData?: Blob
      Description: Optional. Inlined bytes data.
      Defined in: types.ts:270

    text?: string
      Description: Optional. Text part (can be code).
      Defined in: types.ts:272

    thought?: boolean
      Description: Indicates if the part is thought from the model.
      Defined in: types.ts:258

    videoMetadata?: VideoMetadata
      Description: Metadata for a given video.
      Defined in: types.ts:256
```

----------------------------------------

TITLE: FunctionResponse Class API Reference
DESCRIPTION: API documentation for the `FunctionResponse` class in the `@google/genai` library, detailing its structure, constructor, and properties for handling function call responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.FunctionResponse.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class FunctionResponse:
  Description: A function response.
  Defined in: types.ts:230

  Constructors:
    constructor(): FunctionResponse

  Properties:
    id?: string
      Description: The id of the function call this response is for. Populated by the client to match the corresponding function call `id`.
      Defined in: types.ts:233

    name?: string
      Description: Required. The name of the function to call. Matches FunctionDeclaration.name and FunctionCall.name.
      Defined in: types.ts:235

    response?: Record<string, unknown>
      Description: Required. The function response in JSON object format. Use "output" key to specify function output and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as function output.
      Defined in: types.ts:237
```

----------------------------------------

TITLE: APIDOC: ContentListUnion Type Alias Definition
DESCRIPTION: This API documentation defines the `ContentListUnion` type alias from the `@google/genai` library. It specifies that `ContentListUnion` can be either an array of `ContentUnion` types or a single `ContentUnion` type, providing flexibility in content representation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/types/types.ContentListUnion.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Type Alias: ContentListUnion
  Description: A type alias representing a list of content or a single content item.
  Type Definition: ContentUnion[] | ContentUnion
  Source: types.ts:2318
```

----------------------------------------

TITLE: APIDOC: Class GenerateContentResponse
DESCRIPTION: Defines the structure of the response message from the PredictionService.GenerateContent API call, including content candidates, metadata, and feedback. This class provides access to various aspects of the model's response, such as generated text, code, and usage information.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponse.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class GenerateContentResponse:
  Description: Response message for PredictionService.GenerateContent.
  Defined in: types.ts:1014

  Constructors:
    constructor(): GenerateContentResponse

  Properties:
    candidates?: Candidate[]
      Description: Response variations returned by the model.
      Defined in: types.ts:1017
    createTime?: string
      Description: Timestamp when the request is made to the server.
      Defined in: types.ts:1020
    modelVersion?: string
      Description: Output only. The model version used to generate the response.
      Defined in: types.ts:1025
    promptFeedback?: GenerateContentResponsePromptFeedback
      Description: Output only. Content filter results for a prompt sent in the request. Note: Sent only in the first stream chunk. Only happens when no candidates were generated due to content violations.
      Defined in: types.ts:1027
    responseId?: string
      Description: Identifier for each response.
      Defined in: types.ts:1023
    usageMetadata?: GenerateContentResponseUsageMetadata
      Description: Usage metadata about the response(s).
      Defined in: types.ts:1029

  Accessors:
    codeExecutionResult: undefined | string
      Description: Returns the first code execution result from the first candidate in the response.
      Remarks: If there are multiple candidates in the response, the code execution result from the first one will be returned. If there are no code execution result in the response, undefined will be returned.
      Returns: undefined | string
      Defined in: types.ts:1224
    executableCode: undefined | string
      Description: Returns the first executable code from the first candidate in the response.
      Remarks: If there are multiple candidates in the response, the executable code from the first one will be returned. If there are no executable code in the response, undefined will be returned.
      Returns: undefined | string
      Defined in: types.ts:1180
```

----------------------------------------

TITLE: API Interface: ComputeTokensConfig
DESCRIPTION: Configuration options for computing token counts, including abort signal and HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_10

LANGUAGE: APIDOC
CODE:
```
interface ComputeTokensConfig:
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
```

----------------------------------------

TITLE: API Class: ComputeTokensResponse
DESCRIPTION: Represents the response containing token information after a token computation request.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_12

LANGUAGE: APIDOC
CODE:
```
class ComputeTokensResponse:
  tokensInfo?: TokensInfo[]
```

----------------------------------------

TITLE: API Interface: LiveMusicClientMessage
DESCRIPTION: Defines the structure of a message sent from the client in a live music session, including client content and music generation configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_171

LANGUAGE: APIDOC
CODE:
```
Interface LiveMusicClientMessage:
  clientContent?: LiveMusicClientContent
  musicGenerationConfig?: LiveMusicGenerationConfig
```

----------------------------------------

TITLE: API Interface: CreateCachedContentConfig
DESCRIPTION: Configuration for creating cached content, including content, display name, expiry, and tool settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_27

LANGUAGE: APIDOC
CODE:
```
interface CreateCachedContentConfig:
  abortSignal?: AbortSignal
  contents?: ContentListUnion
  displayName?: string
  expireTime?: string
  httpOptions?: HttpOptions
  kmsKeyName?: string
  systemInstruction?: ContentUnion
  toolConfig?: ToolConfig
  tools?: Tool[]
  ttl?: string
```

----------------------------------------

TITLE: APIDOC: GenerationConfigThinkingConfig Interface
DESCRIPTION: Configures the 'thinking' process for generation, allowing inclusion of thought processes and setting a budget for thinking time.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_109

LANGUAGE: APIDOC
CODE:
```
GenerationConfigThinkingConfig:
  includeThoughts?: boolean (Optional)
  thinkingBudget?: number (Optional)
```

----------------------------------------

TITLE: Content Interface API Definition
DESCRIPTION: Defines the `Content` interface, a core structure in the `@google/genai` SDK for representing multi-part messages. It includes optional `parts` (an array of `Part` objects) and an optional `role` (string) indicating the content producer.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Content.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface Content {
  Description: Contains the multi-part content of a message.
  Defined in: types.ts:364
  Properties:
    parts?: Part[]
      Description: List of parts that constitute a single message. Each part may have a different IANA MIME type.
      Defined in: types.ts:367
    role?: string
      Description: Optional. The producer of the content. Must be either 'user' or 'model'. Useful to set for multi-turn conversations, otherwise can be left blank or unset. If role is not specified, SDK will determine the role.
      Defined in: types.ts:371
}
```

----------------------------------------

TITLE: APIDOC: Interface ReplayFile
DESCRIPTION: Defines the structure of a replay file, containing a list of interactions and a unique replay ID.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_236

LANGUAGE: typescript
CODE:
```
export interface ReplayFile {
    interactions?: ReplayInteraction[];
    replayId?: string;
}
```

----------------------------------------

TITLE: APIDOC: ControlReferenceConfig Interface
DESCRIPTION: API documentation for the `ControlReferenceConfig` interface, detailing its structure and properties for configuring control reference images.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ControlReferenceConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface ControlReferenceConfig
Configuration for a Control reference image.

interface ControlReferenceConfig {
  controlType?: ControlReferenceType;
  enableControlImageComputation?: boolean;
}

Properties:
- controlType?: ControlReferenceType
  Description: The type of control reference image to use.
  Defined in: types.ts:1982

- enableControlImageComputation?: boolean
  Description: Defaults to False. When set to True, the control image will be computed by the model based on the control type. When set to False, the control image must be provided by the user.
  Defined in: types.ts:1986
```

----------------------------------------

TITLE: Define JobState Enum
DESCRIPTION: Defines the possible states of a job, such as pending, running, succeeded, or failed.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_144

LANGUAGE: APIDOC
CODE:
```
JobState:
  JOB_STATE_CANCELLED = "JOB_STATE_CANCELLED"
  JOB_STATE_CANCELLING = "JOB_STATE_CANCELLING"
  JOB_STATE_EXPIRED = "JOB_STATE_EXPIRED"
  JOB_STATE_FAILED = "JOB_STATE_FAILED"
  JOB_STATE_PARTIALLY_SUCCEEDED = "JOB_STATE_PARTIALLY_SUCCEEDED"
  JOB_STATE_PAUSED = "JOB_STATE_PAUSED"
  JOB_STATE_PENDING = "JOB_STATE_PENDING"
  JOB_STATE_QUEUED = "JOB_STATE_QUEUED"
  JOB_STATE_RUNNING = "JOB_STATE_RUNNING"
  JOB_STATE_SUCCEEDED = "JOB_STATE_SUCCEEDED"
  JOB_STATE_UNSPECIFIED = "JOB_STATE_UNSPECIFIED"
  JOB_STATE_UPDATING = "JOB_STATE_UPDATING"
```

----------------------------------------

TITLE: MaskReferenceConfig Interface API Documentation
DESCRIPTION: Detailed API documentation for the `MaskReferenceConfig` interface, including its properties and their types and descriptions, used for configuring mask reference images in the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.MaskReferenceConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface MaskReferenceConfig
  Configuration for a Mask reference image.

  Properties:
    maskDilation?: number
      Dilation percentage of the mask provided. Float between 0 and 1.
    maskMode?: MaskReferenceMode
      Prompts the model to generate a mask instead of you needing to provide one (unless MASK_MODE_USER_PROVIDED is used).
    segmentationClasses?: number[]
      A list of up to 5 class ids to use for semantic segmentation. Automatically creates an image mask based on specific objects.
```

----------------------------------------

TITLE: CreateCachedContentConfig Interface Properties Reference
DESCRIPTION: Detailed API documentation for the properties of the `CreateCachedContentConfig` interface, outlining their types, optionality, and purpose within the `@google/genai` library for configuring cached content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CreateCachedContentConfig.html#_snippet_2

LANGUAGE: APIDOC
CODE:
```
Interface: CreateCachedContentConfig
  Description: Optional configuration for cached content creation.
  Properties:
    contents:
      Type: ContentListUnion
      Optional: true
      Description: The content to cache.
    displayName:
      Type: string
      Optional: true
      Description: The user-generated meaningful display name of the cached content.
    expireTime:
      Type: string
      Optional: true
      Description: Timestamp of when this resource is considered expired.
    httpOptions:
      Type: HttpOptions
      Optional: true
      Description: Used to override HTTP request options.
    systemInstruction:
      Type: ContentUnion
      Optional: true
      Description: Developer set system instruction.
    toolConfig:
      Type: ToolConfig
      Optional: true
      Description: Configuration for the tools to use. This config is shared for all tools.
    tools:
      Type: Tool[]
      Optional: true
      Description: A list of `Tools` the model may use to generate the next response.
    ttl:
      Type: string
      Optional: true
      Description: The TTL for this resource. The expiration time is computed: now + TTL.
```

----------------------------------------

TITLE: VertexRagStore Interface API Definition
DESCRIPTION: Defines the TypeScript interface for VertexRagStore, which specifies parameters for configuring retrieval from a Vertex RAG Store. It includes optional properties for managing RAG corpora, resources, and fine-tuning search results with similarityTopK and vectorDistanceThreshold.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.VertexRagStore.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface VertexRagStore {
  ragCorpora?: string[];
  ragResources?: VertexRagStoreRagResource[];
  similarityTopK?: number;
  vectorDistanceThreshold?: number;
}

Properties:
  ragCorpora?: string[]
    Optional. Deprecated. Please use rag_resources instead.
    Defined in types.ts:560

  ragResources?: VertexRagStoreRagResource[]
    Optional. The representation of the rag source. It can be used to specify corpus only or ragfiles. Currently only support one corpus or multiple files from one corpus. In the future we may open up multiple corpora support.
    Defined in types.ts:562

  similarityTopK?: number
    Optional. Number of top k results to return from the selected corpora.
    Defined in types.ts:564

  vectorDistanceThreshold?: number
    Optional. Only return results with vector distance smaller than the threshold.
    Defined in types.ts:566
```

----------------------------------------

TITLE: API Interface: EmbedContentConfig
DESCRIPTION: Defines configuration options for content embedding operations, including abort signal, truncation, and output dimensionality.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_65

LANGUAGE: APIDOC
CODE:
```
// @public
export interface EmbedContentConfig {
    abortSignal?: AbortSignal;
    autoTruncate?: boolean;
    httpOptions?: HttpOptions;
    mimeType?: string;
    outputDimensionality?: number;
    taskType?: string;
    title?: string;
}
```

----------------------------------------

TITLE: UpscaleImageConfig Interface Definition
DESCRIPTION: Defines the configuration options for upscaling an image, including HTTP options, RAI reason inclusion, output compression, and MIME type. This interface is used with the Imagen API for image manipulation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.UpscaleImageConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface UpscaleImageConfig:
  Configuration for upscaling an image.
  Properties:
    httpOptions?: HttpOptions
      Used to override HTTP request options.
    includeRaiReason?: boolean
      Whether to include a reason for filtered-out images in the response.
    outputCompressionQuality?: number
      The level of compression if the output_mime_type is image/jpeg.
    outputMimeType?: string
      The image format that the output should be saved as.
```

----------------------------------------

TITLE: APIDOC: ImagePromptLanguage Enumeration Definition
DESCRIPTION: Defines the `ImagePromptLanguage` enumeration, which provides predefined string values for specifying the language of image prompts. Each member represents a specific language code or an automatic detection option.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.ImagePromptLanguage.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Enumeration ImagePromptLanguage
Defined in types.ts:143

Members:
- auto: "auto" (Defined in types.ts:144)
- en: "en" (Defined in types.ts:145)
- hi: "hi" (Defined in types.ts:148)
- ja: "ja" (Defined in types.ts:146)
- ko: "ko" (Defined in types.ts:147)
```

----------------------------------------

TITLE: Define CreateCachedContentConfig Interface
DESCRIPTION: Defines the TypeScript interface `CreateCachedContentConfig` which specifies optional parameters for creating cached content, including content, display name, expiration, HTTP options, system instructions, tool configurations, tools, and time-to-live.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CreateCachedContentConfig.html#_snippet_1

LANGUAGE: TypeScript
CODE:
```
interface CreateCachedContentConfig {
    contents?: ContentListUnion;
    displayName?: string;
    expireTime?: string;
    httpOptions?: HttpOptions;
    systemInstruction?: ContentUnion;
    toolConfig?: ToolConfig;
    tools?: Tool[];
    ttl?: string;
}
```

----------------------------------------

TITLE: responseSchema Parameter
DESCRIPTION: Schema that the generated candidate text must adhere to.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_15

LANGUAGE: TypeScript
CODE:
```
responseSchema?: Schema
```

----------------------------------------

TITLE: API Interface: EditImageParameters
DESCRIPTION: Specifies the parameters required for an image editing request, including the model, prompt, and reference images.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_62

LANGUAGE: APIDOC
CODE:
```
// @public
export interface EditImageParameters {
    config?: EditImageConfig;
    model: string;
    prompt: string;
    referenceImages: ReferenceImage[];
}
```

----------------------------------------

TITLE: API Type Alias: ContentUnion
DESCRIPTION: A union type representing various forms of content, including single content or parts.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_17

LANGUAGE: APIDOC
CODE:
```
type ContentUnion = Content | PartUnion[] | PartUnion
```

----------------------------------------

TITLE: Define ImagePromptLanguage Enum
DESCRIPTION: Defines the supported languages for image prompts, including auto-detection and specific language codes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_142

LANGUAGE: APIDOC
CODE:
```
ImagePromptLanguage:
  auto = "auto"
  en = "en"
  hi = "hi"
  ja = "ja"
  ko = "ko"
```

----------------------------------------

TITLE: GenerateImagesConfig Interface
DESCRIPTION: Configuration options for generating images, including settings for aspect ratio, safety filters, and output format.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_98

LANGUAGE: TypeScript
CODE:
```
export interface GenerateImagesConfig {
    abortSignal?: AbortSignal;
    addWatermark?: boolean;
    aspectRatio?: string;
    enhancePrompt?: boolean;
    guidanceScale?: number;
    httpOptions?: HttpOptions;
    includeRaiReason?: boolean;
    includeSafetyAttributes?: boolean;
    language?: ImagePromptLanguage;
    negativePrompt?: string;
    numberOfImages?: number;
    outputCompressionQuality?: number;
    outputGcsUri?: string;
    outputMimeType?: string;
    personGeneration?: PersonGeneration;
    safetyFilterLevel?: SafetyFilterLevel;
    seed?: number;
}
```

LANGUAGE: APIDOC
CODE:
```
interface GenerateImagesConfig:
  abortSignal?: AbortSignal - Optional signal to abort the request.
  addWatermark?: boolean - Optional flag to add a watermark to generated images.
  aspectRatio?: string - Optional aspect ratio for the generated images.
  enhancePrompt?: boolean - Optional flag to enhance the prompt before generation.
  guidanceScale?: number - Optional guidance scale for image generation.
  httpOptions?: HttpOptions - Optional HTTP request options.
  includeRaiReason?: boolean - Optional flag to include Responsible AI filtering reasons.
  includeSafetyAttributes?: boolean - Optional flag to include safety attributes.
  language?: ImagePromptLanguage - Optional language of the image prompt.
  negativePrompt?: string - Optional negative prompt to guide image generation away from certain concepts.
  numberOfImages?: number - Optional number of images to generate.
  outputCompressionQuality?: number - Optional compression quality for output images.
  outputGcsUri?: string - Optional Google Cloud Storage URI for output.
  outputMimeType?: string - Optional MIME type for output images.
  personGeneration?: PersonGeneration - Optional configuration for person generation.
  safetyFilterLevel?: SafetyFilterLevel - Optional safety filter level for image generation.
  seed?: number - Optional seed for reproducible image generation.
```

----------------------------------------

TITLE: APIDOC: Type PartUnion
DESCRIPTION: Defines a union type for a content part, which can be either a structured Part object or a simple string.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_221

LANGUAGE: typescript
CODE:
```
export type PartUnion = Part | string;
```

----------------------------------------

TITLE: API Reference: GeneratedImage Interface
DESCRIPTION: Defines the structure for an output image generated by the @google/genai library, including properties for the image data, enhanced prompt, and safety attributes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GeneratedImage.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface GeneratedImage {
  Description: An output image.
  Properties:
    enhancedPrompt?: string
      Description: The rewritten prompt used for the image generation if the prompt enhancer is enabled.
    image?: Image
      Description: The output image data.
    raiFilteredReason?: string
      Description: Responsible AI filter reason if the image is filtered out of the response.
    safetyAttributes?: SafetyAttributes
      Description: Safety attributes of the image. Lists of RAI categories and their scores of each content.
}
```

----------------------------------------

TITLE: APIDOC: @google/genai State Enumeration
DESCRIPTION: API documentation for the `State` enumeration, defining possible states for operations or entities within the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.State.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration State
  Defined in types.ts:105

  Members:
    ACTIVE: "ACTIVE"
      Defined in types.ts:107
    ERROR: "ERROR"
      Defined in types.ts:108
    STATE_UNSPECIFIED: "STATE_UNSPECIFIED"
      Defined in types.ts:106
```

----------------------------------------

TITLE: APIDOC: GenerationConfigRoutingConfigManualRoutingMode Interface
DESCRIPTION: Defines the `GenerationConfigRoutingConfigManualRoutingMode` interface, which is used when manual routing is enabled to directly specify a model. It includes a single optional property, `modelName`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerationConfigRoutingConfigManualRoutingMode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: GenerationConfigRoutingConfigManualRoutingMode
Description: When manual routing is set, the specified model will be used directly.

Definition:
interface GenerationConfigRoutingConfigManualRoutingMode {
  modelName?: string;
}

Properties:
  modelName:
    Type: string
    Optional: Yes
    Description: The model name to use. Only the public LLM models are accepted. e.g. 'gemini-1.5-pro-001'.
```

----------------------------------------

TITLE: APIDOC: Interface Retrieval
DESCRIPTION: Configuration for retrieval mechanisms, allowing options to disable attribution and integrate with Vertex AI Search or Vertex RAG Store.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_240

LANGUAGE: typescript
CODE:
```
export interface Retrieval {
    disableAttribution?: boolean;
    vertexAiSearch?: VertexAISearch;
    vertexRagStore?: VertexRagStore;
}
```

----------------------------------------

TITLE: API Interface: ListModelsConfig
DESCRIPTION: Defines configuration options for listing models, including abort signal, filter, HTTP options, pagination, and query base settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_153

LANGUAGE: APIDOC
CODE:
```
Interface ListModelsConfig:
  abortSignal?: AbortSignal
  filter?: string // (undocumented)
  httpOptions?: HttpOptions
  pageSize?: number // (undocumented)
  pageToken?: string // (undocumented)
  queryBase?: boolean
```

----------------------------------------

TITLE: API Interface: ListFilesConfig
DESCRIPTION: Defines configuration options for listing files, including abort signal, HTTP options, and pagination parameters.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_150

LANGUAGE: APIDOC
CODE:
```
Interface ListFilesConfig:
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
  pageSize?: number // (undocumented)
  pageToken?: string // (undocumented)
```

----------------------------------------

TITLE: Interface: DeleteFileConfig
DESCRIPTION: Configuration options for deleting a file. It allows for setting an AbortSignal to cancel the operation and custom HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_50

LANGUAGE: APIDOC
CODE:
```
interface DeleteFileConfig
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
```

----------------------------------------

TITLE: Interface GenerateContentConfig Definition
DESCRIPTION: Defines optional configuration parameters for generative AI models, influencing aspects like output format, safety, and tool integration. This interface is part of the `@google/genai` library and allows fine-grained control over content generation requests.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface GenerateContentConfig {
    audioTimestamp?: boolean;
    cachedContent?: string;
    candidateCount?: number;
    frequencyPenalty?: number;
    httpOptions?: HttpOptions;
    labels?: Record<string, string>;
    logprobs?: number;
    maxOutputTokens?: number;
    mediaResolution?: MediaResolution;
    presencePenalty?: number;
    responseLogprobs?: boolean;
    responseMimeType?: string;
    responseModalities?: string[];
    responseSchema?: Schema;
    routingConfig?: GenerationConfigRoutingConfig;
    safetySettings?: SafetySetting[];
    seed?: number;
    speechConfig?: SpeechConfigUnion;
    stopSequences?: string[];
    systemInstruction?: ContentUnion;
    temperature?: number;
    thinkingConfig?: ThinkingConfig;
    toolConfig?: ToolConfig;
    tools?: ToolListUnion;
    topK?: number;
    topP?: number;
}
```

----------------------------------------

TITLE: PagedItem Enumeration API Reference
DESCRIPTION: API documentation for the `PagedItem` enumeration, which defines string literal values corresponding to different types of paginated items available through the GenAI List APIs. Each member represents a specific resource type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/pagers.PagedItem.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration PagedItem
  Description: Pagers for the GenAI List APIs.
  Defined in: pagers.ts:11

  Members:
    PAGED_ITEM_BATCH_JOBS: "batchJobs"
      Defined in: pagers.ts:12
    PAGED_ITEM_CACHED_CONTENTS: "cachedContents"
      Defined in: pagers.ts:16
    PAGED_ITEM_FILES: "files"
      Defined in: pagers.ts:15
    PAGED_ITEM_MODELS: "models"
      Defined in: pagers.ts:13
    PAGED_ITEM_TUNING_JOBS: "tuningJobs"
      Defined in: pagers.ts:14
```

----------------------------------------

TITLE: API Interface: EditImageConfig
DESCRIPTION: Defines configuration options for image editing operations, including parameters like base steps, edit mode, guidance scale, and output settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_61

LANGUAGE: APIDOC
CODE:
```
interface EditImageConfig {
    baseSteps?: number;
    editMode?: EditMode;
    guidanceScale?: number;
    httpOptions?: HttpOptions;
    includeRaiReason?: boolean;
    includeSafetyAttributes?: boolean;
    language?: ImagePromptLanguage;
    negativePrompt?: string;
    numberOfImages?: number;
    outputCompressionQuality?: number;
    outputGcsUri?: string;
    outputMimeType?: string;
    personGeneration?: PersonGeneration;
    safetyFilterLevel?: SafetyFilterLevel;
    seed?: number;
}
```

----------------------------------------

TITLE: API Documentation for LiveServerContent Interface
DESCRIPTION: This section provides the API documentation for the LiveServerContent interface, which represents incremental server updates generated by a model. It details the properties that indicate the state of content generation, including interruption, the model's current turn content, and the completion of a turn.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveServerContent.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveServerContent:
  Description: Incremental server update generated by the model in response to client messages. Content is generated as quickly as possible, and not in real time. Clients may choose to buffer and play it out in real time.
  Properties:
    interrupted?: boolean
      Description: If true, indicates that a client message has interrupted current model generation. If the client is playing out the content in realtime, this is a good signal to stop and empty the current queue.
    modelTurn?: Content
      Description: The content that the model has generated as part of the current conversation with the user.
    turnComplete?: boolean
      Description: If true, indicates that the model is done generating. Generation will only start in response to additional client messages. Can be set alongside `content`, indicating that the `content` is the last in the turn.
```

----------------------------------------

TITLE: APIDOC: CreateCachedContentParameters Interface Definition
DESCRIPTION: Defines the CreateCachedContentParameters interface, which specifies the parameters required for the caches.create method. It includes an optional configuration object and a mandatory model ID string.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CreateCachedContentParameters.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface CreateCachedContentParameters:
  Parameters for caches.create method.
  Properties:
    config?: CreateCachedContentConfig
      Configuration that contains optional parameters.
    model: string
      ID of the model to use. Example: gemini-1.5-flash
```

----------------------------------------

TITLE: API Interface: CallableToolConfig
DESCRIPTION: Defines configuration options for a callable tool, including behavior and timeout settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_2

LANGUAGE: APIDOC
CODE:
```
interface CallableToolConfig:
  behavior?: Behavior
  timeout?: number
```

----------------------------------------

TITLE: HttpOptions Interface for HTTP Request Configuration
DESCRIPTION: Defines the structure for configuring HTTP requests within the `@google/genai` library, allowing specification of API version, base URL, custom headers, and request timeout.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.HttpOptions.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface HttpOptions
  Description: HTTP options to be used in each of the requests.
  Properties:
    apiVersion?: string
      Description: Specifies the version of the API to use.
    baseUrl?: string
      Description: The base URL for the AI platform service endpoint.
    headers?: Record<string, string>
      Description: Additional HTTP headers to be sent with the request.
    timeout?: number
      Description: Timeout for the request in milliseconds.
```

----------------------------------------

TITLE: API Reference: Classes
DESCRIPTION: Lists all available classes in the Google Generative AI JavaScript client library, representing core data structures, request/response objects, and utility classes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/types.html#_snippet_6

LANGUAGE: APIDOC
CODE:
```
Classes:
  ComputeTokensResponse
  CountTokensResponse
  CreateFileResponse
  DeleteCachedContentResponse
  EmbedContentResponse
  FunctionResponse
  GenerateContentResponse
  GenerateContentResponsePromptFeedback
  GenerateContentResponseUsageMetadata
  GenerateImagesResponse
  HttpResponse
  ListCachedContentsResponse
  ListFilesResponse
  LiveClientToolResponse
  LiveSendToolResponseParameters
  ReplayResponse
```

----------------------------------------

TITLE: API Enum: FinishReason
DESCRIPTION: Enumerates reasons for an operation to finish, such as blocklist.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_83

LANGUAGE: APIDOC
CODE:
```
// @public
export enum FinishReason {
    BLOCKLIST = "BLOCKLIST"
}
```

----------------------------------------

TITLE: API Definition: SpeechConfigUnion Type in TypeScript
DESCRIPTION: Defines a union type that can be either a SpeechConfig object or a string.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_259

LANGUAGE: APIDOC
CODE:
```
SpeechConfigUnion: SpeechConfig | string
```

----------------------------------------

TITLE: API Class: ListFilesResponse
DESCRIPTION: Represents the response structure for a file listing operation, including the list of files and a token for the next page.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_152

LANGUAGE: APIDOC
CODE:
```
Class ListFilesResponse:
  files?: File_2[]
  nextPageToken?: string
```

----------------------------------------

TITLE: API Reference: CreateFileParameters Interface
DESCRIPTION: Defines the structure for parameters used in file creation operations, including an optional configuration object and the required file object with its properties like MIME type and name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CreateFileParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface CreateFileParameters {
  config?: CreateFileConfig; // Used to override the default configuration.
  file: File; // The file to be uploaded.
             // Properties of File:
             //   mime_type: (Required) The MIME type of the file. Must be provided.
             //   name: (Optional) The name of the file in the destination (e.g. 'files/sample-image').
             //   display_name: (Optional) The display name of the file.
}
```

----------------------------------------

TITLE: APIDOC: GenerationConfigRoutingConfigAutoRoutingMode Interface
DESCRIPTION: Defines preferences for automatic model routing, allowing prioritization based on quality, cost, or a balanced approach.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_107

LANGUAGE: APIDOC
CODE:
```
GenerationConfigRoutingConfigAutoRoutingMode:
  modelRoutingPreference?: 'UNKNOWN' | 'PRIORITIZE_QUALITY' | 'BALANCED' | 'PRIORITIZE_COST' (Optional)
```

----------------------------------------

TITLE: API Documentation for DynamicRetrievalConfigMode Enumeration
DESCRIPTION: Documents the DynamicRetrievalConfigMode enumeration, part of the @google/genai library, detailing its structure, definition location, and its enumeration members: MODE_DYNAMIC and MODE_UNSPECIFIED, along with their respective values and definition locations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.DynamicRetrievalConfigMode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration DynamicRetrievalConfigMode
  Defined in types.ts:111

  Members:
    MODE_DYNAMIC: "MODE_DYNAMIC"
      Defined in types.ts:113
    MODE_UNSPECIFIED: "MODE_UNSPECIFIED"
      Defined in types.ts:112
```

----------------------------------------

TITLE: Retrieval Interface Definition
DESCRIPTION: Defines a retrieval tool that a model can call to access external knowledge. This interface allows configuration for different data sources like Vertex AI Search and Vertex RAG store.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Retrieval.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface Retrieval:
  Description: Defines a retrieval tool that model can call to access external knowledge.
  Properties:
    disableAttribution:
      Type: boolean
      Optional: true
      Description: Deprecated. This option is no longer supported.
    vertexAiSearch:
      Type: VertexAISearch
      Optional: true
      Description: Set to use data source powered by Vertex AI Search.
    vertexRagStore:
      Type: VertexRagStore
      Optional: true
      Description: Set to use data source powered by Vertex RAG store. User data is uploaded via the VertexRagDataService.
```

----------------------------------------

TITLE: GroundingChunk Interface API Reference
DESCRIPTION: Detailed API documentation for the `GroundingChunk` interface, part of the `@google/genai` library, outlining its structure and properties for representing grounding information.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GroundingChunk.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: GroundingChunk
  Description: Grounding chunk.

  Properties:
    retrievedContext?: GroundingChunkRetrievedContext
      Description: Grounding chunk from context retrieved by the retrieval tools.
    web?: GroundingChunkWeb
      Description: Grounding chunk from the web.
```

----------------------------------------

TITLE: API Interface: LiveConnectParameters
DESCRIPTION: Defines the parameters required to establish a live connection, including callbacks, configuration, and the model name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_168

LANGUAGE: APIDOC
CODE:
```
Interface LiveConnectParameters:
  callbacks: LiveCallbacks
  config?: LiveConnectConfig
  model: string
```

----------------------------------------

TITLE: FunctionCallingConfigMode Enumeration Definition
DESCRIPTION: Defines the `FunctionCallingConfigMode` enumeration, which specifies different modes for configuring how function calls are handled within the `@google/genai` library. Each member represents a distinct configuration option.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.FunctionCallingConfigMode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration FunctionCallingConfigMode
  Defined in types.ts:116

  Members:
    MODE_UNSPECIFIED: "MODE_UNSPECIFIED" (Defined in types.ts:117)
    AUTO: "AUTO" (Defined in types.ts:118)
    ANY: "ANY" (Defined in types.ts:119)
    NONE: "NONE" (Defined in types.ts:120)
```

----------------------------------------

TITLE: Interface EmbedContentConfig Definition
DESCRIPTION: Defines the configuration options for embedding content, including settings for truncation, HTTP options, MIME type, output dimensionality, task type, and title.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.EmbedContentConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface EmbedContentConfig {
  autoTruncate?: boolean;
    Description: Vertex API only. Whether to silently truncate inputs longer than the max sequence length. If this option is set to false, oversized inputs will lead to an INVALID_ARGUMENT error, similar to other text APIs.
    Defined in: types.ts:1271
  httpOptions?: HttpOptions;
    Description: Used to override HTTP request options.
    Defined in: types.ts:1250
  mimeType?: string;
    Description: Vertex API only. The MIME type of the input.
    Defined in: types.ts:1266
  outputDimensionality?: number;
    Description: Reduced dimension for the output embedding. If set, excessive values in the output embedding are truncated from the end. Supported by newer models since 2024 only. You cannot set this value if using the earlier model (`models/embedding-001`).
    Defined in: types.ts:1263
  taskType?: string;
    Description: Type of task for which the embedding will be used.
    Defined in: types.ts:1253
  title?: string;
    Description: Title for the text. Only applicable when TaskType is `RETRIEVAL_DOCUMENT`.
    Defined in: types.ts:1257
}
```

----------------------------------------

TITLE: Class: Models
DESCRIPTION: Provides methods for interacting with generative AI models, including token computation, content generation, image/video operations, and model management.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_209

LANGUAGE: APIDOC
CODE:
```
class Models extends BaseModule {
  constructor(apiClient: ApiClient);
  computeTokens(params: types.ComputeTokensParameters): Promise<types.ComputeTokensResponse>;
  countTokens(params: types.CountTokensParameters): Promise<types.CountTokensResponse>;
  delete(params: types.DeleteModelParameters): Promise<types.DeleteModelResponse>;
  editImage: (params: types.EditImageParameters) => Promise<types.EditImageResponse>;
  embedContent(params: types.EmbedContentParameters): Promise<types.EmbedContentResponse>;
  generateContent: (params: types.GenerateContentParameters) => Promise<types.GenerateContentResponse>;
  generateContentStream: (params: types.GenerateContentParameters) => Promise<AsyncGenerator<types.GenerateContentResponse>>;
  generateImages: (params: types.GenerateImagesParameters) => Promise<types.GenerateImagesResponse>;
  generateVideos(params: types.GenerateVideosParameters): Promise<types.GenerateVideosOperation>;
  get(params: types.GetModelParameters): Promise<types.Model>;
  list: (params?: types.ListModelsParameters) => Promise<Pager<types.Model>>;
  update(params: types.UpdateModelParameters): Promise<types.Model>;
  upscaleImage: (params: types.UpscaleImageParameters) => Promise<types.UpscaleImageResponse>;
}
```

----------------------------------------

TITLE: Function: createPartFromCodeExecutionResult
DESCRIPTION: Constructs a content part representing the result of a code execution. It takes the outcome of the execution and the string output as parameters.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_35

LANGUAGE: APIDOC
CODE:
```
function createPartFromCodeExecutionResult(outcome: Outcome, output: string): Part
```

----------------------------------------

TITLE: APIDOC: topK Parameter for Google GenAI Models
DESCRIPTION: Documents the `topK` optional parameter, which specifies the number of highest probability tokens to sample from during generation. It influences the randomness of responses, with lower values leading to less random outputs.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_26

LANGUAGE: APIDOC
CODE:
```
Parameter: topK
  Type: number
  Description: For each token selection step, the `top_k` tokens with the highest probabilities are sampled. Then tokens are further filtered based on `top_p` with the final token selected using temperature sampling. Use a lower number for less random responses and a higher number for more random responses.
  Defined in: types.ts:696
```

----------------------------------------

TITLE: TypeScript Interface: TunedModel
DESCRIPTION: Describes a tuned machine learning model, including its checkpoints, endpoint, and base model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_283

LANGUAGE: TypeScript
CODE:
```
export interface TunedModel {
    checkpoints?: TunedModelCheckpoint[];
    endpoint?: string;
    model?: string;
}
```

----------------------------------------

TITLE: LiveServerMessage Interface API Definition
DESCRIPTION: Defines the LiveServerMessage interface, which represents a response message for API calls in the @google/genai library. It contains optional properties for different types of server-generated content, setup completion, tool calls, and tool call cancellations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveServerMessage.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveServerMessage:
  Description: Response message for API call.
  Properties:
    serverContent?: LiveServerContent
      Description: Content generated by the model in response to client messages.
    setupComplete?: LiveServerSetupComplete
      Description: Sent in response to a `LiveClientSetup` message from the client.
    toolCall?: LiveServerToolCall
      Description: Request for the client to execute the `function_calls` and return the responses with the matching `id`s.
    toolCallCancellation?: LiveServerToolCallCancellation
      Description: Notification for the client that a previously issued `ToolCallMessage` with the specified `id`s should have been not executed and should be cancelled.
```

----------------------------------------

TITLE: APIDOC: LiveClientMessage Interface Definition
DESCRIPTION: Defines the `LiveClientMessage` interface, which specifies the structure for messages sent by the client in API calls. It includes optional properties for content, real-time input, setup, and tool responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveClientMessage.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: LiveClientMessage
  Description: Messages sent by the client in the API call.
  Source: types.ts:2196

  Properties:
    clientContent?: LiveClientContent
      Description: Incremental update of the current conversation delivered from the client.
      Source: types.ts:2200

    realtimeInput?: LiveClientRealtimeInput
      Description: User input that is sent in real time.
      Source: types.ts:2202

    setup?: LiveClientSetup
      Description: Message to be sent by the system when connecting to the API. SDK users should not send this message.
      Source: types.ts:2198

    toolResponse?: LiveClientToolResponse
      Description: Response to a ToolCallMessage received from the server.
      Source: types.ts:2204
```

----------------------------------------

TITLE: APIDOC: CitationMetadata Interface Definition
DESCRIPTION: Defines the `CitationMetadata` interface, which provides structured information about sources cited by a model. It includes an optional array of `Citation` objects.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CitationMetadata.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface CitationMetadata:
  Description: Citation information when the model quotes another source.
  Definition: interface CitationMetadata {
    citations?: Citation[];
  }
  Properties:
    citations:
      Type: Citation[]
      Optional: true
      Description: Contains citation information when the model directly quotes, at length, from another source. Can include traditional websites and code repositories.
```

----------------------------------------

TITLE: APIDOC: Enum SafetyFilterLevel
DESCRIPTION: Enumerates different levels for applying safety filters, specifying which severity levels of harmful content should be blocked.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_244

LANGUAGE: typescript
CODE:
```
export enum SafetyFilterLevel {
    BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
    BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
    BLOCK_NONE = "BLOCK_NONE",
    BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH"
}
```

----------------------------------------

TITLE: APIDOC: Interface Segment
DESCRIPTION: Documentation for the `Segment` interface, which represents a segment of content within the `@google/genai` library. It defines optional properties for tracking content indices and the corresponding text.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Segment.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface Segment {
  Description: Segment of the content.
  Defined in: types.ts:850
  Properties:
    endIndex?: number
      Description: Output only. End index in the given Part, measured in bytes. Offset from the start of the Part, exclusive, starting at zero.
      Defined in: types.ts:852
    partIndex?: number
      Description: Output only. The index of a Part object within its parent Content object.
      Defined in: types.ts:854
    startIndex?: number
      Description: Output only. Start index in the given Part, measured in bytes. Offset from the start of the Part, inclusive, starting at zero.
      Defined in: types.ts:856
    text?: string
      Description: Output only. The text corresponding to the segment from the response.
      Defined in: types.ts:858
}
```

----------------------------------------

TITLE: GroundingChunkWeb Interface API Documentation
DESCRIPTION: API documentation for the `GroundingChunkWeb` interface, which represents a chunk of information sourced from the web. It defines optional properties for the chunk's title and its URI reference.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GroundingChunkWeb.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface GroundingChunkWeb
  Description: Chunk from the web.

  Properties:
    title?: string
      Description: Title of the chunk.
      Defined in: types.ts:836
    uri?: string
      Description: URI reference of the chunk.
      Defined in: types.ts:838
```

----------------------------------------

TITLE: API Reference: ListCachedContentsConfig Interface
DESCRIPTION: Defines the configuration options for the `caches.list` method, allowing specification of HTTP request overrides, pagination size, and a page token for retrieving subsequent results.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ListCachedContentsConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface ListCachedContentsConfig
  Description: Config for caches.list method.

  Properties:
    httpOptions?: HttpOptions
      Description: Used to override HTTP request options.
    pageSize?: number
      Description: Optional page size for pagination.
    pageToken?: string
      Description: Optional page token for retrieving subsequent results.
```

----------------------------------------

TITLE: API Documentation for StyleReferenceConfig Interface
DESCRIPTION: This section provides the API documentation for the StyleReferenceConfig interface, detailing its structure and properties. It is used to configure a style reference image.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.StyleReferenceConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface StyleReferenceConfig
==============================
Configuration for a Style reference image.

interface StyleReferenceConfig {
    styleDescription?: string;
}

Properties
----------
styleDescription?: string
A text description of the style to use for the generated image.
```

----------------------------------------

TITLE: DeleteCachedContentParameters Interface Definition
DESCRIPTION: Defines the structure of parameters required for the `caches.delete` method, including an optional configuration object and a mandatory resource name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.DeleteCachedContentParameters.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface DeleteCachedContentParameters {
  config?: DeleteCachedContentConfig;
  name: string;
}

Properties:
  config:
    Type: DeleteCachedContentConfig
    Description: Optional parameters for the request.
    Defined in: types.ts:1646

  name:
    Type: string
    Description: The server-generated resource name of the cached content.
    Defined in: types.ts:1643
```

----------------------------------------

TITLE: API Interface: ListTuningJobsConfig
DESCRIPTION: Defines configuration options for listing tuning jobs, including abort signal, filter, HTTP options, and pagination parameters.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_156

LANGUAGE: APIDOC
CODE:
```
Interface ListTuningJobsConfig:
  abortSignal?: AbortSignal
  filter?: string // (undocumented)
  httpOptions?: HttpOptions
  pageSize?: number // (undocumented)
  pageToken?: string // (undocumented)
```

----------------------------------------

TITLE: API Enum: FileSource
DESCRIPTION: Enumerates the possible sources of a file, such as generated or uploaded.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_80

LANGUAGE: APIDOC
CODE:
```
// @public
export enum FileSource {
    // (undocumented)
    GENERATED = "GENERATED",
    // (undocumented)
    SOURCE_UNSPECIFIED = "SOURCE_UNSPECIFIED",
    // (undocumented)
    UPLOADED = "UPLOADED"
}
```

----------------------------------------

TITLE: GenerateImagesResponse Class
DESCRIPTION: Represents the response from an image generation request, containing a list of generated images.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_100

LANGUAGE: TypeScript
CODE:
```
export class GenerateImagesResponse {
    generatedImages?: GeneratedImage[];
}
```

LANGUAGE: APIDOC
CODE:
```
class GenerateImagesResponse:
  generatedImages?: GeneratedImage[] - Optional list of generated images.
```

----------------------------------------

TITLE: API Interface: CodeExecutionResult
DESCRIPTION: Represents the outcome and output of a code execution.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_9

LANGUAGE: APIDOC
CODE:
```
interface CodeExecutionResult:
  outcome?: Outcome
  output?: string
```

----------------------------------------

TITLE: Define GoogleSearchRetrieval Interface
DESCRIPTION: Defines the structure for the GoogleSearchRetrieval object, which specifies configuration for dynamic retrieval in Google Search.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_125

LANGUAGE: APIDOC
CODE:
```
GoogleSearchRetrieval:
  dynamicRetrievalConfig?: DynamicRetrievalConfig
```

----------------------------------------

TITLE: APIDOC: GetCachedContentConfig Interface
DESCRIPTION: Configuration options for retrieving cached content, including support for abort signals and HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_110

LANGUAGE: APIDOC
CODE:
```
GetCachedContentConfig:
  abortSignal?: AbortSignal (Optional)
  httpOptions?: HttpOptions (Optional)
```

----------------------------------------

TITLE: APIDOC: GetFileParameters Interface
DESCRIPTION: Parameters for retrieving a specific file by its unique name, along with optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_113

LANGUAGE: APIDOC
CODE:
```
GetFileParameters:
  config?: GetFileConfig (Optional)
  name: string (Required)
```

----------------------------------------

TITLE: ContentEmbeddingStatistics Interface Definition
DESCRIPTION: Defines the ContentEmbeddingStatistics interface, which encapsulates statistics about the input text associated with content embedding results. It includes optional properties for tracking token count and whether the input was truncated, primarily for Vertex API usage.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ContentEmbeddingStatistics.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: ContentEmbeddingStatistics
Description: Statistics of the input text associated with the result of content embedding.

Properties:
  tokenCount?: number
    Description: Vertex API only. Number of tokens of the input text.
  truncated?: boolean
    Description: Vertex API only. If the input text was truncated due to having a length longer than the allowed maximum input.
```

LANGUAGE: TypeScript
CODE:
```
interface ContentEmbeddingStatistics {
  tokenCount?: number;
  truncated?: boolean;
}
```

----------------------------------------

TITLE: APIDOC: GenerateVideosOperation Interface
DESCRIPTION: Represents the status and outcome of a video generation operation, including completion status, potential errors, metadata, and the final response.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_102

LANGUAGE: APIDOC
CODE:
```
GenerateVideosOperation:
  done?: boolean (Optional)
  error?: Record<string, unknown> (Optional)
  metadata?: Record<string, unknown> (Optional)
  name?: string (Optional)
  response?: GenerateVideosResponse (Optional)
```

----------------------------------------

TITLE: APIDOC: Type PartListUnion
DESCRIPTION: Represents a union type for a list of content parts, allowing either an array of PartUnion or a single PartUnion.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_219

LANGUAGE: typescript
CODE:
```
export type PartListUnion = PartUnion[] | PartUnion;
```

----------------------------------------

TITLE: API Documentation: SpeechConfigUnion Type Alias
DESCRIPTION: Documentation for the SpeechConfigUnion type alias within the @google/genai library. This type is defined as a union, meaning it can accept values of either the SpeechConfig interface type or a simple string type. It is defined in 'types.ts'.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/types/types.SpeechConfigUnion.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Type Alias SpeechConfigUnion
SpeechConfigUnion: SpeechConfig | string
Defined in types.ts:2322
```

----------------------------------------

TITLE: APIDOC: GetTuningJobParameters Interface
DESCRIPTION: Parameters for retrieving details about a specific tuning job by its name, along with optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_119

LANGUAGE: APIDOC
CODE:
```
GetTuningJobParameters:
  config?: GetTuningJobConfig (Optional)
  name: string (Required)
```

----------------------------------------

TITLE: APIDOC: PartUnion Type Alias Definition
DESCRIPTION: Defines the `PartUnion` type alias within the `@google/genai` library, specifying that it can be either a `Part` interface or a `string`. This type is defined in `types.ts`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/types/types.PartUnion.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Type Alias: PartUnion
Definition: [Part](../interfaces/types.Part.html) | string
Source: types.ts:2312
```

----------------------------------------

TITLE: Interface: DatasetDistribution
DESCRIPTION: Represents statistical distribution data for a dataset. It includes metrics like min, max, mean, median, percentiles, sum, and optional distribution buckets.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_44

LANGUAGE: APIDOC
CODE:
```
interface DatasetDistribution
  buckets?: DatasetDistributionDistributionBucket[]
  max?: number
  mean?: number
  median?: number
  min?: number
  p5?: number
  p95?: number
  sum?: number
```

----------------------------------------

TITLE: Class: Pager<T>
DESCRIPTION: A utility class for handling paginated responses, allowing iteration over items and navigation between pages. It implements AsyncIterable for asynchronous iteration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_217

LANGUAGE: APIDOC
CODE:
```
class Pager<T> implements AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
  constructor(name: PagedItem, request: (params: PagedItemConfig) => Promise<PagedItemResponse<T>>, response: PagedItemResponse<T>, params: PagedItemConfig);
  getItem(index: number): T;
  hasNextPage(): boolean;
  protected idxInternal: number;
  get name(): PagedItem;
  nextPage(): Promise<T[]>;
  get page(): T[];
  get pageLength(): number;
  get pageSize(): number;
}
```

----------------------------------------

TITLE: APIDOC: topP Parameter for Google GenAI Models
DESCRIPTION: Documents the `topP` optional parameter, which defines a probability threshold for token selection. Tokens are chosen until their cumulative probability reaches this value, affecting the diversity and randomness of generated responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_27

LANGUAGE: APIDOC
CODE:
```
Parameter: topP
  Type: number
  Description: Tokens are selected from the most to least probable until the sum of their probabilities equals this value. Use a lower value for less random responses and a higher value for more random responses.
  Defined in: types.ts:689
```

----------------------------------------

TITLE: API Reference: createPartFromBase64 Function
DESCRIPTION: Documentation for the `createPartFromBase64` function, detailing its purpose, parameters, and return type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromBase64.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Function: createPartFromBase64
  Description: Creates a `Part` object from a `base64` `string`.
  Signature: createPartFromBase64(data: string, mimeType: string): Part
  Parameters:
    - data: string
    - mimeType: string
  Returns: Part
  Defined in: types.ts:326
```

----------------------------------------

TITLE: API Definition: ComputeTokensConfig Interface
DESCRIPTION: Defines the `ComputeTokensConfig` interface, which provides optional parameters for configuring token computation, including the `httpOptions` property for overriding HTTP request settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ComputeTokensConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface ComputeTokensConfig:
  Description: Optional parameters for computing tokens.
  Definition:
    interface ComputeTokensConfig {
      httpOptions?: HttpOptions;
    }
  Properties:
    httpOptions:
      Type: HttpOptions
      Optional: true
      Description: Used to override HTTP request options.
      Source: types.ts:1520
```

----------------------------------------

TITLE: Interface: DownloadFileConfig
DESCRIPTION: Configuration options for downloading a file. It allows for setting an AbortSignal to cancel the operation and custom HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_60

LANGUAGE: APIDOC
CODE:
```
interface DownloadFileConfig
  abortSignal?: AbortSignal
  httpOptions?: Http
```

----------------------------------------

TITLE: GeneratedImage Interface
DESCRIPTION: Represents a single generated image, including the image data, enhanced prompt, and safety attributes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_96

LANGUAGE: TypeScript
CODE:
```
export interface GeneratedImage {
    enhancedPrompt?: string;
    image?: Image_2;
    raiFilteredReason?: string;
    safetyAttributes?: SafetyAttributes;
}
```

LANGUAGE: APIDOC
CODE:
```
interface GeneratedImage:
  enhancedPrompt?: string - Optional prompt that was enhanced by the model.
  image?: Image_2 - Optional generated image data.
  raiFilteredReason?: string - Optional reason if the image was filtered by Responsible AI.
  safetyAttributes?: SafetyAttributes - Optional safety attributes associated with the generated image.
```

----------------------------------------

TITLE: PrebuiltVoiceConfig Interface API Reference
DESCRIPTION: Detailed API documentation for the `PrebuiltVoiceConfig` interface, outlining its structure and the optional `voiceName` property used for specifying a prebuilt voice.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.PrebuiltVoiceConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: PrebuiltVoiceConfig
  Description: The configuration for the prebuilt speaker to use.
  Properties:
    voiceName:
      Type: string
      Optional: true
      Description: The name of the prebuilt voice to use.
      Source: types.ts:618
```

----------------------------------------

TITLE: Class: CreateFileResponse
DESCRIPTION: Represents the response object returned after a file creation operation. It may optionally include the underlying SDK HTTP response details.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_32

LANGUAGE: APIDOC
CODE:
```
class CreateFileResponse
  sdkHttpResponse?: HttpResponse
```

----------------------------------------

TITLE: DownloadFileConfig Interface Definition
DESCRIPTION: Defines the structure for overriding default download configurations. It includes an optional property to customize HTTP request options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.DownloadFileConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface DownloadFileConfig
Used to override the default configuration.

interface DownloadFileConfig {
  httpOptions?: HttpOptions;
}

Properties:
  httpOptions?: HttpOptions
    Used to override HTTP request options.
```

----------------------------------------

TITLE: APIDOC: Interface PartnerModelTuningSpec
DESCRIPTION: Specifies parameters for tuning a partner model, including hyperparameters and URIs for training and validation datasets.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_220

LANGUAGE: typescript
CODE:
```
export interface PartnerModelTuningSpec {
    hyperParameters?: Record<string, unknown>;
    trainingDatasetUri?: string;
    validationDatasetUri?: string;
}
```

----------------------------------------

TITLE: API Reference: RawReferenceImage Interface Definition
DESCRIPTION: Defines the structure for a raw reference image, including its optional ID, the image data, and its type, used as a base for image editing operations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.RawReferenceImage.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface RawReferenceImage {
  Description: A raw reference image. A raw reference image represents the base image to edit, provided by the user. It can optionally be provided in addition to a mask reference image or a style reference image.
  Properties:
    referenceId?: number
      Description: The id of the reference image.
    referenceImage?: Image
      Description: The reference image for the editing operation.
    referenceType?: string
      Description: The type of the reference image. Only set by the SDK.
}
```

----------------------------------------

TITLE: API Reference: UploadFileConfig Interface
DESCRIPTION: Defines the configuration options available for customizing file uploads. This interface allows developers to specify an optional display name, HTTP request options, the MIME type, and the destination file name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.UploadFileConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: UploadFileConfig
  Description: Used to override the default configuration for file uploads.
  Properties:
    displayName?: string
      Description: Optional display name of the file.
    httpOptions?: HttpOptions
      Description: Used to override HTTP request options.
    mimeType?: string
      Description: The MIME type of the file. If not provided, it will be inferred from the file extension.
    name?: string
      Description: The name of the file in the destination (e.g., 'files/sample-image'). If not provided, one will be generated.
```

----------------------------------------

TITLE: FunctionResponse Class
DESCRIPTION: Represents the response from a function call, including its ID, name, and the actual response data.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_89

LANGUAGE: TypeScript
CODE:
```
export class FunctionResponse {
    id?: string;
    name?: string;
    response?: Record<string, unknown>;
    scheduling?: FunctionResponseScheduling;
    willContinue?: boolean;
}
```

LANGUAGE: APIDOC
CODE:
```
class FunctionResponse:
  id?: string - Optional unique identifier for the function response.
  name?: string - The name of the function that was called.
  response?: Record<string, unknown> - The actual response data from the function call.
  scheduling?: FunctionResponseScheduling - Optional scheduling preference for the function response.
  willContinue?: boolean - Optional flag indicating if the model will continue after this response.
```

----------------------------------------

TITLE: API Reference: LiveSendClientContentParameters Interface
DESCRIPTION: Defines the parameters for sending client content to the live API, including a flag to indicate turn completion and the content list itself. This interface is crucial for controlling the flow of content generation on the server side.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveSendClientContentParameters.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface LiveSendClientContentParameters {
  turnComplete?: boolean;
  turns?: ContentListUnion;
}

Properties:
- turnComplete:
    Type: boolean
    Description: If true, indicates that the server content generation should start with the currently accumulated prompt. Otherwise, the server will await additional messages before starting generation.
- turns:
    Type: ContentListUnion
    Description: Client content to send to the session.
```

----------------------------------------

TITLE: APIDOC: CodeExecutionResult Interface Definition
DESCRIPTION: Defines the `CodeExecutionResult` interface, which represents the outcome of executing an `ExecutableCode` part. It includes optional properties for the execution outcome and output.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CodeExecutionResult.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface CodeExecutionResult
Result of executing the [ExecutableCode]. Always follows a `part` containing the [ExecutableCode].

interface CodeExecutionResult {
    outcome?: Outcome;
    output?: string;
}

Properties:
- outcome?: Outcome
  Required. Outcome of the code execution.
  Defined in types.ts:197

- output?: string
  Optional. Contains stdout when code execution is successful, stderr or other description otherwise.
  Defined in types.ts:199
```

----------------------------------------

TITLE: API Reference: GenerateImagesResponse Class Definition
DESCRIPTION: Defines the structure of the response containing generated images, including its constructor and properties. This class represents the output format for image generation operations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateImagesResponse.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class GenerateImagesResponse:
  Description: The output images response.
  Defined in: types.ts:1441

  Constructors:
    constructor():
      Returns: GenerateImagesResponse

  Properties:
    generatedImages?: GeneratedImage[]
      Description: List of generated images.
      Defined in: types.ts:1444
```

----------------------------------------

TITLE: cachedContent Parameter
DESCRIPTION: Resource name of a context cache that can be used in subsequent requests.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_3

LANGUAGE: TypeScript
CODE:
```
cachedContent?: string
```

----------------------------------------

TITLE: speechConfig Parameter
DESCRIPTION: The speech generation configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_19

LANGUAGE: TypeScript
CODE:
```
speechConfig?: SpeechConfigUnion
```

----------------------------------------

TITLE: GenerationConfigRoutingConfig Interface Definition
DESCRIPTION: Defines the structure for configuring how requests are routed to a specific model, offering both automated and manual routing options. This interface is part of the @google/genai library and contains optional properties for different routing modes.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerationConfigRoutingConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface GenerationConfigRoutingConfig {
  autoMode?: GenerationConfigRoutingConfigAutoRoutingMode;
  manualMode?: GenerationConfigRoutingConfigManualRoutingMode;
}

Properties:
  autoMode?: GenerationConfigRoutingConfigAutoRoutingMode
    Description: Automated routing.
  manualMode?: GenerationConfigRoutingConfigManualRoutingMode
    Description: Manual routing.
```

----------------------------------------

TITLE: API Reference: ListCachedContentsResponse Class
DESCRIPTION: Defines the structure for a response containing a list of cached contents, typically used in pagination. It includes an optional array of CachedContent and an optional nextPageToken for fetching subsequent results.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.ListCachedContentsResponse.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class: ListCachedContentsResponse
  Defined in: types.ts:1686

  Constructors:
    constructor(): ListCachedContentsResponse

  Properties:
    cachedContents?: CachedContent[]
      Description: List of cached contents.
      Defined in: types.ts:1690
    nextPageToken?: string
      Defined in: types.ts:1687
```

----------------------------------------

TITLE: TypeScript Interface: ToolCodeExecution
DESCRIPTION: Represents a tool for executing code. This interface is currently empty, suggesting it might be a placeholder or for future expansion.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_277

LANGUAGE: TypeScript
CODE:
```
export interface ToolCodeExecution {
}
```

----------------------------------------

TITLE: systemInstruction Parameter
DESCRIPTION: Instructions for the model to steer it toward better performance. For example, "Answer as concisely as possible" or "Don't use technical terms in your response".
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_21

LANGUAGE: TypeScript
CODE:
```
systemInstruction?: ContentUnion
```

----------------------------------------

TITLE: APIDOC: Candidate Interface Definition
DESCRIPTION: Defines the `Candidate` interface, which represents a response candidate generated from the model. It includes various optional properties providing details about the generated content, its metadata, safety ratings, and token information.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Candidate.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface Candidate {
  // A response candidate generated from the model.

  avgLogprobs?: number;
    // Output only. Average log probability score of the candidate.
  citationMetadata?: CitationMetadata;
    // Source attribution of the generated content.
  content?: Content;
    // Contains the multi-part content of the response.
  finishMessage?: string;
    // Describes the reason the model stopped generating tokens.
  finishReason?: FinishReason;
    // The reason why the model stopped generating tokens. If empty, the model has not stopped generating the tokens.
  groundingMetadata?: GroundingMetadata;
    // Output only. Metadata specifies sources used to ground generated content.
  index?: number;
    // Output only. Index of the candidate.
  logprobsResult?: LogprobsResult;
    // Output only. Log-likelihood scores for the response tokens and top tokens
  safetyRatings?: SafetyRating[];
    // Output only. List of ratings for the safety of a response candidate. There is at most one rating per category.
  tokenCount?: number;
    // Number of tokens for this candidate.
}
```

----------------------------------------

TITLE: Models Class API Reference
DESCRIPTION: Detailed API documentation for the `Models` class, including its constructor and methods for interacting with generative AI models.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/models.Models.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class Models
  Hierarchy: BaseModule -> Models
  Defined in: models.ts:15

  Constructor:
    new Models(apiClient: ApiClient): Models
      Parameters:
        apiClient: ApiClient
      Returns: Models
      Overrides: BaseModule.constructor
      Defined in: models.ts:16

  Methods:
    computeTokens(params: ComputeTokensParameters): Promise<ComputeTokensResponse>
      Description: Given a list of contents, returns a corresponding TokensInfo containing the list of tokens and list of token ids. This method is not supported by the Gemini Developer API.
      Parameters:
        params: ComputeTokensParameters - The parameters for computing tokens.
      Returns: Promise<ComputeTokensResponse> - The response from the API.
      Defined in: models.ts:582

    countTokens(params: CountTokensParameters): Promise<CountTokensResponse>
      Description: Counts the number of tokens in the given contents. Multimodal input is supported for Gemini models.
      Parameters:
        params: CountTokensParameters - The parameters for counting tokens.
      Returns: Promise<CountTokensResponse> - The response from the API.
      Defined in: models.ts:485

    embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse>
      Description: Calculates embeddings for the given contents. Only text is supported.
      Parameters:
        params: EmbedContentParameters - The parameters for embedding contents.
      Returns: Promise<EmbedContentResponse> - The response from the API.
      Defined in: models.ts:292
```

----------------------------------------

TITLE: API Interface: CitationMetadata
DESCRIPTION: Contains a collection of citations related to generated content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_8

LANGUAGE: APIDOC
CODE:
```
interface CitationMetadata:
  citations?: Citation[]
```

----------------------------------------

TITLE: Vertex AI Search Interface
DESCRIPTION: Defines parameters for integrating with Vertex AI Search, including datastore, engine, filter, and maximum results.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_307

LANGUAGE: APIDOC
CODE:
```
VertexAISearch:
  datastore?: string
  dataStoreSpecs?: VertexAISearchDataStoreSpec[]
  engine?: string
  filter?: string
  maxResults?: number
```

----------------------------------------

TITLE: APIDOC Class: LiveServerMessage
DESCRIPTION: Represents a comprehensive message from the live server, encompassing various server-side events and data, including content, session updates, and tool calls.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_190

LANGUAGE: APIDOC
CODE:
```
LiveServerMessage:
  get data(): string | undefined
  goAway?: LiveServerGoAway
  serverContent?: LiveServerContent
  sessionResumptionUpdate?: LiveServerSessionResumptionUpdate
  setupComplete?: LiveServerSetupComplete
  get text(): string | undefined
  toolCall?: LiveServerToolCall
  toolCallCancellation?: LiveServerToolCallCancellation
  usageMetadata?: UsageMetadata
```

----------------------------------------

TITLE: TokensInfo Interface Definition and Properties
DESCRIPTION: This documentation describes the `TokensInfo` interface, outlining its structure and the purpose of its optional properties: `role`, `tokenIds`, and `tokens`. It is designed to hold token-level information, such as the text of tokens and their numerical identifiers.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.TokensInfo.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: TokensInfo
Description: Tokens info with a list of tokens and the corresponding list of token ids.

Definition:
interface TokensInfo {
  role?: string;
  tokenIds?: string[];
  tokens?: string[];
}

Properties:
- role?: string
  Description: Optional. Optional fields for the role from the corresponding Content.
  Source: types.ts:1538

- tokenIds?: string[]
  Description: A list of token ids from the input.
  Source: types.ts:1540

- tokens?: string[]
  Description: A list of tokens from the input.
  Source: types.ts:1542
```

----------------------------------------

TITLE: Upscale Image Response Class
DESCRIPTION: Represents the response from an image upscaling operation, potentially containing a list of generated images.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_301

LANGUAGE: APIDOC
CODE:
```
UpscaleImageResponse:
  generatedImages?: GeneratedImage[]
```

----------------------------------------

TITLE: APIDOC: GenerateVideosParameters Interface
DESCRIPTION: Specifies the parameters required to initiate a video generation request, including configuration, input images or videos, the model to use, and the prompt.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_103

LANGUAGE: APIDOC
CODE:
```
GenerateVideosParameters:
  config?: GenerateVideosConfig (Optional)
  image?: Image_2 (Optional)
  model: string (Required)
  prompt?: string (Optional)
  video?: Video (Optional)
```

----------------------------------------

TITLE: Video Metadata Interface
DESCRIPTION: Provides metadata for a video, including start and end offsets and frames per second (FPS).
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_312

LANGUAGE: APIDOC
CODE:
```
VideoMetadata:
  endOffset?: string
  fps?: number
  startOffset?: string
```

----------------------------------------

TITLE: Define HttpOptions Interface
DESCRIPTION: Defines the structure for the HttpOptions object, specifying configuration for HTTP requests such as API version, base URL, headers, and timeout.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_139

LANGUAGE: APIDOC
CODE:
```
HttpOptions:
  apiVersion?: string
  baseUrl?: string
  headers?: Record<string, string>
  timeout?: number
```

----------------------------------------

TITLE: Schema Property: required
DESCRIPTION: Lists the required properties for Type.OBJECT schema fields.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_10

LANGUAGE: APIDOC
CODE:
```
required?: string[]
Optional. Required properties of Type.OBJECT.
```

----------------------------------------

TITLE: Schema Property: minProperties
DESCRIPTION: Indicates the minimum number of properties required for Type.OBJECT.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_5

LANGUAGE: APIDOC
CODE:
```
minProperties?: string
Optional. Minimum number of the properties for Type.OBJECT.
```

----------------------------------------

TITLE: API Interface: FileStatus
DESCRIPTION: Represents the status of a file operation, including a code, details, and message.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_82

LANGUAGE: APIDOC
CODE:
```
// @public
export interface FileStatus {
    code?: number;
    details?: Record<string, unknown>[];
    message?: string;
}
```

----------------------------------------

TITLE: API: ListCachedContentsParameters Interface Definition
DESCRIPTION: Defines the structure of parameters for the `caches.list` method, including an optional configuration object. This interface is part of the `@google/genai` library and is used to specify options when listing cached content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ListCachedContentsParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface ListCachedContentsParameters
  Description: Parameters for caches.list method.
  Definition:
    interface ListCachedContentsParameters {
        config?: ListCachedContentsConfig;
    }
  Properties:
    config:
      Type: ListCachedContentsConfig
      Optional: true
      Description: Configuration that contains optional parameters.
      Defined in: types.ts:1683
```

----------------------------------------

TITLE: FunctionResponseScheduling Enum
DESCRIPTION: Defines the scheduling preferences for how a function response should be handled by the model.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_90

LANGUAGE: TypeScript
CODE:
```
export enum FunctionResponseScheduling {
    INTERRUPT = "INTERRUPT",
    SCHEDULING_UNSPECIFIED = "SCHEDULING_UNSPECIFIED",
    SILENT = "SILENT",
    WHEN_IDLE = "WHEN_IDLE"
}
```

LANGUAGE: APIDOC
CODE:
```
enum FunctionResponseScheduling:
  INTERRUPT: The response should interrupt current processing.
  SCHEDULING_UNSPECIFIED: Default value, unspecified scheduling.
  SILENT: The response should be processed silently.
  WHEN_IDLE: The response should be processed when the model is idle.
```

----------------------------------------

TITLE: LiveServerToolCallCancellation Interface Definition and Properties
DESCRIPTION: Defines the `LiveServerToolCallCancellation` interface, used to notify clients that specific tool calls should be cancelled. It includes the `ids` property for identifying the tool calls to be cancelled.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveServerToolCallCancellation.html#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface LiveServerToolCallCancellation {
  ids?: string[];
}
```

LANGUAGE: APIDOC
CODE:
```
Property: ids
  Type: string[]
  Optional: true
  Description: The ids of the tool calls to be cancelled.
```

----------------------------------------

TITLE: API Interface: FetchPredictOperationConfig
DESCRIPTION: Defines configuration options for fetching predict operations, including abort signal and HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_75

LANGUAGE: APIDOC
CODE:
```
// @public (undocumented)
export interface FetchPredictOperationConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
}
```

----------------------------------------

TITLE: VideoMetadata Interface API Definition
DESCRIPTION: Defines the structure for metadata related to video content, including optional start and end offsets. This interface is part of the `@google/genai` library and is used to provide contextual information about video segments.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.VideoMetadata.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface VideoMetadata:
  Description: Metadata describes the input video content.
  Properties:
    endOffset?: string
      Description: Optional. The end offset of the video.
    startOffset?: string
      Description: Optional. The start offset of the video.
```

----------------------------------------

TITLE: API Interface: FetchPredictOperationParameters
DESCRIPTION: Specifies parameters for fetching a predict operation, including the operation and resource names.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_76

LANGUAGE: APIDOC
CODE:
```
// @public
export interface FetchPredictOperationParameters {
    config?: FetchPredictOperationConfig;
    operationName: string;
    // (undocumented)
    resourceName: string;
}
```

----------------------------------------

TITLE: TypeScript Interface: Transcription
DESCRIPTION: Represents a transcription result, indicating if it's finished and containing the transcribed text.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_282

LANGUAGE: TypeScript
CODE:
```
export interface Transcription {
    finished?: boolean;
    text?: string;
}
```

----------------------------------------

TITLE: GenAI API: Optional Generation Configuration Properties
DESCRIPTION: These properties are optional parameters used to configure the behavior of text generation models. They influence aspects like output randomness, diversity, and termination conditions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerationConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
GenerationConfigProperties:
  seed:
    Type: number
    Description: Optional. Seed for reproducible generations.
  stopSequences:
    Type: string[]
    Description: Optional. A list of sequences that will stop generation if encountered.
  temperature:
    Type: number
    Description: Optional. Controls the randomness of predictions. Higher values result in more random outputs.
  topK:
    Type: number
    Description: Optional. If specified, top-k sampling will be used, selecting from the top 'k' most likely tokens.
  topP:
    Type: number
    Description: Optional. If specified, nucleus sampling will be used, selecting from the smallest set of tokens whose cumulative probability exceeds 'p'.
```

----------------------------------------

TITLE: LiveClientToolResponse Class API Reference
DESCRIPTION: Detailed API documentation for the `LiveClientToolResponse` class, including its constructor and properties, used for handling responses to tool calls in the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.LiveClientToolResponse.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class LiveClientToolResponse
  Description: Client generated response to a `ToolCall` received from the server.
  Defined in: types.ts:2190

  Constructors:
    constructor()
      Returns: LiveClientToolResponse

  Properties:
    functionResponses?: FunctionResponse[]
      Description: The response to the function calls.
      Defined in: types.ts:2192
```

----------------------------------------

TITLE: API Definition: SupervisedTuningDatasetDistributionDatasetBucket Interface in TypeScript
DESCRIPTION: Represents a single bucket within a supervised tuning dataset distribution, with count and range.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_268

LANGUAGE: APIDOC
CODE:
```
SupervisedTuningDatasetDistributionDatasetBucket:
  count: number (optional)
  left: number (optional)
  right: number (optional)
```

----------------------------------------

TITLE: DeleteCachedContentResponse Class API Reference
DESCRIPTION: API documentation for the DeleteCachedContentResponse class, which represents an empty response for the caches.delete method within the @google/genai library. It defines the class structure and its constructor.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.DeleteCachedContentResponse.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class DeleteCachedContentResponse
  Description: Empty response for caches.delete method.
  Defined in: types.ts:1650

  Constructors:
    constructor()
      Returns: DeleteCachedContentResponse
```

----------------------------------------

TITLE: API Class: CountTokensResponse
DESCRIPTION: Represents the response containing token counts after a token counting request.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_24

LANGUAGE: APIDOC
CODE:
```
class CountTokensResponse:
  cachedContentTokenCount?: number
  totalTokens?: number
```

----------------------------------------

TITLE: ModalityTokenCount Interface API Definition
DESCRIPTION: API documentation for the `ModalityTokenCount` interface, which is used to represent token counting information for a specific modality. It defines two optional properties: `modality` for the type of modality and `tokenCount` for the number of tokens.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ModalityTokenCount.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: ModalityTokenCount
  Description: Represents token counting info for a single modality.

  Definition:
    interface ModalityTokenCount {
      modality?: Modality;
      tokenCount?: number;
    }

  Properties:
    modality?: Modality
      Description: The modality associated with this token count.
      Optional: Yes

    tokenCount?: number
      Description: Number of tokens.
      Optional: Yes
```

----------------------------------------

TITLE: APIDOC Interface: LogprobsResult
DESCRIPTION: Encapsulates the results of log probability calculations, including chosen and top candidate log probabilities.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_195

LANGUAGE: APIDOC
CODE:
```
LogprobsResult:
  chosenCandidates?: LogprobsResultCandidate[]
  topCandidates?: LogprobsResultTopCandidates[]
```

----------------------------------------

TITLE: Google GenAI File Interface API Reference
DESCRIPTION: Defines the `File` interface used in the Google GenAI API, representing a file uploaded to the API. It details various properties related to file metadata, status, and lifecycle.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.File.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface File:
  Description: A file uploaded to the API.
  Properties:
    createTime:
      Type: string
      Optional: true
      Description: Output only. The timestamp of when the `File` was created.
    displayName:
      Type: string
      Optional: true
      Description: Optional. The human-readable display name for the `File`. The display name must be no more than 512 characters in length, including spaces. Example: 'Welcome Image'
    downloadUri:
      Type: string
      Optional: true
      Description: Output only. The URI of the `File`, only set for downloadable (generated) files.
    error:
      Type: FileStatus
      Optional: true
      Description: Output only. Error status if File processing failed.
    expirationTime:
      Type: string
      Optional: true
      Description: Output only. The timestamp of when the `File` will be deleted. Only set if the `File` is scheduled to expire.
    mimeType:
      Type: string
      Optional: true
      Description: Output only. MIME type of the file.
    name:
      Type: string
      Optional: true
      Description: The `File` resource name. The ID (name excluding the "files/" prefix) can contain up to 40 characters that are lowercase alphanumeric or dashes (-). The ID cannot start or end with a dash. If the name is empty on create, a unique name will be generated. Example: `files/123-456`
    sha256Hash:
      Type: string
      Optional: true
      Description: Output only. SHA-256 hash of the uploaded bytes. The hash value is encoded in base64 format.
    sizeBytes:
      Type: number
      Optional: true
      Description: Output only. Size of the file in bytes.
    source:
      Type: FileSource
      Optional: true
      Description: Output only. The source of the `File`.
    state:
      Type: FileState
      Optional: true
      Description: Output only. Processing state of the File.
    updateTime:
      Type: string
      Optional: true
      Description: Output only. The timestamp of when the `File` was last updated.
    uri:
      Type: string
      Optional: true
      Description: Output only. The URI of the `File`.
    videoMetadata:
      Type: Record<string, unknown>
      Optional: true
      Description: Output only. Metadata for a video.
```

----------------------------------------

TITLE: API Interface: LiveConnectConfig
DESCRIPTION: Defines comprehensive configuration options for establishing a live connection, covering generation, audio, and session parameters.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_166

LANGUAGE: APIDOC
CODE:
```
Interface LiveConnectConfig:
  abortSignal?: AbortSignal
  contextWindowCompression?: ContextWindowCompressionConfig
  enableAffectiveDialog?: boolean
  generationConfig?: GenerationConfig
  httpOptions?: HttpOptions
  inputAudioTranscription?: AudioTranscriptionConfig
  maxOutputTokens?: number
  mediaResolution?: MediaResolution
  outputAudioTranscription?: AudioTranscriptionConfig
  proactivity?: ProactivityConfig
  realtimeInputConfig?: RealtimeInputConfig
  responseModalities?: Modality[]
  seed?: number
  sessionResumption?: SessionResumptionConfig
  speechConfig?: SpeechConfig
  systemInstruction?: ContentUnion
  temperature?: number
  tools?: ToolListUnion
  topK?: number
  topP?: number
```

----------------------------------------

TITLE: DeleteCachedContentConfig Interface API Definition
DESCRIPTION: API documentation for the `DeleteCachedContentConfig` interface, which provides optional parameters for the `caches.delete` method. It allows for custom HTTP request options to be specified.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.DeleteCachedContentConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: DeleteCachedContentConfig
  Description: Optional parameters for caches.delete method.
  Defined in: types.ts:1634

  Properties:
    httpOptions?: HttpOptions
      Description: Used to override HTTP request options.
      Type: HttpOptions
      Optional: Yes
      Defined in: types.ts:1636
```

----------------------------------------

TITLE: TypeScript Interface: TuningExample
DESCRIPTION: Represents a single example used in model tuning, consisting of an output and a text input.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_288

LANGUAGE: TypeScript
CODE:
```
export interface TuningExample {
    output?: string;
    textInput?: string;
}
```

----------------------------------------

TITLE: Vertex RAG Store Rag Resource Interface
DESCRIPTION: Specifies a RAG resource within a Vertex RAG store, including the RAG corpus and associated file IDs.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_310

LANGUAGE: APIDOC
CODE:
```
VertexRagStoreRagResource:
  ragCorpus?: string
  ragFileIds?: string[]
```

----------------------------------------

TITLE: API Class: EditImageResponse
DESCRIPTION: Represents the response from an image editing operation, containing the generated images.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_63

LANGUAGE: APIDOC
CODE:
```
// @public
export class EditImageResponse {
    generatedImages?: GeneratedImage[];
}
```

----------------------------------------

TITLE: APIDOC: CachedContentUsageMetadata Interface Definition
DESCRIPTION: Defines the `CachedContentUsageMetadata` interface, which provides optional properties to describe the usage metrics of cached content, such as duration of audio/video, count of images, and total token count.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CachedContentUsageMetadata.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: CachedContentUsageMetadata
Description: Metadata on the usage of the cached content.

Properties:
  audioDurationSeconds?: number
    Description: Duration of audio in seconds.
  imageCount?: number
    Description: Number of images.
  textCount?: number
    Description: Number of text characters.
  totalTokenCount?: number
    Description: Total number of tokens that the cached content consumes.
  videoDurationSeconds?: number
    Description: Duration of video in seconds.
```

----------------------------------------

TITLE: Define ListCachedContentsResponse Class
DESCRIPTION: Defines the ListCachedContentsResponse class, representing the response from listing cached contents, including the list of contents and a next page token.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_149

LANGUAGE: APIDOC
CODE:
```
ListCachedContentsResponse:
  cachedContents?: CachedContent[]
  nextPageToken?: string
```

----------------------------------------

TITLE: APIDOC Interface: LiveServerToolCallCancellation
DESCRIPTION: Indicates the cancellation of one or more tool calls by the live server, identified by their IDs.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_194

LANGUAGE: APIDOC
CODE:
```
LiveServerToolCallCancellation:
  ids?: string[]
```

----------------------------------------

TITLE: HttpResponse Class API Reference
DESCRIPTION: Comprehensive API documentation for the `HttpResponse` class from the `@google/genai` library, detailing its constructor, properties, and methods for handling HTTP responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.HttpResponse.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class HttpResponse
  Description: A wrapper class for the http response.
  Defined in: types.ts:1777

  Constructors:
    constructor(response: Response)
      Parameters:
        response: Response
      Returns: HttpResponse
      Defined in: types.ts:1785

  Properties:
    headers?: Record<string, string>
      Description: Used to retain the processed HTTP headers in the response.
      Defined in: types.ts:1779
    responseInternal: Response
      Description: The original http response.
      Defined in: types.ts:1783

  Methods:
    json(): Promise<unknown>
      Returns: Promise<unknown>
      Defined in: types.ts:1797
```

----------------------------------------

TITLE: ComputeTokensResponse Class API Reference
DESCRIPTION: API documentation for the `ComputeTokensResponse` class, outlining its structure, constructor, and properties. This class is used to return token information after a computation request.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.ComputeTokensResponse.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class: ComputeTokensResponse
  Description: Response for computing tokens.

  Constructors:
    - new ComputeTokensResponse(): ComputeTokensResponse

  Properties:
    - tokensInfo?: TokensInfo[]
      Description: Lists of tokens info from the input. A ComputeTokensRequest could have multiple instances with a prompt in each instance. We also need to return lists of tokens info for the request with multiple instances.
```

----------------------------------------

TITLE: APIDOC: Enum PersonGeneration
DESCRIPTION: Enumerates options for controlling the generation of person-related content, including allowing adult content, all content, or disallowing it.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_222

LANGUAGE: typescript
CODE:
```
export enum PersonGeneration {
    ALLOW_ADULT = "ALLOW_ADULT",
    ALLOW_ALL = "ALLOW_ALL",
    DONT_ALLOW = "DONT_ALLOW"
}
```

----------------------------------------

TITLE: Upscale Image Parameters Interface
DESCRIPTION: Defines the parameters required for an image upscaling operation, including configuration, the image itself, the model to use, and the upscale factor.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_300

LANGUAGE: APIDOC
CODE:
```
UpscaleImageParameters:
  config?: UpscaleImageConfig
  image: Image_2
  model: string
  upscaleFactor: string
```

----------------------------------------

TITLE: APIDOC: GenerationConfigRoutingConfig Interface
DESCRIPTION: Specifies how model routing should be handled for generation requests, allowing for either automatic or manual mode selection.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_106

LANGUAGE: APIDOC
CODE:
```
GenerationConfigRoutingConfig:
  autoMode?: GenerationConfigRoutingConfigAutoRoutingMode (Optional)
  manualMode?: GenerationConfigRoutingConfigManualRoutingMode (Optional)
```

----------------------------------------

TITLE: Type Alias ToolListUnion Definition
DESCRIPTION: Documentation for the `ToolListUnion` type alias, which represents an array of `Tool` interfaces. It is defined within the `types.ts` file.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/types/types.ToolListUnion.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Type Alias ToolListUnion
ToolListUnion: [Tool](../interfaces/types.Tool.html)[]
Defined in types.ts:2324
```

----------------------------------------

TITLE: API Definition: Schema Interface in TypeScript
DESCRIPTION: Represents a generic schema definition, supporting various JSON schema-like properties for data validation and description.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_248

LANGUAGE: APIDOC
CODE:
```
Schema:
  anyOf: Schema[] (optional)
  default: unknown (optional)
  description: string (optional)
  enum: string[] (optional)
  example: unknown (optional)
  format: string (optional)
  items: Schema (optional)
  maximum: number (optional)
  maxItems: string (optional)
  maxLength: string (optional)
  maxProperties: string (optional)
  minimum: number (optional)
  minItems: string (optional)
  minLength: string (optional)
  minProperties: string (optional)
  nullable: boolean (optional)
  pattern: string (optional)
  properties: Record<string, Schema> (optional)
  propertyOrdering: string[] (optional)
  required: string[] (optional)
  title: string (optional)
  type: Type (optional)
```

----------------------------------------

TITLE: APIDOC Interface: LiveServerContent
DESCRIPTION: Represents various types of content received from the live server, such as generation status, grounding metadata, transcriptions, and model turns.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_188

LANGUAGE: APIDOC
CODE:
```
LiveServerContent:
  generationComplete?: boolean
  groundingMetadata?: GroundingMetadata
  inputTranscription?: Transcription
  interrupted?: boolean
  modelTurn?: Content
  outputTranscription?: Transcription
  turnComplete?: boolean
  urlContextMetadata?: UrlContextMetadata
```

----------------------------------------

TITLE: Interface: CreateFileConfig
DESCRIPTION: Specifies configuration options for file creation operations. It allows for setting an AbortSignal to cancel the operation and custom HTTP options for the request.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_30

LANGUAGE: APIDOC
CODE:
```
interface CreateFileConfig
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
```

----------------------------------------

TITLE: Modality Enumeration API Definition
DESCRIPTION: API documentation for the Modality enumeration, which defines different types of data modalities used in the @google/genai library. It includes members for audio, image, text, and an unspecified modality, along with their string values and source file locations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.Modality.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration Modality
  Defined in types.ts:98

  Members:
    MODALITY_UNSPECIFIED: "MODALITY_UNSPECIFIED"
      Defined in types.ts:99
    TEXT: "TEXT"
      Defined in types.ts:100
    IMAGE: "IMAGE"
      Defined in types.ts:101
    AUDIO: "AUDIO"
      Defined in types.ts:102
```

----------------------------------------

TITLE: APIDOC: Interface RealtimeInputConfig
DESCRIPTION: Configuration for real-time input processing, including settings for activity handling, automatic activity detection, and turn coverage.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_234

LANGUAGE: typescript
CODE:
```
export interface RealtimeInputConfig {
    activityHandling?: ActivityHandling;
    automaticActivityDetection?: AutomaticActivityDetection;
    turnCoverage?: TurnCoverage;
}
```

----------------------------------------

TITLE: APIDOC: Interface DynamicRetrievalConfig
DESCRIPTION: Describes the options to customize dynamic retrieval within the `@google/genai` library. This interface defines properties like 'dynamicThreshold' for setting a retrieval threshold and 'mode' for specifying the predictor's mode.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.DynamicRetrievalConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface DynamicRetrievalConfig
  Describes the options to customize dynamic retrieval.

  Properties:
    dynamicThreshold?: number
      Optional. The threshold to be used in dynamic retrieval. If not set, a system default value is used.
    mode?: DynamicRetrievalConfigMode
      The mode of the predictor to be used in dynamic retrieval.
```

----------------------------------------

TITLE: API Interface: CreateChatParameters Definition
DESCRIPTION: Defines the parameters required to initialize a new chat session, used with the `chats.create()` method. This interface specifies the configuration, initial history, and model name for the chat.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CreateChatParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface CreateChatParameters {
  config?: GenerateContentConfig
    Description: Config for the entire chat session. This config applies to all requests within the session unless overridden by a per-request `config` in `SendMessageParameters`.
  history?: Content[]
    Description: The initial conversation history for the chat session. This allows you to start the chat with a pre-existing history. The history must be a list of `Content` alternating between 'user' and 'model' roles. It should start with a 'user' message.
  model: string
    Description: The name of the model to use for the chat session. For example: 'gemini-2.0-flash', 'gemini-1.5-pro', etc. See gemini API docs to find the available models.
}
```

----------------------------------------

TITLE: EmbedContentResponse Class API Reference
DESCRIPTION: API documentation for the `EmbedContentResponse` class, detailing its constructor and properties. This class represents the response structure for the `embed_content` method, providing content embeddings and optional metadata.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.EmbedContentResponse.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Class: EmbedContentResponse
  Description: Response for the embed_content method.
  Source: types.ts:1318

  Constructors:
    constructor(): EmbedContentResponse
      Returns: EmbedContentResponse

  Properties:
    embeddings?: ContentEmbedding[]
      Description: The embeddings for each request, in the same order as provided in the batch request.
      Type: ContentEmbedding[]
      Optional: true
      Source: types.ts:1322

    metadata?: EmbedContentMetadata
      Description: Vertex API only. Metadata about the request.
      Type: EmbedContentMetadata
      Optional: true
      Source: types.ts:1325
```

----------------------------------------

TITLE: APIDOC: GoogleSearch Interface Definition
DESCRIPTION: Defines the GoogleSearch interface, a tool designed to integrate Google Search capabilities into a model. It is part of the @google/genai library and is defined in types.ts.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GoogleSearch.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface GoogleSearch
  Tool to support Google Search in Model. Powered by Google.
  Defined in types.ts:527
```

----------------------------------------

TITLE: FileSource Enumeration API Definition
DESCRIPTION: API documentation for the FileSource enumeration, which defines the possible origins or sources for a file within the @google/genai library. It includes members such as GENERATED, SOURCE_UNSPECIFIED, and UPLOADED, along with their string values.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.FileSource.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration FileSource
  Defined in types.ts:158

  Members:
    GENERATED: "GENERATED" (Defined in types.ts:161)
    SOURCE_UNSPECIFIED: "SOURCE_UNSPECIFIED" (Defined in types.ts:159)
    UPLOADED: "UPLOADED" (Defined in types.ts:160)
```

----------------------------------------

TITLE: Schema Property: minLength
DESCRIPTION: Sets the minimum length for Type.STRING schema fields.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_4

LANGUAGE: APIDOC
CODE:
```
minLength?: string
Optional. SCHEMA FIELDS FOR TYPE STRING Minimum length of the Type.STRING
```

----------------------------------------

TITLE: API Interface: CreateAuthTokenConfig
DESCRIPTION: Configuration for creating an authentication token, including expiry, HTTP options, and usage constraints.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_25

LANGUAGE: APIDOC
CODE:
```
interface CreateAuthTokenConfig:
  abortSignal?: AbortSignal
  expireTime?: string
  httpOptions?: HttpOptions
  liveConnectConstraints?: LiveConnectConstraints
  lockAdditionalFields?: string[]
  newSessionExpireTime?: string
  uses?: number
```

----------------------------------------

TITLE: API Interface: CreateAuthTokenParameters
DESCRIPTION: Parameters for creating an authentication token, primarily its configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_26

LANGUAGE: APIDOC
CODE:
```
interface CreateAuthTokenParameters:
  config?: CreateAuthTokenConfig
```

----------------------------------------

TITLE: API Interface: ContentEmbeddingStatistics
DESCRIPTION: Provides statistics related to content embeddings, such as token count and truncation status.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_15

LANGUAGE: APIDOC
CODE:
```
interface ContentEmbeddingStatistics:
  tokenCount?: number
  truncated?: boolean
```

----------------------------------------

TITLE: Define ApiError Class
DESCRIPTION: Defines the ApiError class, which extends Error and includes a status code, used for handling API-specific errors.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_137

LANGUAGE: APIDOC
CODE:
```
ApiError:
  __init__(options: ApiErrorInfo)
  status: number
```

----------------------------------------

TITLE: APIDOC: GoogleMaps Interface
DESCRIPTION: Represents configuration related to Google Maps integration, specifically for authentication.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_122

LANGUAGE: APIDOC
CODE:
```
GoogleMaps:
  authConfig?: AuthConfig (Optional)
```

----------------------------------------

TITLE: APIDOC: Mode Enumeration Definition
DESCRIPTION: API documentation for the `Mode` enumeration, defining its structure and available members. This enumeration is used to specify different operational modes within the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.Mode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration: Mode
  Defined in: types.ts:55
  Members:
    MODE_DYNAMIC: "MODE_DYNAMIC" (Defined in types.ts:57)
    MODE_UNSPECIFIED: "MODE_UNSPECIFIED" (Defined in types.ts:56)
```

----------------------------------------

TITLE: TypeScript Interface: TunedModelInfo
DESCRIPTION: Provides general information about a tuned model, such as its base model, creation time, and last update time.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_285

LANGUAGE: TypeScript
CODE:
```
export interface TunedModelInfo {
    baseModel?: string;
    createTime?: string;
    updateTime?: string;
}
```

----------------------------------------

TITLE: APIDOC: CreateFileConfig Interface Definition
DESCRIPTION: API documentation for the `CreateFileConfig` interface, which is used to override default configuration settings, particularly HTTP request options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.CreateFileConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface CreateFileConfig:
  description: Used to override the default configuration.
  properties:
    httpOptions:
      type: HttpOptions
      optional: true
      description: Used to override HTTP request options.
      defined_in: types.ts:1760
```

----------------------------------------

TITLE: APIDOC: GoogleRpcStatus Interface
DESCRIPTION: Standard Google RPC status object, used to convey error details including a numeric code, message, and additional structured details.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_123

LANGUAGE: APIDOC
CODE:
```
GoogleRpcStatus:
  code?: number (Optional)
  details?: Record<string, unknown>[] (Optional)
  message?: string (Optional)
```

----------------------------------------

TITLE: labels Parameter
DESCRIPTION: Labels with user-defined metadata to break down billed charges.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_7

LANGUAGE: TypeScript
CODE:
```
labels?: Record<string, string>
```

----------------------------------------

TITLE: API Type Alias: ContentListUnion
DESCRIPTION: A union type representing various forms of content lists, including single content, array of content, or parts.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_16

LANGUAGE: APIDOC
CODE:
```
type ContentListUnion = Content | Content[] | PartUnion | PartUnion[]
```

----------------------------------------

TITLE: API Definition: SupervisedTuningDataStats Interface in TypeScript
DESCRIPTION: Provides statistics for supervised tuning data, including reasons for dropped examples.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_269

LANGUAGE: APIDOC
CODE:
```
SupervisedTuningDataStats:
  droppedExampleReasons: string[] (optional)
```

----------------------------------------

TITLE: APIDOC: Interface ReplayRequest
DESCRIPTION: Defines the structure of a replayed request, including body segments, headers, HTTP method, and URL.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_238

LANGUAGE: typescript
CODE:
```
export interface ReplayRequest {
    bodySegments?: Record<string, unknown>[];
    headers?: Record<string, string>;
    method?: string;
    url?: string;
}
```

----------------------------------------

TITLE: API Enum: FileState
DESCRIPTION: Enumerates the possible states of a file, such as active, failed, or processing.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_81

LANGUAGE: APIDOC
CODE:
```
// @public
export enum FileState {
    // (undocumented)
    ACTIVE = "ACTIVE",
    // (undocumented)
    FAILED = "FAILED",
    // (undocumented)
    PROCESSING = "PROCESSING",
    // (undocumented)
    STATE_UNSPECIFIED = "STATE_UNSPECIFIED"
}
```

----------------------------------------

TITLE: Vertex AI Search Data Store Specification Interface
DESCRIPTION: Specifies details for a Vertex AI Search data store, including the data store identifier and an optional filter.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_308

LANGUAGE: APIDOC
CODE:
```
VertexAISearchDataStoreSpec:
  dataStore?: string
  filter?: string
```

----------------------------------------

TITLE: Enum: Modality
DESCRIPTION: Defines general content modalities, including audio, image, and text.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_205

LANGUAGE: APIDOC
CODE:
```
enum Modality {
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED",
  TEXT = "TEXT"
}
```

----------------------------------------

TITLE: APIDOC: LiveServerSetupComplete Interface Definition
DESCRIPTION: API documentation for the `LiveServerSetupComplete` interface, which is part of the `@google/genai` library. This interface defines the structure of messages sent from the server in response to a `LiveGenerateContentSetup` message from the client.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveServerSetupComplete.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveServerSetupComplete
  Description: Sent in response to a `LiveGenerateContentSetup` message from the client.
  Defined in: types.ts:2063
```

----------------------------------------

TITLE: APIDOC: Interface SafetyAttributes
DESCRIPTION: Attributes related to content safety, including categories, content type, and associated safety scores.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_243

LANGUAGE: typescript
CODE:
```
export interface SafetyAttributes {
    categories?: string[];
    contentType?: string;
    scores?: number[];
}
```

----------------------------------------

TITLE: API Definition: SearchEntryPoint Interface in TypeScript
DESCRIPTION: Specifies the structure for a search entry point, including rendered content and SDK blob.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_250

LANGUAGE: APIDOC
CODE:
```
SearchEntryPoint:
  renderedContent: string (optional)
  sdkBlob: string (optional)
```

----------------------------------------

TITLE: Interface: DeleteModelConfig
DESCRIPTION: Configuration options for deleting a model. It allows for setting an AbortSignal to cancel the operation and custom HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_53

LANGUAGE: APIDOC
CODE:
```
interface DeleteModelConfig
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
```

----------------------------------------

TITLE: APIDOC Class: LiveMusicSession
DESCRIPTION: Manages a live music session, providing methods for connection, playback control, and configuration updates. It interacts with a WebSocket connection and an API client.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_181

LANGUAGE: APIDOC
CODE:
```
LiveMusicSession:
  constructor(conn: WebSocket_2, apiClient: ApiClient)
  close(): void
  readonly conn: WebSocket_2
  pause(): void
  play(): void
  resetContext(): void
  setMusicGenerationConfig(params: types.LiveMusicSetConfigParameters): Promise<void>
  setWeightedPrompts(params: types.LiveMusicSetWeightedPromptsParameters): Promise<void>
  stop(): void
```

----------------------------------------

TITLE: ReplayInteraction Interface Definition
DESCRIPTION: Defines the structure for a single replay interaction, including optional request and response components, used in replay scenarios.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ReplayInteraction.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface ReplayInteraction {
  request?: ReplayRequest;
  response?: ReplayResponse;
}

Properties:
  request:
    Type: ReplayRequest
    Description: Optional request component of the interaction.
  response:
    Type: ReplayResponse
    Description: Optional response component of the interaction.
```

----------------------------------------

TITLE: APIDOC Interface: LiveMusicSetWeightedPromptsParameters
DESCRIPTION: Defines the parameters for setting weighted prompts, which influence music generation based on a list of WeightedPrompt objects.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_183

LANGUAGE: APIDOC
CODE:
```
LiveMusicSetWeightedPromptsParameters:
  weightedPrompts: WeightedPrompt[]
```

----------------------------------------

TITLE: APIDOC: SubjectReferenceConfig Interface
DESCRIPTION: Defines the configuration for a Subject reference image, including optional properties for subject description and type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SubjectReferenceConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface SubjectReferenceConfig
  Configuration for a Subject reference image.

  Properties:
    subjectDescription?: string
      Subject description for the image.
    subjectType?: SubjectReferenceType
      The subject type of a subject reference image.
```

----------------------------------------

TITLE: APIDOC Interface: LiveMusicSourceMetadata
DESCRIPTION: Provides metadata about the source of live music, including client content and music generation configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_184

LANGUAGE: APIDOC
CODE:
```
LiveMusicSourceMetadata:
  clientContent?: LiveMusicClientContent
  musicGenerationConfig?: LiveMusicGenerationConfig
```

----------------------------------------

TITLE: API Documentation for createPartFromFunctionResponse
DESCRIPTION: Detailed API documentation for the createPartFromFunctionResponse function from the @google/genai library, explaining its purpose, parameters, and return type for creating Part objects from FunctionResponse objects.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromFunctionResponse.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
createPartFromFunctionResponse:
  Description: Creates a Part object from a FunctionResponse object.
  Signature: createPartFromFunctionResponse(id: string, name: string, response: Record<string, unknown>): Part[]
  Parameters:
    - id: string
    - name: string
    - response: Record<string, unknown>
  Returns: Part[]
```

----------------------------------------

TITLE: APIDOC: GetFileConfig Interface and Properties
DESCRIPTION: Documentation for the `GetFileConfig` interface, which allows overriding default configuration. It details the interface structure and its `httpOptions` property, used for customizing HTTP request settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GetFileConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface GetFileConfig
  Description: Used to override the default configuration.
  Definition:
    interface GetFileConfig {
        httpOptions?: HttpOptions;
    }

Properties:
  httpOptions:
    Type: HttpOptions
    Optional: true
    Description: Used to override HTTP request options.
```

----------------------------------------

TITLE: API: ThinkingConfig Interface Definition
DESCRIPTION: Defines the configuration for thinking features, allowing control over whether to include model thoughts in the response. This interface is part of the @google/genai library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ThinkingConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface ThinkingConfig
  Description: The thinking features configuration.
  Properties:
    includeThoughts?: boolean
      Description: Indicates whether to include thoughts in the response. If true, thoughts are returned only if the model supports thought and thoughts are available.
      Defined in: types.ts:639
```

----------------------------------------

TITLE: Schema Property: minimum
DESCRIPTION: Defines the minimum value for Type.INTEGER and Type.NUMBER schema fields.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_2

LANGUAGE: APIDOC
CODE:
```
minimum?: number
Optional. SCHEMA FIELDS FOR TYPE INTEGER and NUMBER Minimum value of the Type.INTEGER and Type.NUMBER
```

----------------------------------------

TITLE: APIDOC Interface: LiveSendClientContentParameters
DESCRIPTION: Parameters for sending client content, indicating if a turn is complete and including a list of content turns.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_185

LANGUAGE: APIDOC
CODE:
```
LiveSendClientContentParameters:
  turnComplete?: boolean
  turns?: ContentListUnion
```

----------------------------------------

TITLE: URL Metadata Interface
DESCRIPTION: Provides metadata for a specific URL, including the retrieved URL string and its retrieval status.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_304

LANGUAGE: APIDOC
CODE:
```
UrlMetadata:
  retrievedUrl?: string
  urlRetrievalStatus?: UrlRetrievalStatus
```

----------------------------------------

TITLE: Interface: DeleteCachedContentConfig
DESCRIPTION: Configuration options for deleting cached content. It allows for setting an AbortSignal to cancel the operation and custom HTTP options.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_47

LANGUAGE: APIDOC
CODE:
```
interface DeleteCachedContentConfig
  abortSignal?: AbortSignal
  httpOptions?: HttpOptions
```

----------------------------------------

TITLE: Define HarmSeverity Enum
DESCRIPTION: Defines the severity levels of harmful content, from negligible to high.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_136

LANGUAGE: APIDOC
CODE:
```
HarmSeverity:
  HARM_SEVERITY_HIGH = "HARM_SEVERITY_HIGH"
  HARM_SEVERITY_LOW = "HARM_SEVERITY_LOW"
  HARM_SEVERITY_MEDIUM = "HARM_SEVERITY_MEDIUM"
  HARM_SEVERITY_NEGLIGIBLE = "HARM_SEVERITY_NEGLIGIBLE"
  HARM_SEVERITY_UNSPECIFIED = "HARM_SEVERITY_UNSPECIFIED"
```

----------------------------------------

TITLE: API Interface: CreateCachedContentParameters
DESCRIPTION: Parameters for creating cached content, specifying the model and configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_28

LANGUAGE: APIDOC
CODE:
```
interface CreateCachedContentParameters:
  config?: CreateCachedContentConfig
  model: string
```

----------------------------------------

TITLE: Video Interface
DESCRIPTION: Defines properties for a video asset, such as its MIME type, URI, and byte content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_311

LANGUAGE: APIDOC
CODE:
```
Video:
  mimeType?: string
  uri?: string
  videoBytes?: string
```

----------------------------------------

TITLE: API Documentation for UpdateCachedContentConfig Interface
DESCRIPTION: Defines the `UpdateCachedContentConfig` interface, which provides optional parameters for the `caches.update` method, including expiration time, HTTP options, and time-to-live settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.UpdateCachedContentConfig.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface UpdateCachedContentConfig:
  description: Optional parameters for caches.update method.
  properties:
    expireTime?: string
      description: Timestamp of when this resource is considered expired.
    httpOptions?: HttpOptions
      description: Used to override HTTP request options.
    ttl?: string
      description: The TTL for this resource. The expiration time is computed: now + TTL.
```

----------------------------------------

TITLE: API Definition: setDefaultBaseUrls Function in TypeScript
DESCRIPTION: Sets the default base URLs for API requests based on provided parameters.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_255

LANGUAGE: APIDOC
CODE:
```
setDefaultBaseUrls(baseUrlParams: BaseUrlParameters): void
```

----------------------------------------

TITLE: APIDOC: createPartFromText Function Reference
DESCRIPTION: API documentation for the `createPartFromText` function from the `@google/genai` library. This function is used to convert a string of text into a `Part` object, which is likely a component used in generative AI models.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/functions/types.createPartFromText.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
createPartFromText:
  signature: createPartFromText(text: string): Part
  description: Creates a Part object from a text string.
  parameters:
    - name: text
      type: string
  returns:
    type: Part
  source: types.ts:288
```

----------------------------------------

TITLE: GenerateContentResponseUsageMetadata Class API Reference
DESCRIPTION: Detailed API documentation for the `GenerateContentResponseUsageMetadata` class, including its constructor and properties for tracking token counts in generative AI responses.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.GenerateContentResponseUsageMetadata.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class GenerateContentResponseUsageMetadata
  Description: Usage metadata about response(s).
  Defined in: types.ts:990

  Constructors:
    constructor(): GenerateContentResponseUsageMetadata

  Properties:
    cachedContentTokenCount?: number
      Description: Output only. Number of tokens in the cached part in the input (the cached content).
      Defined in: types.ts:994
    cacheTokensDetails?: ModalityTokenCount[]
      Description: Output only. List of modalities of the cached content in the request input.
      Defined in: types.ts:992
    candidatesTokenCount?: number
      Description: Number of tokens in the response(s).
      Defined in: types.ts:996
    candidatesTokensDetails?: ModalityTokenCount[]
      Description: Output only. List of modalities that were returned in the response.
      Defined in: types.ts:998
    promptTokenCount?: number
      Description: Number of tokens in the request. When `cached_content` is set, this is still the total effective prompt size meaning this includes the number of tokens in the cached content.
      Defined in: types.ts:1000
    promptTokensDetails?: ModalityTokenCount[]
      Description: Output only. List of modalities that were processed in the request input.
      Defined in: types.ts:1002
    thoughtsTokenCount?: number
      Description: Output only. Number of tokens present in thoughts output.
      Defined in: types.ts:1004
    toolUsePromptTokenCount?: number
      Description: Output only. Number of tokens present in tool-use prompt(s).
      Defined in: types.ts:1006
    toolUsePromptTokensDetails?: ModalityTokenCount[]
      Description: Output only. List of modalities that were processed for tool-use request inputs.
      Defined in: types.ts:1008
    totalTokenCount?: number
      Description: Total token count for prompt, response candidates, and tool-use prompts (if present).
      Defined in: types.ts:1010
```

----------------------------------------

TITLE: API Interface: ListTuningJobsParameters
DESCRIPTION: Specifies the parameters for a tuning job listing request, primarily containing the configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_157

LANGUAGE: APIDOC
CODE:
```
Interface ListTuningJobsParameters:
  config?: ListTuningJobsConfig // (undocumented)
```

----------------------------------------

TITLE: API Interface: ListFilesParameters
DESCRIPTION: Specifies the parameters for a file listing request, primarily containing the configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_151

LANGUAGE: APIDOC
CODE:
```
Interface ListFilesParameters:
  config?: ListFilesConfig
```

----------------------------------------

TITLE: LogprobsResult Interface Definition
DESCRIPTION: Defines the structure of the LogprobsResult interface, detailing its optional properties chosenCandidates and topCandidates, which provide log probability information for generated text.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LogprobsResult.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface LogprobsResult
  Description: Logprobs Result
  Defined in: types.ts:918

  Properties:
    chosenCandidates?: LogprobsResultCandidate[]
      Description: Length = total number of decoding steps. The chosen candidates may or may not be in top_candidates.
      Defined in: types.ts:920

    topCandidates?: LogprobsResultTopCandidates[]
      Description: Length = total number of decoding steps.
      Defined in: types.ts:922
```

----------------------------------------

TITLE: API Interface: ControlReferenceConfig
DESCRIPTION: Configuration for control references, specifying control type and enabling image computation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_19

LANGUAGE: APIDOC
CODE:
```
interface ControlReferenceConfig:
  controlType?: ControlReferenceType
  enableControlImageComputation?: boolean
```

----------------------------------------

TITLE: ListFilesParameters Interface API Definition
DESCRIPTION: Defines the structure for parameters used in the list method, allowing configuration overrides. This interface includes an optional 'config' property to override default settings.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ListFilesParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: ListFilesParameters
  Description: Generates the parameters for the list method.
  Defined in: types.ts:1702
  Properties:
    config?: ListFilesConfig
      Description: Used to override the default configuration.
      Defined in: types.ts:1704
```

----------------------------------------

TITLE: candidateCount Parameter
DESCRIPTION: Number of response variations to return.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_4

LANGUAGE: TypeScript
CODE:
```
candidateCount?: number
```

----------------------------------------

TITLE: Define ApiErrorInfo Interface
DESCRIPTION: Defines the structure for the ApiErrorInfo object, containing details about an API error, including its message and status code.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_138

LANGUAGE: APIDOC
CODE:
```
ApiErrorInfo:
  message: string
  status: number
```

----------------------------------------

TITLE: Interface: MultiSpeakerVoiceConfig
DESCRIPTION: Configuration for multi-speaker voice settings, including individual speaker voice configurations.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_211

LANGUAGE: APIDOC
CODE:
```
interface MultiSpeakerVoiceConfig {
  speakerVoiceConfigs?: SpeakerVoiceConfig[];
}
```

----------------------------------------

TITLE: Define GroundingMetadata Interface
DESCRIPTION: Defines the structure for the GroundingMetadata object, encapsulating all metadata related to grounding, including chunks, supports, retrieval info, and search queries.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_130

LANGUAGE: APIDOC
CODE:
```
GroundingMetadata:
  groundingChunks?: GroundingChunk[]
  groundingSupports?: GroundingSupport[]
  retrievalMetadata?: RetrievalMetadata
  retrievalQueries?: string[]
  searchEntryPoint?: SearchEntryPoint
  webSearchQueries?: string[]
```

----------------------------------------

TITLE: APIDOC: Interface ProactivityConfig
DESCRIPTION: Configuration related to proactive audio behavior, indicating whether proactive audio is enabled.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_224

LANGUAGE: typescript
CODE:
```
export interface ProactivityConfig {
    proactiveAudio?: boolean;
}
```

----------------------------------------

TITLE: APIDOC: Class ReplayResponse
DESCRIPTION: Represents a replayed response, containing body segments, headers, SDK-specific response segments, and the HTTP status code.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_239

LANGUAGE: typescript
CODE:
```
export class ReplayResponse {
    bodySegments?: Record<string, unknown>[];
    headers?: Record<string, string>;
    sdkResponseSegments?: Record<string, unknown>[];
    statusCode?: number;
}
```

----------------------------------------

TITLE: APIDOC: Interface ReplayInteraction
DESCRIPTION: Represents a single interaction within a replay, comprising a request and its corresponding response.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_237

LANGUAGE: typescript
CODE:
```
export interface ReplayInteraction {
    request?: ReplayRequest;
    response?: ReplayResponse;
}
```

----------------------------------------

TITLE: API Definition: SchemaUnion Type in TypeScript
DESCRIPTION: Defines a union type that can be either a Schema object or an unknown type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_249

LANGUAGE: APIDOC
CODE:
```
SchemaUnion: Schema | unknown
```

----------------------------------------

TITLE: API Interface: EnterpriseWebSearch
DESCRIPTION: Represents configuration for enterprise web search functionality.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_72

LANGUAGE: APIDOC
CODE:
```
// @public
export interface EnterpriseWebSearch {
}
```

----------------------------------------

TITLE: Interface: OperationGetParameters
DESCRIPTION: Parameters for retrieving an operation, including configuration and the operation object itself.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_213

LANGUAGE: APIDOC
CODE:
```
interface OperationGetParameters {
  config?: GetOperationConfig;
  operation: GenerateVideosOperation;
}
```

----------------------------------------

TITLE: APIDOC: @google/genai Image Interface
DESCRIPTION: Documentation for the `Image` interface within the `@google/genai` library, detailing its properties for representing image data via Cloud Storage URI or direct bytes, along with its MIME type.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Image.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface Image:
  Description: An image.
  Properties:
    - gcsUri?: string
      Description: The Cloud Storage URI of the image. `Image` can contain a value for this field or the `image_bytes` field but not both.
    - imageBytes?: string
      Description: The image bytes data. `Image` can contain a value for this field or the `gcs_uri` field but not both.
    - mimeType?: string
      Description: The MIME type of the image.
```

----------------------------------------

TITLE: CountTokensResponse Class API Reference
DESCRIPTION: Defines the structure and members of the `CountTokensResponse` class, used for responses when counting tokens in the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/classes/types.CountTokensResponse.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Class: CountTokensResponse
  Description: Response for counting tokens.
  Defined in: types.ts:1510

  Constructors:
    constructor(): CountTokensResponse
      Returns: CountTokensResponse

  Properties:
    cachedContentTokenCount?: number
      Description: Number of tokens in the cached part of the prompt (the cached content).
      Defined in: types.ts:1514
    totalTokens?: number
      Description: Total number of tokens.
      Defined in: types.ts:1512
```

----------------------------------------

TITLE: APIDOC: GetCachedContentParameters Interface
DESCRIPTION: Parameters for retrieving specific cached content by its unique name, along with optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_111

LANGUAGE: APIDOC
CODE:
```
GetCachedContentParameters:
  config?: GetCachedContentConfig (Optional)
  name: string (Required)
```

----------------------------------------

TITLE: API Reference: Enumerations
DESCRIPTION: Lists all available enumerations in the Google Generative AI JavaScript client library, providing predefined sets of named constants for various API parameters and states.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/types.html#_snippet_5

LANGUAGE: APIDOC
CODE:
```
Enumerations:
  BlockedReason
  ControlReferenceType
  DynamicRetrievalConfigMode
  FileSource
  FileState
  FinishReason
  FunctionCallingConfigMode
  HarmBlockMethod
  HarmBlockThreshold
  HarmCategory
  HarmProbability
  HarmSeverity
  ImagePromptLanguage
  Language
  MaskReferenceMode
  MediaResolution
  Modality
  Mode
  Outcome
  PersonGeneration
  SafetyFilterLevel
  State
  SubjectReferenceType
  Type
```

----------------------------------------

TITLE: API Interface: File
DESCRIPTION: Represents a file object with properties like creation time, display name, download URI, and status.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_77

LANGUAGE: APIDOC
CODE:
```
// @public
interface File_2 {
    createTime?: string;
    displayName?: string;
    downloadUri?: string;
    error?: FileStatus;
    expirationTime?: string;
    mimeType?: string;
    name?: string;
    sha256Hash?: string;
    sizeBytes?: string;
    source?: FileSource;
    state?: FileState;
    updateTime?: string;
    uri?: string;
    videoMetadata?: Record<string, unknown>;
}
export { File_2 as File }
```

----------------------------------------

TITLE: API Enum: FeatureSelectionPreference
DESCRIPTION: Enumerates preferences for feature selection, balancing between cost and quality.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_74

LANGUAGE: APIDOC
CODE:
```
// @public
export enum FeatureSelectionPreference {
    // (undocumented)
    BALANCED = "BALANCED",
    // (undocumented)
    FEATURE_SELECTION_PREFERENCE_UNSPECIFIED = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",
    // (undocumented)
    PRIORITIZE_COST = "PRIORITIZE_COST",
    // (undocumented)
    PRIORITIZE_QUALITY = "PRIORITIZE_QUALITY"
}
```

----------------------------------------

TITLE: API Documentation: @google/genai Models Module Overview
DESCRIPTION: This section provides an overview of the `models` module within the `@google/genai` library, detailing the classes it exposes, such as the `Models` class.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/models.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Module models
Classes
Models
```

----------------------------------------

TITLE: API Definition: SupervisedHyperParameters Interface in TypeScript
DESCRIPTION: Defines hyperparameters for supervised learning, such as adapter size, epoch count, and learning rate multiplier.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_266

LANGUAGE: APIDOC
CODE:
```
SupervisedHyperParameters:
  adapterSize: AdapterSize (optional)
  epochCount: string (optional)
  learningRateMultiplier: number (optional)
```

----------------------------------------

TITLE: TypeScript Interface: TuningDataset
DESCRIPTION: Defines a dataset used for model tuning, which can include examples or a GCS URI.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_286

LANGUAGE: TypeScript
CODE:
```
export interface TuningDataset {
    examples?: TuningExample[];
    gcsUri?: string;
}
```

----------------------------------------

TITLE: APIDOC: SpeechConfig Interface Reference
DESCRIPTION: This snippet provides the API documentation for the `SpeechConfig` interface, detailing its purpose and the `voiceConfig` property for configuring speech generation.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SpeechConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface: SpeechConfig
  Description: The speech generation configuration.
  Defined In: types.ts:629

  Properties:
    voiceConfig:
      Type: VoiceConfig
      Optional: true
      Description: The configuration for the speaker to use.
      Defined In: types.ts:632
```

----------------------------------------

TITLE: ContentEmbedding Interface Definition
DESCRIPTION: Defines the structure for an embedding generated from input content. It includes optional properties for associated statistics and the embedding's numerical values.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ContentEmbedding.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
interface ContentEmbedding {
  statistics?: ContentEmbeddingStatistics;
  values?: number[];
}

Properties:
  statistics?: ContentEmbeddingStatistics
    Description: Vertex API only. Statistics of the input text associated with this embedding.
  values?: number[]
    Description: A list of floats representing an embedding.
```

----------------------------------------

TITLE: URL Context Metadata Interface
DESCRIPTION: Contains metadata related to a URL context, specifically a list of URL metadata entries.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_303

LANGUAGE: APIDOC
CODE:
```
UrlContextMetadata:
  urlMetadata?: UrlMetadata[]
```

----------------------------------------

TITLE: Class: DeleteFileResponse
DESCRIPTION: Represents the response object returned after a file deletion operation. This class currently has no specific properties.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_52

LANGUAGE: APIDOC
CODE:
```
class DeleteFileResponse
```

----------------------------------------

TITLE: Class: DeleteCachedContentResponse
DESCRIPTION: Represents the response object returned after a cached content deletion operation. This class currently has no specific properties.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_49

LANGUAGE: APIDOC
CODE:
```
class DeleteCachedContentResponse
```

----------------------------------------

TITLE: APIDOC Interface: LiveMusicConnectParameters
DESCRIPTION: Defines the parameters required to establish a connection for live music interaction, including callbacks and the model name.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_174

LANGUAGE: APIDOC
CODE:
```
LiveMusicConnectParameters:
  callbacks: LiveMusicCallbacks
  model: string
```

----------------------------------------

TITLE: Interface: DistillationDataStats
DESCRIPTION: Provides statistics related to distillation data. It includes an optional training dataset statistics object.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_56

LANGUAGE: APIDOC
CODE:
```
interface DistillationDataStats
  trainingDatasetStats?: DatasetStats
```

----------------------------------------

TITLE: APIDOC: MaskReferenceMode Enumeration
DESCRIPTION: Defines the `MaskReferenceMode` enumeration, which specifies different modes for mask references. This enumeration is part of the `@google/genai` library and is defined in `types.ts`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.MaskReferenceMode.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration MaskReferenceMode
  Defined in types.ts:164

  Members:
    MASK_MODE_BACKGROUND: "MASK_MODE_BACKGROUND"
      Defined in types.ts:167
    MASK_MODE_DEFAULT: "MASK_MODE_DEFAULT"
      Defined in types.ts:165
    MASK_MODE_FOREGROUND: "MASK_MODE_FOREGROUND"
      Defined in types.ts:168
    MASK_MODE_SEMANTIC: "MASK_MODE_SEMANTIC"
      Defined in types.ts:169
    MASK_MODE_USER_PROVIDED: "MASK_MODE_USER_PROVIDED"
      Defined in types.ts:166
```

----------------------------------------

TITLE: APIDOC: @google/genai Module live Classes Overview
DESCRIPTION: API documentation providing an overview of the classes defined within the `@google/genai` 'live' module.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/live.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Module: live
  Classes:
    - Live
    - Session
```

----------------------------------------

TITLE: API Definition: StyleReferenceConfig Interface in TypeScript
DESCRIPTION: Configuration for style references, typically including a description of the style.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_261

LANGUAGE: APIDOC
CODE:
```
StyleReferenceConfig:
  styleDescription: string (optional)
```

----------------------------------------

TITLE: APIDOC: GetModelParameters Interface
DESCRIPTION: Parameters for retrieving details about a specific model by its identifier, along with optional configuration.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_115

LANGUAGE: APIDOC
CODE:
```
GetModelParameters:
  config?: GetModelConfig (Optional)
  model: string (Required)
```

----------------------------------------

TITLE: API Definition: SubjectReferenceConfig Interface in TypeScript
DESCRIPTION: Configuration for subject references, including a description and type of the subject.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_263

LANGUAGE: APIDOC
CODE:
```
SubjectReferenceConfig:
  subjectDescription: string (optional)
  subjectType: SubjectReferenceType (optional)
```

----------------------------------------

TITLE: APIDOC: GoogleSearch Interface
DESCRIPTION: Configuration for Google Search functionality, specifically allowing for time range filtering.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_124

LANGUAGE: APIDOC
CODE:
```
GoogleSearch:
  timeRangeFilter?: Interval (Optional)
```

----------------------------------------

TITLE: APIDOC Interface: LiveSendRealtimeInputParameters
DESCRIPTION: Parameters for sending real-time input to the live music system, supporting various media types like audio, video, and text, along with activity markers.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_186

LANGUAGE: APIDOC
CODE:
```
LiveSendRealtimeInputParameters:
  activityEnd?: ActivityEnd
  activityStart?: ActivityStart
  audio?: Blob_2
  audioStreamEnd?: boolean
  media?: BlobImageUnion
  text?: string
  video?: BlobImageUnion
```

----------------------------------------

TITLE: APIDOC: ListFilesConfig Interface Definition
DESCRIPTION: Defines the configuration options for listing files in the `@google/genai` library. It allows overriding default settings for HTTP requests and pagination.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ListFilesConfig.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface ListFilesConfig
  Description: Used to override the default configuration.
  Properties:
    httpOptions?: HttpOptions
      Description: Used to override HTTP request options.
    pageSize?: number
      Description: Optional page size for pagination.
    pageToken?: string
      Description: Optional page token for pagination.
```

----------------------------------------

TITLE: UpdateCachedContentParameters Interface API Definition
DESCRIPTION: Defines the structure of parameters used to update cached content, including an optional configuration object and the required resource name. This interface is part of the `@google/genai` library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.UpdateCachedContentParameters.html#_snippet_0

LANGUAGE: APIDOC
CODE:
```
Interface UpdateCachedContentParameters {
  Properties:
    config:
      Type: UpdateCachedContentConfig
      Optional: true
      Description: Configuration that contains optional parameters.
    name:
      Type: string
      Optional: false
      Description: The server-generated resource name of the cached content.
}
```

----------------------------------------

TITLE: APIDOC: Interface SearchEntryPoint
DESCRIPTION: Defines the structure for a Google search entry point, specifying optional properties for web content snippets and base64 encoded SDK data. This interface is part of the @google/genai library.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.SearchEntryPoint.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface SearchEntryPoint {
  renderedContent?: string; // Optional. Web content snippet that can be embedded in a web page or an app webview.
  sdkBlob?: string; // Optional. Base64 encoded JSON representing array of tuple.
}
```

----------------------------------------

TITLE: Type: DownloadableFileUnion
DESCRIPTION: A union type representing various forms of downloadable files. It can be a string (likely a URI), a File_2 object, a GeneratedVideo, or a Video object.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_59

LANGUAGE: APIDOC
CODE:
```
type DownloadableFileUnion = string | File_2 | GeneratedVideo | Video
```

----------------------------------------

TITLE: APIDOC Interface: LiveMusicClientSetup
DESCRIPTION: Specifies the setup parameters for the Live Music client, primarily indicating the model to be used.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_173

LANGUAGE: APIDOC
CODE:
```
LiveMusicClientSetup:
  model?: string
```

----------------------------------------

TITLE: stopSequences Parameter
DESCRIPTION: List of strings that tells the model to stop generating text if one of the strings is encountered in the response.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_20

LANGUAGE: TypeScript
CODE:
```
stopSequences?: string[]
```

----------------------------------------

TITLE: API Documentation for ControlReferenceType Enumeration
DESCRIPTION: Defines an enumeration for various control reference types used within the @google/genai library, detailing each possible member and its definition location.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/enums/types.ControlReferenceType.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Enumeration ControlReferenceType
  Defined in types.ts:172

  Members:
  CONTROL_TYPE_CANNY: "CONTROL_TYPE_CANNY"
    Defined in types.ts:174
  CONTROL_TYPE_DEFAULT: "CONTROL_TYPE_DEFAULT"
    Defined in types.ts:173
  CONTROL_TYPE_FACE_MESH: "CONTROL_TYPE_FACE_MESH"
    Defined in types.ts:176
  CONTROL_TYPE_SCRIBBLE: "CONTROL_TYPE_SCRIBBLE"
    Defined in types.ts:175
```

----------------------------------------

TITLE: LiveCallbacks Interface API Reference
DESCRIPTION: API documentation for the `LiveCallbacks` interface, defining the structure for handling events from a live API connection. It includes optional callbacks for connection closure, errors, and opening, and a required callback for processing incoming messages.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveCallbacks.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface LiveCallbacks
  Description: Callbacks for the live API.

  Properties:
    onclose (Optional): null | (e: CloseEvent) => void
      Defined in types.ts:1807
    onerror (Optional): null | (e: ErrorEvent) => void
      Defined in types.ts:1806
    onmessage (Required): (e: LiveServerMessage) => void
      Defined in types.ts:1805
    onopen (Optional): null | () => void
      Defined in types.ts:1804
```

----------------------------------------

TITLE: API Definition: SupervisedTuningDatasetDistribution Interface in TypeScript
DESCRIPTION: Describes the distribution of a supervised tuning dataset, including statistical measures and data buckets.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_267

LANGUAGE: APIDOC
CODE:
```
SupervisedTuningDatasetDistribution:
  billableSum: string (optional)
  buckets: SupervisedTuningDatasetDistributionDatasetBucket[] (optional)
  max: number (optional)
  mean: number (optional)
  median: number (optional)
  min: number (optional)
  p5: number (optional)
  p95: number (optional)
  sum: string (optional)
```

----------------------------------------

TITLE: APIDOC: Interface ReplayFile Definition
DESCRIPTION: Defines the structure of the `ReplayFile` interface, which represents a recorded session, including its optional properties `interactions` and `replayId`.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.ReplayFile.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
interface ReplayFile {
  interactions?: ReplayInteraction[];
  replayId?: string;
}

Properties:
  interactions:
    Type: ReplayInteraction[]
    Optional: true
    Description: Represents a list of interactions within the recorded session.
    Defined in: types.ts:1878
  replayId:
    Type: string
    Optional: true
    Description: A unique identifier for the replay file.
    Defined in: types.ts:1877
```

----------------------------------------

TITLE: APIDOC: GetFileParameters Interface Definition
DESCRIPTION: Defines the `GetFileParameters` interface, which specifies the parameters required for the 'get' method, including an optional configuration object and a mandatory file name identifier.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GetFileParameters.html#_snippet_1

LANGUAGE: APIDOC
CODE:
```
Interface: GetFileParameters
  Description: Generates the parameters for the get method.
  Defined in: types.ts:1822
  Properties:
    config?: GetFileConfig
      Description: Used to override the default configuration.
      Defined in: types.ts:1826
    name: string
      Description: The name identifier for the file to retrieve.
      Defined in: types.ts:1824
```

----------------------------------------

TITLE: Schema Property: pattern
DESCRIPTION: Applies a regular expression pattern to restrict Type.STRING values.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.Schema.html#_snippet_7

LANGUAGE: APIDOC
CODE:
```
pattern?: string
Optional. Pattern of the Type.STRING to restrict a string to a regular expression.
```

----------------------------------------

TITLE: APIDOC: Interface RagChunkPageSpan
DESCRIPTION: Defines the page range for a RAG chunk, specifying the first and last page numbers.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_226

LANGUAGE: typescript
CODE:
```
export interface RagChunkPageSpan {
    firstPage?: number;
    lastPage?: number;
}
```

----------------------------------------

TITLE: responseLogprobs Parameter
DESCRIPTION: Whether to return the log probabilities of the tokens that were chosen by the model at each step.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.GenerateContentConfig.html#_snippet_12

LANGUAGE: TypeScript
CODE:
```
responseLogprobs?: boolean
```

----------------------------------------

TITLE: LiveConnectParameters Interface Definition and API Details
DESCRIPTION: Defines the `LiveConnectParameters` interface used for configuring connections to the live API, detailing its required and optional properties along with their types and descriptions.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/interfaces/types.LiveConnectParameters.html#_snippet_0

LANGUAGE: TypeScript
CODE:
```
interface LiveConnectParameters {
    callbacks: LiveCallbacks;
    config?: LiveConnectConfig;
    model: string;
}
```

LANGUAGE: APIDOC
CODE:
```
LiveConnectParameters Interface:
  Description: Parameters for connecting to the live API.
  Properties:
    callbacks:
      Type: LiveCallbacks
      Description: Callbacks for the live connection.
    config:
      Type: LiveConnectConfig (Optional)
      Description: Optional configuration parameters for the request.
    model:
      Type: string
      Description: ID of the model to use. For a list of models, see Google models (https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models).
```

----------------------------------------

TITLE: Google GenAI Types Module Classes
DESCRIPTION: Lists all classes available in the `@google/genai/types` module, representing structured data for API responses and other complex objects.
SOURCE: https://github.com/googleapis/js-genai/blob/main/docs/modules/types.html#_snippet_2

LANGUAGE: APIDOC
CODE:
```
Classes:
- ComputeTokensResponse
- CountTokensResponse
- CreateFileResponse
- DeleteCachedContentResponse
- EmbedContentResponse
- FunctionResponse
- GenerateContentResponse
- GenerateContentResponsePromptFeedback
- GenerateContentResponseUsageMetadata
- GenerateImagesResponse
- HttpResponse
- ListCachedContentsResponse
- ListFilesResponse
- LiveClientToolResponse
- LiveSendToolResponseParameters
- ReplayResponse
```

----------------------------------------

TITLE: API Interface: Checkpoint
DESCRIPTION: Represents a training checkpoint with ID, epoch, and step information.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_6

LANGUAGE: APIDOC
CODE:
```
interface Checkpoint:
  checkpointId?: string
  epoch?: string
  step?: string
```