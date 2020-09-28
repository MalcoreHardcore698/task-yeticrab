require('dotenv').config()
const apiHost = process.env.API_HOST

module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Offering Manager API',
      version: '1.0.0',
      contact: {
        name: 'Malcore',
        email: 'dan8271@yandex.ru'
      }
    },
    servers: [
      {
        url: apiHost,
        description: 'Local server'
      },
    ],
    tags: [
        {
            name: 'Endpoints'
        }
    ],
    paths: {
        '/api': {
            get: {
                tags: ['Endpoints'],
                description: 'Get Posts',
                operationId: 'getPosts',
                parameters: [],
                responses: {
                    '200': {
                        description: 'Posts were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Posts'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal Server Error'
                    }
                }
            },
            post: {
                tags: ['Endpoints'],
                description: 'Add Post',
                operationId: 'addPost',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Posts'
                            }
                        }
                    },
                        required: true
                    },
                    responses: {
                    '200': {
                        description: 'New post were created'
                    },
                    '500': {
                        description: 'Internal Server Error'
                    }
                }
            },
            put: {
                tags: ['Endpoints'],
                description: 'Edit Post',
                operationId: 'editPost',
                parameters: [
                    {
                        name: 'id',
                        in: 'query',
                        schema: {
                            $ref: '#/components/schemas/_id'
                        },
                        required: true
                    },
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Posts'
                            }
                        }
                    },
                        required: true
                    },
                    responses: {
                    '200': {
                        description: 'New post were created'
                    },
                    '400': {
                        description: 'Invalid parameters',
                            content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Wrong something',
                                    internal_code: 'invalid_parameters'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal Server Error'
                    }
                }
            },
            delete: {
                tags: ['Endpoints'],
                description: 'Delete Posts',
                operationId: 'deletePosts',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Ids'
                            }
                        }
                    },
                        required: true
                    },
                    responses: {
                    '200': {
                        description: 'New post were created'
                    },
                    '400': {
                        description: 'Invalid parameters',
                            content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'Wrong something',
                                    internal_code: 'invalid_parameters'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal Server Error'
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            _id: {
                type: 'string',
                description: 'ID',
                example: '5f71bbad39eb081310a0acb2'
            },
            trackId: {
                type: 'string',
                description: 'Track ID',
                example: 645889
            },
            companyName: {
                type: 'string',
                description: 'Company Name',
                example: 'Apple'
            },
            carrierName: {
                type: 'string',
                description: 'Carrier Name',
                example: 'John Snow'
            },
            carrierPhone: {
                type: 'string',
                description: 'Carrier Phone',
                example: '81234564567'
            },
            comments: {
                type: 'string',
                description: 'Comments',
                example: 'Some text'
            },
            code: {
                type: 'string',
                description: 'Code',
                example: 235478
            },
            updatedAt: {
                type: 'string',
                description: 'Updated Date',
                example: '2020-09-28T10:32:30.685Z'
            },
            createdAt: {
                type: 'string',
                description: 'Created Date',
                example: '2020-09-28T10:32:30.685Z'
            },
            Post: {
                type: 'object',
                properties: {
                    _id: {
                        $ref: '#/components/schemas/_id'
                    },
                    trackId: {
                        $ref: '#/components/schemas/trackId'
                    },
                    companyName: {
                        $ref: '#/components/schemas/companyName'
                    },
                    carrierName: {
                        $ref: '#/components/schemas/carrierName'
                    },
                    carrierPhone: {
                        $ref: '#/components/schemas/carrierPhone'
                    },
                    comments: {
                        $ref: '#/components/schemas/comments'
                    },
                    code: {
                        $ref: '#/components/schemas/code'
                    },
                    updatedAt: {
                        $ref: '#/components/schemas/updatedAt'
                    },
                    createdAt: {
                        $ref: '#/components/schemas/createdAt'
                    }
                }
            },
            Posts: {
                type: 'object',
                properties: {
                    posts: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Post'
                        }
                    }
                }
            },
            Ids: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    internal_code: {
                        type: 'string'
                    }
                }
            }
        }
    }
}