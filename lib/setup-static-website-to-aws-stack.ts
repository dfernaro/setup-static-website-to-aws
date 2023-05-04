import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

export class SetupStaticWebsiteToAwsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * S3 Bucket
     */
    const assetsBucket = new s3.Bucket(this, "MyWebsiteBucket", {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    /**
     * CloudFront - Origin Access Identity
     */
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    /**
     * Grant read permissions for this bucket and it's contents to the OAI
     */
    assetsBucket.grantRead(originAccessIdentity);

    /**
     * CloudFront Distribution
     */
    const cloudFrontDistribution = new cloudfront.Distribution(
      this,
      "CloudFrontDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(assetsBucket, {
            originAccessIdentity: originAccessIdentity,
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    /**
     * Copy files from local to S3
     */
    new s3deploy.BucketDeployment(this, "PopulateS3WithFrontendFolder", {
      sources: [s3deploy.Source.asset("frontend")],
      destinationBucket: assetsBucket,
      distribution: cloudFrontDistribution,
    });
  }
}
