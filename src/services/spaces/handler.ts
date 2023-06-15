import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
// import { postSpacesWithDoc } from "./PostSpacesWithDoc";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { MissingFieldError } from "../shared/Validator";

const ddbClient = new DynamoDBClient({});

const ddbDocCLient = DynamoDBDocumentClient.from(ddbClient);

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case "GET":
        const getResponse = await getSpaces(event, ddbClient );
        console.log(getResponse)
        return getResponse;
      case "POST":
        const postResponse = await postSpaces(event, ddbDocCLient);
        console.log(postResponse);
        return postResponse;
      case "PUT":
        const putResponse = await updateSpace(event, ddbDocCLient);
        console.log(putResponse);
        return putResponse;
      case "DELETE":
        const deleteResponse = await deleteSpace(event, ddbDocCLient);
        console.log(deleteResponse);
        return deleteResponse;
      default:
        break;
    }
  } catch (error) {
    // console.error(error);
    if(error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    }
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
