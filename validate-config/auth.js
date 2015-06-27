module.exports = {
  basic: {
    signature: {
      type: 'string',
      minLength: 3,
      maxLength: 64,
      required: true
    },

    timestamp: {
      type: 'string',
      minLength: 3,
      maxLength: 64,
      required: true
    },
    nonce: {
      type: 'string',
      required: true
    },
    echostr: {
      type: 'string',
      required: true
    }
  }
};
