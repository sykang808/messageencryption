#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { InfraStage } from '../lib/stage/infra-stage';
import { CdkPipelineStack } from '../lib/cdk-pipeline-stack';

const app = new cdk.App();
new InfraStage(app, 'InfraStack', { 
  
});

new CdkPipelineStack(app, 'CdkPipelineStack', {
  env: {
    account: '566034038752',
    region: 'us-west-2',
  }
});