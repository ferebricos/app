const rules = {
    auth: {
        "registration": {
            login: ['required', 'regex:/^[A-Za-z0-9]+[a-zA-Z0-9_]+[A-Za-z0-9]+$/', 'between:5,30'],
            email: 'required|email|between:5,30',
            password: 'required|between:5,20'
        },
        "create_token": {
            type: 'required|integer|min:1|max:2',
            email: 'required|email|between:5,30'
        },
        "login": {
            field: 'required|between:5,30',
            password: 'required|between:5,20'
        },
        "reset_password": {
            token: 'required',
            password: 'required|between:5,20'
        },
        verify_email: {
            token: 'required'
        }
    },
    users: {

    },
    forum: {
        create_topic:{
            category:'required|integer|min:1|max:7',
            title:'required|string|between:5,64',
            message:'required|between:5,1000',
            attachments:['present', 'array','custom_url'],

        },
        add_message: {
            topic:'required|integer',
            message:'required|between:50,1000',
            attachments:['present', 'array','custom_url'],
        }
    }
}

export default rules