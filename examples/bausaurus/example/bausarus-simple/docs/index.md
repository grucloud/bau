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

## Table

|                                            | GruCloud | Terraform | AWS CDK |
| ------------------------------------------ | -------- | --------- | ------- |
| Generate code from existing infrastructure | Yes      | No        | No      |
| General-purpose language                   | Yes      | No        | Yes     |
| Statelessness                              | Yes      | No        | No      |
| Multi-cloud                                | Yes      | Yes       | No      |
| Diagram of existing infrastructure         | Yes      | No        | No      |
| Diagram of target infrastructure           | Yes      | Yes       | No      |
| Debugging                                  | Yes      | No        | Yes     |
| Easy Testing                               | Yes      | No        | Yes     |
| Direct calls to the underlying cloud API   | Yes      | Yes       | No      |

## Links

- [Article 1](./Article1.md)
- [AwsGettingStarted](./aws/AwsGettingStarted.md)

## Embed HTML

<div>
    <iframe
    data-autoplay
    src="https://asciinema.org/a/daLrxnF4qNuuUksSugIBjmi2F/iframe?autoplay=true&amp;speed=2&amp;loop=true"
    id="asciicast-iframe-13761"
    name="asciicast-iframe-13761"
    scrolling="no"
    style="width: 100%;height: 500px"
    ></iframe>

</div>
