import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as cdk from 'aws-cdk-lib';

export interface EnvProps extends cdk.StackProps{
  vpc: ec2.Vpc
}