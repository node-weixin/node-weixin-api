module.exports = {
  creation: {
    appid: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    mch_id: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    device_info: {
      type: 'string',
      maxLength: 32,
    },

    nonce_str: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    sign: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    body: {
      type: 'string',
      maxLength: 127,
      required: true
    },
    attach: {
      type: 'string',
      maxLength: 127,
    },
    out_trade_no: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    total_fee: {
      type: 'int',
      required: true
    },
    spbill_create_ip: {
      type: 'string',
      maxLength: 16,
      required: true
    },
    time_start: {
      type: 'string',
      maxLength: 14,
      required: true
    },
    time_expire: {
      type: 'string',
      maxLength: 14,
      required: true
    },
    goods_tag: {
      type: 'string',
      maxLength: 32
    },
    notify_url: {
      type: 'string',
      maxLength: 256,
      required: true
    },
    trade_type: {
      type: 'string',
      maxLength: 16,
      required: true
    },
    openid: {
      type: 'string',
      maxLength: 128,
    },
    product_id: {
      type: 'string',
      maxLength: 128,
    }
  },
  auth: {
    appid: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    mch_id: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    device_info: {
      type: 'string',
      maxLength: 32,
    },

    nonce_str: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    sign: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    result_code : {
      type: 'string',
      maxLength: 16,
      required: true
    },
    err_code: {
      type: 'string',
      maxLength: 32,
    },
    err_code_des: {
      type: 'string',
      maxLength: 128,
    }
  },
  success: {
    trade_type: {
      type: 'string',
      maxLength: 16,
      required: true
    },
    prepay_id: {
      type: 'string',
      maxLength: 64,
      required: true
    },
    code_url : {
      type: 'string',
      maxLength: 64
    }
  }
};
