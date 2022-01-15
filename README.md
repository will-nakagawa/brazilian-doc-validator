# brazilian-validator
Validator for common brazilian patterns, such as cpf and cnpj validations. It is a npm package to be used in javascript applications

# Installling

Using npm:

```bash
npm install brazilian-validator
```

Using yarn:

```bash
yarn add brazilian-validator
```

# Usage

## CPF

```js
import {cpf} from 'brazilian-validator';
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
const newCpfMasked = cpf.generate(true);
```

> **Result:**  ###.###.###-##

```js
const newCpfOnlyNumbers = cpf.generate(false);
```

> **Result:**  ###########

## CPF

In progress

# Contributing

To do

# Testing

```bash
npm run test
```