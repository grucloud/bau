# Bausaurus

A Static Site Generator built with Bau.

## Note

Example of note:

> A note starts with the _>_ symbol

## Syntax highlighter

### Shell command

Example of shell command:

```sh
$ rm -rf /
```

### Source Code

Example of code:

```js
exports.createResources = () => [
  {
    type: "Topic",
    group: "SNS",
    name: "my-topic",
    properties: ({}) => ({
      Attributes: {
        DisplayName: "My Topic",
      },
      Tags: [
        {
          Key: "mykey",
          Value: "myvalue",
        },
      ],
    }),
  },
];
```

## Links

- [Article 1](./Article1.md)
- [AwsGettingStarted](./aws/AwsGettingStarted.md)
