import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecretValue } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { NetworkStage } from './stage/network-stage';
import { ClusterStage } from './stage/cluster-stage';
/**
 * The stack that defines the application pipeline
 */
export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
    // The basic pipeline declaration. This sets the initial structure
    // of our pipeline

    const pipeline = new cdk.pipelines.CodePipeline(this, 'Pipeline', {
      selfMutation: false,
      synth: new cdk.pipelines.ShellStep('Synth', {
        input: CodePipelineSource.connection('sykang808/messageencryption', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-west-2:566034038752:connection/abce9163-e524-4a2d-b6ba-dea4eed94964', // Created using the AWS console * });',
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    const network = new NetworkStage(this, 'MainNetworkStage',props )
    const cluster = new ClusterStage(this, 'MainClusterStage', { vpc:network.vpcstack.myVpc, env:props?.env} )
    pipeline.addStage( network );
    pipeline.addStage( cluster );
    }
}

  
