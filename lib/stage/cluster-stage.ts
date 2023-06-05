import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ECSFargateSonarCubeStack } from "../stack/ecs-fargate-sonarcube-stack";
import { EKSClusterStack } from "../stack/eks-cluster-stack";
import { EnvProps } from '../props/envprops';


export class ClusterStage  extends cdk.Stage  {
  constructor(scope: Construct, id: string, props?: EnvProps) {
    super(scope, id, props);

/*  const ecscluster = new ECSClusterStack(this, "ECSClusterProd" );
    const escsonarcube = new ECSFargateSonarCubeStack(this, "ECSFargateSonarCube", {
      env: {
        account: '566034038752',
        region: 'us-west-2',
      }
    }); */
    const ekscluster = new EKSClusterStack(this, "EKSClusterProd" , props);
  
  }
}
