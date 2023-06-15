import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-2";
process.env.TABLE_NAME = "SpaceStack-02dc23b96807";


handler(
  {
    httpMethod: "POST",
    // queryStringParameters: {
    //   id: "4ebc6a6d-2bc7-4f90-82cb-1c0f4f16b95c",
    // },
    body: JSON.stringify({
        location: "Grecia"
    })
  } as any,
  {} as any
).then(result => console.log(result));
