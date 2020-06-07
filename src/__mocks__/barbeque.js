import React from 'react'

const MOCK_BARBEQUE_LIST = [
    {
        "id": 1,
        "description": "Churras de inauguração",
        "eventDateTime": "2020-06-10T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 2,
        "description": "Churras de inauguração 2",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 3,
        "description": "Churras de inauguração 3",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 4,
        "description": "Churras de inauguração 4",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 5,
        "description": "Churras de inauguração 5",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 1,
        "description": "Churras de inauguração",
        "eventDateTime": "2020-06-10T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 2,
        "description": "Churras de inauguração 2",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 3,
        "description": "Churras de inauguração 3",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 4,
        "description": "Churras de inauguração 4",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    },
    {
        "id": 5,
        "description": "Churras de inauguração 5",
        "eventDateTime": "2020-06-11T18:00:00",
        "participants": [
            {
                "id": 2,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 20.50,
                "paid": true
            },
            {
                "id": 3,
                "barbequeId": 1,
                "name": "André Treib",
                "contribution": 0.00,
                "paid": true
            }
        ]
    }
];

export {
    MOCK_BARBEQUE_LIST
}