# Bausaurus

A Static Site Generator built with Bau.

Example of note:

> A note starts with the _>_ symbol

Example of shell command:

```sh
$ rm -rf /
```

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
