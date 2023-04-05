import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";

export class VPCStack  extends cdk.Stack  {
  public myVpc:ec2.Vpc;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.myVpc = new ec2.Vpc(this, 'MyVpc', {
      // The 'natGateways' parameter now controls the number of NAT instances
      natGateways: 1,
      maxAzs: 3
    });
    cdk.Tags.of(this).add('TEAM', 'WESTSOFT');
  }
}
