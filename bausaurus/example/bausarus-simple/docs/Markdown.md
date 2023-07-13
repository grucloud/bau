---
title: "Markdown"
---

The Markdown format allows to write content with a simple syntax.

## Note

Example of note:

### Input

```sh
> A note starts with the > symbol
```

### Output

> A note starts with the > symbol

## Syntax highlighter

The code syntax highligh feature is provided thanks to the [highlight.js](https://highlightjs.org/) library.

### Shell command

Example of shell command:

#### Input

````sh
```sh
$ rm -rf /
```
````

#### Output

```sh
$ rm -rf /
```

### Source Code

Example of Javascript code:

#### Input

````sh
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
    }),
  },
];
```
````

#### Output

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
    }),
  },
];
```

### Inline Source Code

#### Input

```txt
One can use `inline code` with backtick
```

#### Output

One can use `inline code` with backtick

## Table

### Input

```txt
|                                            | GruCloud | Terraform | AWS CDK |
| ------------------------------------------ | -------- | --------- | ------- |
| Generate code from existing infrastructure | Yes      | No        | No      |
| General-purpose language                   | Yes      | No        | Yes     |
| Multi-cloud                                | Yes      | Yes       | No      |
```

### Output

|                                            | GruCloud | Terraform | AWS CDK |
| ------------------------------------------ | -------- | --------- | ------- |
| Generate code from existing infrastructure | Yes      | No        | No      |
| General-purpose language                   | Yes      | No        | Yes     |
| Multi-cloud                                | Yes      | Yes       | No      |

## Links

### Input

```sh
- [Commands](./Commands.md)
```

### Output

- [Commands](./Commands.md)

## Embed HTML

Any HTML content can be inserted into the Markdown file, for instance, an _iframe_:

### Input

```html
    <iframe
      title="gc new"
      data-autoplay
      src="https://asciinema.org/a/daLrxnF4qNuuUksSugIBjmi2F/iframe?autoplay=true&amp;speed=2&amp;loop=true"
      id="asciicast-iframe-13761"
      name="asciicast-iframe-13761"
      scrolling="no"
      style="width: 100%;height: 500px">
    </iframe>
</div>
```

### Output

<div>
    <iframe
    title="gc new"
    data-autoplay
    src="https://asciinema.org/a/daLrxnF4qNuuUksSugIBjmi2F/iframe?autoplay=true&amp;speed=2&amp;loop=true"
    id="asciicast-iframe-13761"
    name="asciicast-iframe-13761"
    scrolling="no"
    style="width: 100%;height: 500px"
    ></iframe>

</div>
