#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SetupStaticWebsiteToAwsStack } from "../lib/setup-static-website-to-aws-stack";

const app = new cdk.App();
new SetupStaticWebsiteToAwsStack(app, "SetupStaticWebsiteToAwsStack", {
  env: { account: "REPLACE_BY_YOUR_ACCOUNT_ID", region: "REPLACE_BY_YOUR_REGION" },
});
