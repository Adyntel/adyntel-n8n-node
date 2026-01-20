import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class AdyntelApi implements ICredentialType {
	name = 'adyntelApi';
	displayName = 'Adyntel API';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-documentation-url-miscased
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
			method: 'POST',
			url: 'https://api.adyntel.com/facebook',
			body: {
				api_key: '={{$credentials.apiKey}}',
				email: '={{$credentials.email}}',
				company_domain: 'lokalise.com',
			},
		},
	};
}
