module.exports = {
  auth: {
    header: {
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
    },
    middle: {
      result_code: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      result_msg: {
        type: 'string',
        maxLength: 128
      }
    },
    final: {
      result_code: {
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
    }
  },
  unified: {
    sending: {
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
    receiving: {
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
      code_url: {
        type: 'string',
        maxLength: 64
      }
    }
  },
  notify: {
    //Successfully
    openid: {
      type: 'string',
      maxLength: 128,
      required: true
    },
    is_subscribe: {
      type: 'string',
      maxLength: 1,
      required: true
    },
    trade_type: {
      type: 'string',
      maxLength: 16,
      required: true
    },

    bank_type: {
      type: 'string',
      maxLength: 16,
      required: true
    },
    total_fee: {
      type: 'int',
      required: true
    },
    coupon_fee: {
      type: 'int'
    },
    fee_type: {
      type: 'string',
      maxLength: 8
    },
    transaction_id: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    out_trade_no: {
      type: 'string',
      maxLength: 32,
      required: true
    },
    attach: {
      type: 'string',
      maxLength: 128
    },
    time_end: {
      type: 'string',
      maxLength: 14,
      required: true
    }
  },
  order: {
    query: {
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
      transaction_id: {
        type: 'string',
        maxLength: 32,
      },
      out_trade_no: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      nonce_str: {
        type: 'string',
        maxLength: 32,
        required: true
      }
    },
    trade: {
      trade_state: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      device_info: {
        type: 'string',
        maxLength: 32,
      },
      openid: {
        type: 'string',
        maxLength: 128,
        required: true
      },
      is_subscribe: {
        type: 'string',
        maxLength: 1,
        required: true
      },
      trade_type: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      bank_type: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      total_fee: {
        type: 'int',
        required: true
      },
      coupon_fee: {
        type: 'int',
      },
      fee_type: {
        type: 'string',
        maxLength: 8,
      },
      transaction_id: {
        type: 'string',
        maxLength: 32,
      },
      out_trade_no: {
        type: 'string',
        maxLength: 32,
      },
      attach: {
        type: 'string',
        maxLength: 128,
      },
      time_end: {
        type: 'string',
        maxLength: 128,
      }
    }
  },
  refund: {
    create: {
      sending: {
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
          maxLength: 32
        },
        nonce_str: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        transaction_id: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        out_trade_no: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        out_refund_no: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        total_fee: {
          type: 'int',
          required: true
        },
        refund_fee: {
          type: 'int',
          required: true
        },
        op_user_id: {
          type: 'string',
          maxLength: 32,
          required: true
        }
      },
      receiving: {
        refund_id: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        transaction_id: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        out_trade_no: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        out_refund_no: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        refund_channel: {
          type: 'string',
          maxLength: 16
        },
        refund_fee: {
          type: 'int',
          required: true
        },
        coupon_refund_fee: {
          type: 'int'
        }
      }
    },
    query: {
      sending: {
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
          maxLength: 32
        },
        nonce_str: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        transaction_id: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        out_trade_no: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        out_refund_no: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        refund_id: {
          type: 'string',
          maxLength: 28,
          required: true
        }
      },
      receiving: {
        transaction_id: {
          type: 'string',
          maxLength: 28,
          required: true
        },
        out_refund_no: {
          type: 'string',
          maxLength: 32,
          required: true
        },
        refund_count: {
          type: 'int'
        }
      }
    }
  },
  statements: {
    sending: {
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
        maxLength: 32
      },
      nonce_str: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      bill_date: {
        type: 'string',
        maxLength: 8,
        required: true
      },
      bill_type: {
        type: 'string',
        maxLength: 8
      }
    }
  },
  report: {
    sending: {
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
        maxLength: 32
      },
      nonce_str: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      interface_url: {
        type: 'string',
        maxLength: 127,
        required: true
      },
      execute_time_: {
        type: 'string',
        maxLength: 8
      },
      return_code: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      return_msg: {
        type: 'string',
        maxLength: 128
      },
      result_code: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      err_code: {
        type: 'string',
        maxLength: 32
      },
      err_code_des: {
        type: 'string',
        maxLength: 32,
        required: true
      },
      out_trade_no: {
        type: 'string',
        maxLength: 32
      },
      user_ip: {
        type: 'string',
        maxLength: 16,
        required: true
      },
      time: {
        type: 'string',
        maxLength: 14
      }
    }
  }
};
