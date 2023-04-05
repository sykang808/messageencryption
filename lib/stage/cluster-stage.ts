import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ECSClusterStack } from "../stack/ecs-cluster-stack";
import { ECSFargateSonarCubeStack } from "../stack/ecs-fargate-sonarcube-stack";

export class ClusterStage  extends cdk.Stage  {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

//    const ecscluster = new ECSClusterStack(this, "ECSClusterProd" );
    const escsonarcube = new ECSFargateSonarCubeStack(this, "ECSFargateSonarCube", {
      env: {
        account: '566034038752',
        region: 'us-west-2',
      }
    });
  }
}
