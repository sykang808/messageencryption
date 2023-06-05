import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { EnvProps } from '../props/envprops';
import { Construct } from 'constructs';


export class EKSClusterStack  extends cdk.Stack  {
  constructor(scope: Construct, id: string, props: EnvProps) {
    super(scope, id );

    const clusterProvider = new blueprints.GenericClusterProvider({
      version: eks.KubernetesVersion.V1_21,
      managedNodeGroups: [{
          id: "cpu",
          minSize: 2,
          maxSize: 10,
          nodeGroupCapacityType: eks.CapacityType.SPOT,
      }]
  });

    const addOns: Array<blueprints.ClusterAddOn> = [
        new blueprints.addons.ArgoCDAddOn(),
        new blueprints.addons.CalicoOperatorAddOn(),
        new blueprints.addons.MetricsServerAddOn(),
        new blueprints.addons.ClusterAutoScalerAddOn(),
        new blueprints.addons.AwsLoadBalancerControllerAddOn(),
        new blueprints.addons.VpcCniAddOn(),
        new blueprints.addons.CoreDnsAddOn(),
        new blueprints.addons.KubeProxyAddOn()
    ];


    const stack = blueprints.EksBlueprint.builder()
        .account(props?.env?.account)
        .resourceProvider(blueprints.GlobalResources.Vpc, new blueprints.VpcProvider(props.vpc.vpcId))
        .region(props?.env?.region)
        .addOns(...addOns)
        .clusterProvider(clusterProvider)
        .useDefaultSecretEncryption(true) // set to false to turn secret encryption off (non-production/demo cases)
        .build(this, 'eks-blueprint');
  }
}