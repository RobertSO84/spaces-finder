import {
  DynamoDBClient,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateSpace(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {

  if (event.queryStringParameters && ('id' in event.queryStringParameters) && event.body)  {
    // information needed for the query
    const parsedBody = JSON.parse(event.body);
    const spaceId = event.queryStringParameters['id'];
    const requestBodyKey = Object.keys(parsedBody)[0]; // For getting the location key that we want to update
    const requestBodyValue = parsedBody[requestBodyKey];

    // To prevent using a reserved word for the update, we use an UpdateExpression
    const updateResult = await ddbClient.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: spaceId },
      },
      UpdateExpression: 'set #zzzNew = :new', // expresión para update el nuevo valor en la key (location) buscada
      ExpressionAttributeValues: {
        ':new': {
          S: requestBodyValue
        }
      },
      ExpressionAttributeNames: {
        '#zzzNew': requestBodyKey
      },
      ReturnValues: 'UPDATED_NEW'
    }));

    return {
      statusCode: 204,
      body: JSON.stringify(updateResult.Attributes)
    }
    
  } 
  return {
    statusCode: 400,
    body: JSON.stringify('Please provide right args!')
  }
}
