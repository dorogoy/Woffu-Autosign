#!/usr/bin/env node
require('../src/app')()
  .then(() => {}, (err) => console.log(err));
