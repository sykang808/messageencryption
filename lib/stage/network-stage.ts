import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ECSClusterStack } from "../stack/ecs-cluster-stack";
import { VPCStack} from '../stack/vpc-stack';
export class NetworkStage  extends cdk.Stage  {
  public vpcstack:VPCStack;
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    this.vpcstack = new VPCStack( this, "MainVPC", props);
    cdk.Tags.of(this).add('TEAM', 'WEST');
  }
}
