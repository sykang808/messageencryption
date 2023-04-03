import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecretValue } from 'aws-cdk-lib';
import * as pipelines from "aws-cdk-lib/pipelines";

import {InfraStage} from './stage/infra-stage';
/**
 * The stack that defines the application pipeline
 */
export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
      // The basic pipeline declaration. This sets the initial structure
      // of our pipeline
    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      selfMutation: false,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub('sykang808/messageencryption', 'main', {
          // This is optional
          authentication: SecretValue.secretsManager('github/sykang'),
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });
    pipeline.addStage(new InfraStage(this, 'Prod', props));
  }
}

  
