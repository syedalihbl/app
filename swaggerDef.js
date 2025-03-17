module.exports = {
  openapi: '3.0.1',
  info: {
    title: 'Misys International V2',
    version: '1.0.0',
    description: 'This catalog includes all the misys  related services ',
    contact: {
      email: 'open.apis@hbl.com'
    }
  },
  servers: [
    {
      url: 'https://apis1.hbl.com:8343'
    }
  ],
  apis: ['routes/*.js'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      400: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: '02',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'xReqId is required',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'ValidationError',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '12345678910123',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: '{"message": "xReqId is required","path":["xReqId"],"type":"any.required","context":{"key":"xReqId","label":"xReqId"}}',
                description: 'Error/Fault Object recieved/generated from target/internal system'
              }
            }
          }
        }
      },
      401: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized Error',
            description: 'As per response code'
          }
        }
      },
      403: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Invalid signature',
            description: 'As per response code'
          }
        }
      },
      406: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Fail'
          },
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: '02',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'Duplicate Reference No',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'TargetSystemValidationError',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '232311882312',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: '{"OUTPUTPARM":{"REPCODE":"0000003","REPMESSAGE":"Duplicate Reference No","UNQREFERENCE1":""}}',
                description: 'Error/Fault/Response Object recieved from target system'
              }
            }
          }
        }
      },
      500: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: '',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'Something went wrong to fullfull the results, Kindly contact with administrator.',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'APIInternalError',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '232311882312',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: "Invocation of program failed. AS400Message (ID: CEE9901 text: Application error.  MCH3601 unmonitored by WCUSTEQ at statement 0000018000, instruction X'0000'.):com.ibm.as400.access.AS400Message@39d70d4b",
                description: 'Error/Fault/Response Object recieved from target system'
              }
            }
          }
        }
      },
      501: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: '',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'Target System Service is not available',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'JSONValidation',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '1234567',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: '<html><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p> </p></body></html>',
                description: 'Error/Fault/Response Object recieved from target system'
              }
            }
          }
        }
      },
      502: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'An invalid response was received from the upstream server',
            description: 'Human readable message recieved from targeted/Internal system'
          }
        }
      },
      503: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: '',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'Middleware System throw an exception while reaching to target system',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'TargetSystemError',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '1234567',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: 'RequestError: Error: at new RequestError (/app/node_modules/request-promise-core/lib/errors.js:14:15)\n    at Request.plumbing.callback (/app/node_modules/request-promise-core/lib/plumbing.js:87:29)\n    at Request.RP$callback [as _callback] (/app/node_modules/request-promise-core/lib/plumbing.js:46:31)\n    at self.callback (/app/node_modules/request/request.js:185:22)\n    at emitOne (events.js:116:13)\n    at Request.emit (events.js:211:7)\n    at Timeout._onTimeout (/app/node_modules/request/request.js:852:16)\n    at ontimeout (timers.js:498:11)\n    at tryOnTimeout (timers.js:323:5)\n    at Timer.listOnTimeout (timers.js:290:5)"}',
                description: 'Error/Fault/Response Object recieved from target system'
              }
            }
          }
        }
      },
      504: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'The upstream server is timing out',
            description: 'Human readable message recieved from targeted/Internal system'
          }
        }
      },
      598: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: 'ESOCKETTIMEDOUT',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'Target System Error',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'ReadTimeout',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '1234567',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: 'RequestError: Error: ETIMEDOUT\n    at new RequestError (/app/node_modules/request-promise-core/lib/errors.js:14:15)\n    at Request.plumbing.callback (/app/node_modules/request-promise-core/lib/plumbing.js:87:29)\n    at Request.RP$callback [as _callback] (/app/node_modules/request-promise-core/lib/plumbing.js:46:31)\n    at self.callback (/app/node_modules/request/request.js:185:22)\n    at emitOne (events.js:116:13)\n    at Request.emit (events.js:211:7)\n    at Timeout._onTimeout (/app/node_modules/request/request.js:852:16)\n    at ontimeout (timers.js:498:11)\n    at tryOnTimeout (timers.js:323:5)\n    at Timer.listOnTimeout (timers.js:290:5)"}',
                description: 'Error/Fault/Response Object recieved from target system'
              }
            }
          }
        }
      },
      599: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: 'ECONNREFUSED',
                description: 'Alpha numeric value for any specific validation case'
              },
              message: {
                type: 'string',
                example: 'Connection timeout',
                description: 'Human readable message recieved from targeted/Internal system'
              },
              type: {
                type: 'string',
                example: 'ConnectTimeout',
                description: 'Identification for error type'
              },
              reqId: {
                type: 'string',
                example: '1234567',
                description: 'Request Id that was used in making an API call'
              },
              developer_message: {
                type: 'string',
                example: 'RequestError: Error: connect ECONNREFUSED at new RequestError (/app/node_modules/request-promise-core/lib/errors.js:14:15)\n    at Request.plumbing.callback (/app/node_modules/request-promise-core/lib/plumbing.js:87:29)\n    at Request.RP$callback [as _callback] (/app/node_modules/request-promise-core/lib/plumbing.js:46:31)\n    at self.callback (/app/node_modules/request/request.js:185:22)\n    at emitOne (events.js:116:13)\n    at Request.emit (events.js:211:7)\n    at Request.onRequestError (/app/node_modules/request/request.js:881:8)\n    at emitOne (events.js:121:20)\n    at ClientRequest.emit (events.js:211:7)\n    at Socket.socketErrorListener (_http_client.js:387:9)\n    at emitOne (events.js:116:13)\n    at Socket.emit (events.js:211:7)\n    at emitErrorNT (internal/streams/destroy.js:66:8)\n    at _combinedTickCallback (internal/process/next_tick.js:139:11)\n    at process._tickCallback (internal/process/next_tick.js:181:9)"}',
                description: 'Error/Fault/Response Object recieved from target system'
              }
            }
          }
        }
      }
    }
  },
  tags: []
}
