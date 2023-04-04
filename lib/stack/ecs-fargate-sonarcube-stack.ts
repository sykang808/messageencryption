import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { VPCStack } from './vpc-stack';
import { EnvProps } from '../props/envprops';


export class ECSFargateSonarCubeStack  extends cdk.Stack  {
  public cluster:ecs.Cluster;
  constructor(scope: Construct, id: string, props?: EnvProps) {
    super(scope, id );
    this.cluster = new ecs.Cluster(this, 'Cluster', { vpc:props?.vpc });
    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster:this.cluster,
      memoryLimitMiB: 1024,
      desiredCount: 1,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      },
      taskSubnets: {
        subnets: [ec2.Subnet.fromSubnetId(this, 'subnet', 'VpcISOLATEDSubnet1Subnet80F07FA0')],
      },
      loadBalancerName: 'application-lb-name',
    });
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
