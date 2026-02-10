import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	type Icon,
} from 'n8n-workflow';

export class AdyntelApi implements ICredentialType {
	name = 'adyntelApi';
	displayName = 'Adyntel API';
	icon = 'file:adyntel.svg' as Icon;
	documentationUrl = 'https://docs.adyntel.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			placeholder: 'name@email.com',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				'api_key': '={{$credentials.apiKey}}',
				'email': '={{$credentials.email}}'
			}
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.adyntel.com',
			url: '/auth',
			method: 'POST',
			body: {
				email: '={{$credentials.email}}',
				api_key: '={{$credentials.apiKey}}',
			},
		},
	};
}
