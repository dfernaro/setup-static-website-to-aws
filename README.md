# How to configure your static website using AWS

This is a demo project which accompanies the article at https://medium.com/@dfernaro/unleash-your-websites-full-potential-the-ultimate-guide-to-deploying-your-static-site-on-s3-51470381a230. Please, make sure that you update the file `bin/setup-static-website-to-aws.ts` which contains the AWS account and region.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
