export default[
    {
        name : 'Pathfinder-AWS',
        toggled : false,
        type : "connection",
        children : [
            {
                name: 'pathfinder-dev',
                type: "database",
                children: [
                    {
                        name: 'Collections',
                        type: 'collectionsFolder',
                        children: [
                            {
                                name: 'users',
                                type: 'collection'
                            }, {
                                name: 'products',
                                type: 'collection'
                            }
                        ]
                    }
                ]
            }, {
                name: 'pathfinder-prd',
                type: "database",
                children: [
                    {
                        name: 'Collections',
                        type: 'collectionsFolder',
                        children: [
                            {
                                name: 'users',
                                type: 'collection'
                            }, {
                                name: 'products',
                                type: 'collection'
                            }
                        ]
                    }
                ]
            }, {
                name: 'pathfinder-stg',
                type: "database",
                children: [
                    {
                        name: 'Collections',
                        type: 'collectionsFolder',
                        children: [
                            {
                                name: 'users',
                                type: 'collection'
                            }, {
                                name: 'products',
                                type: 'collection'
                            }
                        ]
                    }
                ]
            }
        ]
    }, {
        name : 'VAT-AWS',
        toggled : false,
        type : "connection",
        children : [
            {
                name: 'vat-dev',
                type: "database",
                children: [
                    {
                        name: 'Collections',
                        type: 'collectionsFolder',
                        children: [
                            {
                                name: 'users',
                                type: 'collection'
                            }, {
                                name: 'products',
                                type: 'collection'
                            }
                        ]
                    }
                ]
            }, {
                name: 'vat-prd',
                type: "database",
                children: [
                    {
                        name: 'Collections',
                        type: 'collectionsFolder',
                        children: [
                            {
                                name: 'users',
                                type: 'collection'
                            }, {
                                name: 'products',
                                type: 'collection'
                            }
                        ]
                    }
                ]
            }, {
                name: 'vat-stg',
                type: "database",
                children: [
                    {
                        name: 'Collections',
                        type: 'collectionsFolder',
                        children: [
                            {
                                name: 'users',
                                type: 'collection'
                            }, {
                                name: 'products',
                                type: 'collection'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
