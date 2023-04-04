import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ECSClusterStack } from "../stack/ecs-cluster-stack";
import { VPCStack} from '../stack/vpc-stack';
export class InfraStage  extends cdk.Stage  {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const vpc = new VPCStack( this, "MainVPC");
    const ecscluster = new ECSClusterStack(this, "test");
  }
}
