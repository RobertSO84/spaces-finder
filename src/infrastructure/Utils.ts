import { Fn, Stack } from "aws-cdk-lib";


// For S3 buckets unique names, and DynamoDb tablenNames, we use this metos to assign them the ID AWS generates automaticaly for the Stack, so they are related.
export function getSuffixFromStack(stack: Stack) {
    const shortStackId = Fn.select(2, Fn.split('/', stack.stackId));
    const suffix = Fn.select(4, Fn.split('-', shortStackId));
    return suffix;
}