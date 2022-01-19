# brazilian-doc-validator
Validator for common brazilian patterns, such as cpf and cnpj validations. 
Generator and mask/unmask CPF or CNPJ document numbers.
It is a npm package to be used in javascript applications.

# Table of contents

<!--ts-->
* [Installing](#installing)
* [Usage](#usage)
    * [CPF](#cpf)
    * [CNPJ](#cnpj)
* [Contributing](#contributing)
* [Testing](#testing)
<!--te-->

# Installing

Using npm:

```bash
npm i brazilian-doc-validator
```

Using yarn:

```bash
yarn add brazilian-doc-validator
```

# Usage

## CPF

```js
import {cpf} from 'brazilian-doc-validator';
```

or

```js
const {cpf} = require('brazilian-doc-validator');
```

### Validation

```js
cpf.validate(111.111.111-11);
```

> **Result:** false

### Mask Formated

```js
const validCpf = "###########";
cpf.mask(validCpf)
```

> **Result:**  ###.###.###-##

### Unmask CPF (only numbers)

```js
const validCpf = "###.###.###-##";
cpf.unmask(validCpf)
```

> **Result:**  ###########

### Generate Valid CPF

```js
const newCpfMasked = cpf.generate({mask: true});
```

> **Result:**  ###.###.###-##

```js
const newCpfOnlyNumbers = cpf.generate({mask: false});
```

> **Result:**  ###########

## CNPJ

```js
import {cnpj} from 'brazilian-doc-validator';
```

or

```js
const {cnpj} = require('brazilian-doc-validator');
```

### Validation

```js
cnpj.validate(11.111.111/1111-11);
```

> **Result:** false

### Mask Formated

```js
const validCnpj = "##############";
cnpj.mask(validCnpj)
```

> **Result:**  ##.###.###/####-##

### Unmask CNPJ (only numbers)

```js
const validCnpj = "##.###.###/####-##";
cnpj.unmask(validCnpj)
```

> **Result:**  ##############

### Generate Valid CNPJ

```js
const newMaskedCnpj = cnpj.generate({mask: true});
```

> **Result:**  ##.###.###/####-##

```js
const newCnpj = cnpj.generate({mask: false};
```

> **Result:**  ##############

# Contributing

To do

# Testing

```bash
npm run test
```