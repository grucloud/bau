---
id: AwsGettingStarted
title: Aws Getting Started From Example
---

This tutorial explains the deployment automation of a simple [AWS EC2 instance](https://aws.amazon.com/ec2/) with the [GruCloud AWS provider](https://www.npmjs.com/package/@grucloud/provider-aws).

Instead of manually creating, updating, and destroying EC2 instances, the infrastructure will be described as Javascript code. The GruCloud CLI then reads this code, retrieves the lives resources through the AWS API, and decides what needs to be created, updated, or destroyed.

![graph-diagram-ec2.svg](https://raw.githubusercontent.com/grucloud/grucloud/main/examples/aws/EC2/Instance/ec2-simple/artifacts/diagram-target.svg)

## Requirements

The following chart explains the AWS requirements:

- AWS Account
- AWS CLI
- Access and Secret Key
- Configure the AWS CLI

![AWS Requirements](https://raw.githubusercontent.com/grucloud/grucloud/main/docusaurus/plantuml/aws-requirements.svg)

### AWS Account

Ensure access to the [Amazon Console](https://console.aws.amazon.com) and create an account if necessary.

### AWS CLI

Ensure the _AWS CLI_ is installed and configured:

```sh
aws --version
```

If not, visit https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

### Access and Secret Key

Visit the [security credentials](https://console.aws.amazon.com/iam/home#/security_credentials)

- Click on **Access key (access key ID and secret access key).**
- Click on the button **Create New Access Key**.

Write down the **AWSAccessKeyId** and **AWSSecretKey**

> In a further episode, the access and secret key will be obtained from a dedicated IAM user with the correct role and policy.

### Configure AWS CLI

Configure the account with the previously obtained **AWSAccessKeyId** and **AWSSecretKey**, as well as the region, for instance `us-east-1`

```
aws configure
```

### Getting the GruCloud CLI

This chart describes the way to install **gc**, the GruCloud CLI:

![gc-cli-install](https://raw.githubusercontent.com/grucloud/grucloud/main/docusaurus/plantuml/grucloud-cli-install.svg)

GruCloud is written in Javascript running on [Node.js](https://nodejs.org/). Check if `node` is present on your system

```
node --version
```

> The version must be greater than 14

Install the _GrucCloud_ command-line utility **gc** with _npm_

```sh
npm i -g @grucloud/core
```

Check the current version of **gc**:

```sh
gc --version
```

## Code Architecture

In this section, we'll create the files needed to describe an infrastructure with GruCloud:

![grucloud-files](https://raw.githubusercontent.com/grucloud/grucloud/main/docusaurus/plantuml/grucloud-project-files.svg)

- [resources.js](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/resources.js): creates the resources given a provider.

- [iac.js](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/iac.js): exports _createStack_ with provider and resources associated

- [config.js](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/config.js): the config function.

- [package.json](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/package.json): specifies the npm dependencies and other information.

- [hooks.js](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/hook.js): optionally provides hook functions called after deployment or destruction.

> The [source code](https://github.com/grucloud/grucloud/tree/main/examples/aws/ec2/ec2-simple) for this example in on GitHub.

### Create a new project

Create a new directory, for instance `ec2-example`:

```sh
mkdir ec2-example
cd ec2-example
```

### package json

Let's create a new `package.json` with the `npm init` command:

```sh
npm init
```

Let's install the GruCloud AWS provider called [@grucloud/provider-aws](https://www.npmjs.com/package/@grucloud/provider-aws), as well as the GruCloud core library `@grucloud/core`.

```sh
npm install @grucloud/core @grucloud/provider-aws
```

### config.js

The configuration is a Javascript function located in [config.js](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/config.js)

```js
// config.js
const pkg = require("./package.json");
module.exports = ({ stage }) => ({
  projectName: pkg.name,
});
```

### resources.js

This file exports the _createResources_ functions

```js
exports.createResources = () => [
  {
    type: "Instance",
    group: "EC2",
    name: "web-server-ec2-example",
    properties: ({ config }) => ({
      InstanceType: "t2.micro",
      ImageId: "ami-02e136e904f3da870",
      Placement: {
        AvailabilityZone: `${config.region}a`,
      },
    }),
  },
];
```

### iac.js

Create a file called `iac.js` which stands for _infrastructure as code_.
We'll first import _AwsProvider_ from [@grucloud/provider-aws](https://www.npmjs.com/package/@grucloud/provider-aws)

[iac.js](https://github.com/grucloud/grucloud/blob/main/examples/aws/EC2/Instance/ec2-simple/iac.js) must export the `createStack` function which returns the provider and the resources.

Then, instantiate _AwsProvider_ by providing the _config_ function.

```js
// iac.js
const { AwsProvider } = require("@grucloud/provider-aws");

const { createResources } = require("./resources");

exports.createStack = ({ createProvider }) => ({
  provider: createProvider(AwsProvider, {
    createResources,
    config: require("./config"),
  }),
  hooks: [require("./hook")],
});
```

## GruCloud Workflow

This chart depicts the workflow with the main **gc** commands:

- gc info
- gc graph
- gc apply
- gc list
- gc destroy

![grucloud commands](https://raw.githubusercontent.com/grucloud/grucloud/main/docusaurus/plantuml/grucloud-cli-commands.svg)

### Info

As a way to verify that **gc** can connect to the AWS API, one can use the `info` command:

```sh
gc info
```

```txt
  - provider:
      name: aws
      type: aws
    accountId: 840541460064
    zone: eu-west-2a
    config:
      projectName: ec2-simple
      ec2Instance:
        name: web-server
        properties:
          InstanceType: t2.micro
          ImageId: ami-00f6a0c18edb19300
      stage: dev
      region: eu-west-2

Command "gc info" executed in 1s
```

### Deploy

We are ready to deploy with `apply` command:

```bash
gc apply
```

```
Querying resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Listing 6/6
  ✓ Querying
    ✓ EC2 1/1
┌──────────────────────────────────────────────────────────────────────────┐
│ 1 EC2 from aws                                                           │
├────────────┬──────────┬──────────────────────────────────────────────────┤
│ Name       │ Action   │ Data                                             │
├────────────┼──────────┼──────────────────────────────────────────────────┤
│ web-server │ CREATE   │ InstanceType: t2.micro                           │
│            │          │ ImageId: ami-00f6a0c18edb19300                   │
│            │          │ MaxCount: 1                                      │
│            │          │ MinCount: 1                                      │
│            │          │ TagSpecifications:                               │
│            │          │   - ResourceType: instance                       │
│            │          │     Tags:                                        │
│            │          │       - Key: Name                                │
│            │          │         Value: web-server                        │
│            │          │       - Key: ManagedBy                           │
│            │          │         Value: GruCloud                          │
│            │          │       - Key: CreatedByProvider                   │
│            │          │         Value: aws                               │
│            │          │       - Key: stage                               │
│            │          │         Value: dev                               │
│            │          │       - Key: projectName                         │
│            │          │         Value: ec2-simple                        │
│            │          │                                                  │
└────────────┴──────────┴──────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│ Plan summary for provider aws                                           │
├─────────────────────────────────────────────────────────────────────────┤
│ DEPLOY RESOURCES                                                        │
├────────────────────┬────────────────────────────────────────────────────┤
│ EC2                │ web-server                                         │
└────────────────────┴────────────────────────────────────────────────────┘
? Are you sure to deploy 1 resource, 1 type on 1 provider? › (y/N)
```

At this point, you are allowed to look at what is going to be deployed.
Type `y` to accept:

```
Deploying resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Deploying
    ✓ EC2 1/1
1 resource deployed of 1 type and 1 provider
Running OnDeployedGlobal resources on 1 provider: aws
Command "gc a" executed in 1m 29s
```

When `gc apply` is executed a second time, resources should not be created or destroyed.

```sh
gc a
```

```txt
Querying resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Listing 13/13
  ✓ Querying
    ✓ EC2 1/1
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Plan summary for provider aws                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
Nothing to deploy
Running OnDeployedGlobal resources on 1 provider: aws
Command "gc a" executed in 9s
```

As expected, nothing to deploy, the target resources defined in the code match the live resources.

### List

To list all the resources, and generate a diagram:

```
gc list --graph --all
```

This will include the default AWS resources such as VPC, subnet, internet gateway, and security group.

![graph-live](https://raw.githubusercontent.com/grucloud/grucloud/main/examples/aws/EC2/Instance/ec2-simple/artifacts/diagram-live.svg)

To list only the resources created by GruCloud:

```
gc list --our
```

```txt
Listing resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Listing 13/13
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 1 EC2 from aws                                                                                          │
├────────────┬─────────────────────────────────────────────────────────────────────────────────────┬──────┤
│ Name       │ Data                                                                                │ Our  │
├────────────┼─────────────────────────────────────────────────────────────────────────────────────┼──────┤
│ web-server │ AmiLaunchIndex: 0                                                                   │ Yes  │
│            │ ImageId: ami-00f6a0c18edb19300                                                      │      │
│            │ InstanceId: i-016628a1b6a6a2f91                                                     │      │
│            │ InstanceType: t3.micro                                                              │      │
│            │ LaunchTime: 2021-04-29T23:10:44.000Z                                                │      │
│            │ Monitoring:                                                                         │      │
│            │   State: disabled                                                                   │      │
│            │ Placement:                                                                          │      │
│            │   AvailabilityZone: eu-west-2a                                                      │      │
│            │   GroupName:                                                                        │      │
│            │   Tenancy: default                                                                  │      │
│            │ PrivateDnsName: ip-172-31-2-146.eu-west-2.compute.internal                          │      │
│            │ PrivateIpAddress: 172.31.2.146                                                      │      │
│            │ ProductCodes: []                                                                    │      │
│            │ PublicDnsName: ec2-18-132-98-216.eu-west-2.compute.amazonaws.com                    │      │
│            │ PublicIpAddress: 18.132.98.216                                                      │      │
│            │ State:                                                                              │      │
│            │   Code: 16                                                                          │      │
│            │   Name: running                                                                     │      │
│            │ StateTransitionReason:                                                              │      │
│            │ SubnetId: subnet-0f6f085fc384bf8ce                                                  │      │
│            │ VpcId: vpc-bbbafcd3                                                                 │      │
│            │ Architecture: x86_64                                                                │      │
│            │ BlockDeviceMappings:                                                                │      │
│            │   - DeviceName: /dev/sda1                                                           │      │
│            │     Ebs:                                                                            │      │
│            │       AttachTime: 2021-04-29T23:10:45.000Z                                          │      │
│            │       DeleteOnTermination: true                                                     │      │
│            │       Status: attached                                                              │      │
│            │       VolumeId: vol-0a88a34248fe18740                                               │      │
│            │ ClientToken: 7ef5fd60-e962-400f-a2b9-37719d8329ed                                   │      │
│            │ EbsOptimized: false                                                                 │      │
│            │ EnaSupport: true                                                                    │      │
│            │ Hypervisor: xen                                                                     │      │
│            │ ElasticGpuAssociations: []                                                          │      │
│            │ ElasticInferenceAcceleratorAssociations: []                                         │      │
│            │ NetworkInterfaces:                                                                  │      │
│            │   - Association:                                                                    │      │
│            │       IpOwnerId: amazon                                                             │      │
│            │       PublicDnsName: ec2-18-132-98-216.eu-west-2.compute.amazonaws.com              │      │
│            │       PublicIp: 18.132.98.216                                                       │      │
│            │     Attachment:                                                                     │      │
│            │       AttachTime: 2021-04-29T23:10:44.000Z                                          │      │
│            │       AttachmentId: eni-attach-02744addcff43ecbb                                    │      │
│            │       DeleteOnTermination: true                                                     │      │
│            │       DeviceIndex: 0                                                                │      │
│            │       Status: attached                                                              │      │
│            │       NetworkCardIndex: 0                                                           │      │
│            │     Description:                                                                    │      │
│            │     Groups:                                                                         │      │
│            │       - GroupName: default                                                          │      │
│            │         GroupId: sg-f4139a96                                                        │      │
│            │     Ipv6Addresses: []                                                               │      │
│            │     MacAddress: 06:ee:ef:d7:1c:48                                                   │      │
│            │     NetworkInterfaceId: eni-06e9d87ff776cf40f                                       │      │
│            │     OwnerId: 840541460064                                                           │      │
│            │     PrivateDnsName: ip-172-31-2-146.eu-west-2.compute.internal                      │      │
│            │     PrivateIpAddress: 172.31.2.146                                                  │      │
│            │     PrivateIpAddresses:                                                             │      │
│            │       - Association:                                                                │      │
│            │           IpOwnerId: amazon                                                         │      │
│            │           PublicDnsName: ec2-18-132-98-216.eu-west-2.compute.amazonaws.com          │      │
│            │           PublicIp: 18.132.98.216                                                   │      │
│            │         Primary: true                                                               │      │
│            │         PrivateDnsName: ip-172-31-2-146.eu-west-2.compute.internal                  │      │
│            │         PrivateIpAddress: 172.31.2.146                                              │      │
│            │     SourceDestCheck: true                                                           │      │
│            │     Status: in-use                                                                  │      │
│            │     SubnetId: subnet-0f6f085fc384bf8ce                                              │      │
│            │     VpcId: vpc-bbbafcd3                                                             │      │
│            │     InterfaceType: interface                                                        │      │
│            │ RootDeviceName: /dev/sda1                                                           │      │
│            │ RootDeviceType: ebs                                                                 │      │
│            │ SecurityGroups:                                                                     │      │
│            │   - GroupName: default                                                              │      │
│            │     GroupId: sg-f4139a96                                                            │      │
│            │ SourceDestCheck: true                                                               │      │
│            │ Tags:                                                                               │      │
│            │   - Key: Name                                                                       │      │
│            │     Value: web-server                                                               │      │
│            │   - Key: stage                                                                      │      │
│            │     Value: dev                                                                      │      │
│            │   - Key: CreatedByProvider                                                          │      │
│            │     Value: aws                                                                      │      │
│            │   - Key: ManagedBy                                                                  │      │
│            │     Value: GruCloud                                                                 │      │
│            │   - Key: projectName                                                                │      │
│            │     Value: ec2-simple                                                               │      │
│            │ VirtualizationType: hvm                                                             │      │
│            │ CpuOptions:                                                                         │      │
│            │   CoreCount: 1                                                                      │      │
│            │   ThreadsPerCore: 2                                                                 │      │
│            │ CapacityReservationSpecification:                                                   │      │
│            │   CapacityReservationPreference: open                                               │      │
│            │ HibernationOptions:                                                                 │      │
│            │   Configured: false                                                                 │      │
│            │ Licenses: []                                                                        │      │
│            │ MetadataOptions:                                                                    │      │
│            │   State: applied                                                                    │      │
│            │   HttpTokens: optional                                                              │      │
│            │   HttpPutResponseHopLimit: 1                                                        │      │
│            │   HttpEndpoint: enabled                                                             │      │
│            │ EnclaveOptions:                                                                     │      │
│            │   Enabled: false                                                                    │      │
│            │                                                                                     │      │
└────────────┴─────────────────────────────────────────────────────────────────────────────────────┴──────┘


List Summary:
Provider: aws
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ aws                                                                                                    │
├────────────────────┬───────────────────────────────────────────────────────────────────────────────────┤
│ EC2                │ web-server                                                                        │
└────────────────────┴───────────────────────────────────────────────────────────────────────────────────┘
1 resource, 7 types, 1 provider
Command "gc l -o" executed in 7s
```

> Note that tags have been added to the EC2 Instance, it gives GruCloud a way to identify the resources under its control. Unlike other infrastructure as code tools such as Terraform and Pulumi, GruCloud does not need a _state_ file. Hence removing a lot of complexity and issues.

### Update

The ec2 instance configuration might change, for instance, let's modify the machine type to `t3.micro` located in _config.js_

The `plan` command is a read-only command which fetches the live resources and compares them with the target resources defined in the code.

```sh
gc plan
```

```txt
Querying resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Listing 13/13
  ✓ Querying
    ✓ EC2 1/1
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ 1 EC2 from aws                                                                           │
├────────────┬──────────┬──────────────────────────────────────────────────────────────────┤
│ Name       │ Action   │ Data                                                             │
├────────────┼──────────┼──────────────────────────────────────────────────────────────────┤
│ web-server │ UPDATE   │ added:                                                           │
│            │          │ updated:                                                         │
│            │          │   InstanceType: t3.micro                                         │
│            │          │                                                                  │
└────────────┴──────────┴──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Plan summary for provider aws                                                           │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ DEPLOY RESOURCES                                                                        │
├────────────────────┬────────────────────────────────────────────────────────────────────┤
│ EC2                │ web-server                                                         │
└────────────────────┴────────────────────────────────────────────────────────────────────┘
1 resource to deploy on 1 provider
Command "gc plan" executed in 5s
```

Let's apply the change:

```sh
gc apply
```

> Bear in mind that the machine requires to be stopped and restarted.

Trust but verify, hence, list the EC2 instances and check the `InstanceType` has been changed.

```sh
gc l -t Instance
```

### Output

Another useful command is _gc output_, which extract information for a specific field of a given resource

```
gc output -t Instance --name web-server -f InstanceType
```

```txt
t3.micro
```

Nested field can be accessed too, for example, let's retrieve the public IP address attached to the EC2 instance:

```sh
gc output -t Instance --name web-server -f 'NetworkInterfaces[0].Association.PublicIp'
```

```txt
18.130.34.212
```

The temptation to ping is high:

```sh
ping `gc output -t Instance --name web-server -f 'NetworkInterfaces[0].Association.PublicIp'`
```

```txt
PING 18.130.34.212 (18.130.34.212): 56 data bytes
64 bytes from 18.130.34.212: icmp_seq=0 ttl=38 time=153.799 ms
64 bytes from 18.130.34.212: icmp_seq=1 ttl=38 time=153.583 ms
64 bytes from 18.130.34.212: icmp_seq=2 ttl=38 time=140.622 ms
```

### Destroy

Time to destroy the resources allocated and therefore save a lot of £$€.

```bash
gc destroy
```

```
Find Deletable resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Listing 6/6
? Are you sure to destroy 1 resource, 1 type on 1 provider? › (y/N)

```

Once again, you are allowed to look at what is going to be destroyed.
Type 'y' to confirm the destruction:

```
Destroying resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Destroying
    ✓ EC2 1/1
1 resource destroyed, 1 type on 1 provider
Running OnDestroyedGlobal resources on 1 provider: aws
Command "gc destroy" executed in 1m 29s
```

Let's run the `gc list` command with the `Instance` filter to verify the I
ec2 instance is gone:

```
gc l -t Instance
```

```
Listing resources on 1 provider: aws
✓ aws
  ✓ Initialising
  ✓ Listing 6/6
List Summary:
Provider: aws
┌─────────────────────────────────────────────────────────────────────────┐
│ aws                                                                     │
└─────────────────────────────────────────────────────────────────────────┘
0 resources, 0 types, 1 provider
Command "gc list -t Instance" executed in 3s
```

This example demonstrates how to code a very basic infrastructure with one EC2 instance, and how can we use the `gc apply`, `gc list`, `gc destroy`, and `gc graph` to manage the infrastructure.

It paves the way for more [AWS examples](https://www.grucloud.com/docs/aws/AwsExamples)

### Graph

A picture is worth a thousand words, GruCloud generates an SVG file describing the resources and their relationship.

```
gc graph
```

Here is the graph of a typical web application managed by Kubernetes running on AWS where the master node is managed by EKS.

![kubernetes eks](https://raw.githubusercontent.com/grucloud/grucloud/main/examples/starhackit/eks-lean/artifacts/diagram-target.svg)
