import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { EnvProps } from '../props/envprops';


export class ECSFargateSonarCubeStack  extends cdk.Stack  {
  public cluster:ecs.Cluster;
  constructor(scope: Construct, id: string, props?:cdk.StackProps) {
    super(scope, id );
    const myVpc = ec2.Vpc.fromLookup(this,"MyVPC", { 
      tags:{
        TEAM: "WESTSOFT"
      }
    });
    
    const cluster = new ecs.Cluster(this, 'Cluster', {vpc:myVpc});
    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster,
      memoryLimitMiB: 1024,
      desiredCount: 1,
      cpu: 512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry("sykang/sonarcube"),
      },
      taskSubnets: {
        subnets: myVpc.privateSubnets,
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
