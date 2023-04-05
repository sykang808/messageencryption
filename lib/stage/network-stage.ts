import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ECSClusterStack } from "../stack/ecs-cluster-stack";
import { VPCStack} from '../stack/vpc-stack';
export class NetworkStage  extends cdk.Stage  {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const vpc = new VPCStack( this, "MainVPC", {
      env: {
        account: '566034038752',
        region: 'us-west-2',
      }
    });
    cdk.Tags.of(this).add('TEAM', 'WEST');
  }
}
