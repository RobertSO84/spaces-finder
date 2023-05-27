import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "SpaceStack-02dc23b96807";


handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "26a38b79-5587-4a2c-8484-6e2f551442d0",
    },
    // body: JSON.stringify({
    //     location: "London"
    // })
  } as any,
  {} as any
);
